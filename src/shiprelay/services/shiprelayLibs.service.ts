import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { FetchProductDto, ProductCreationDto } from "../dto";
import { AxiosError } from "axios";
import { __ } from "@squareboat/nestjs-localization";
import { CacheStore } from '@squareboat/nest-cache';
import { IProductModel } from "../interface";

@Injectable()
export class ShipRelayLibService {
    constructor(private readonly httpService: HttpService, private config: ConfigService) { }

    private async retryRequestWithNewToken(requestFn: () => Promise<any>, retries = 3): Promise<any> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            console.log({ type: 'INFO', message: `Attempting attempt - ${attempt}...` });
            try {
                return await requestFn();
            } catch (error) {
                console.log({ type: 'ERROR-INFO', attempt, message: `Attempt ${attempt} failed, retrying...` });
                if (error instanceof UnauthorizedException && attempt < retries) {
                    await this.login();
                } else {
                    throw error;
                }
            }
        }
    }

    private async getToken(): Promise<string> {
        const store = CacheStore("redis");
        const tokenKey = 'shipRelayToken';
        let token = await store.get(tokenKey);

        if (!token) {
            token = await this.login();
            if (token) {
                await store.set(tokenKey, token, 31536000); // Set token with TTL of 1 year
            }
        }
        return token;
    }

    async login(): Promise<string | boolean> {
        let email = this.config.get('services.shipRelay.shipRelayUserName');
        let password = this.config.get('services.shipRelay.shipRelayPassWord');
        const response = await lastValueFrom(
            this.httpService.post(`${process.env.SHIPRELAY_API_URL}/login`, { email, password }).pipe(
                map(response => response.data),
                catchError((error: AxiosError) => {
                    throw new BadRequestException(error);
                })
            ),
        );

        return response?.access_token || null;
    }

    async fetchProductLibService(reqBody: FetchProductDto): Promise<IProductModel[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let fetchProductUrl = `${process.env.SHIPRELAY_API_URL}/products?page=${reqBody.page}&per_page=${reqBody.limit}`;
            if (reqBody.name) {
                fetchProductUrl += `&name=${encodeURIComponent(reqBody.name)}`;
            }
            if (reqBody.sku) {
                fetchProductUrl += `&sku=${encodeURIComponent(reqBody.sku)}`;
            }
            console.log('fetchProductUrl: ', fetchProductUrl);
            const response = await lastValueFrom(
                this.httpService.get(fetchProductUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                        else
                            throw new BadRequestException(error);
                    })
                )
            );
            return response?.data?.length ? { data: response.data, meta: response.meta } : [];
        });
    }

    async fetchProductInfoLibService(productId: string): Promise<IProductModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();

            return await lastValueFrom(
                this.httpService.get(`${process.env.SHIPRELAY_API_URL}/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        console.log('error: ', error.response);
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                        else if (error.response.status == 404)
                            throw new NotFoundException(__('shipRelay.productNotFoundError'))
                        else
                            throw new BadRequestException(error);
                    })
                )
            )
        });
    }

    async productCreationLibService(reqBody: ProductCreationDto): Promise<IProductModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();

            return await lastValueFrom(
                this.httpService.post(`${process.env.SHIPRELAY_API_URL}/products/simple`, reqBody, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async productArchiveLibService(productId: string): Promise<IProductModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            return await lastValueFrom(
                this.httpService.patch(`${process.env.SHIPRELAY_API_URL}/products/${productId}/archive`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            );
        });
    }

    async productRestoreLibService(productId: string): Promise<IProductModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();

            return await lastValueFrom(
                this.httpService.patch(`${process.env.SHIPRELAY_API_URL}/products/${productId}/restore`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async productUpdationLibService(productId: string, reqBody: ProductCreationDto): Promise<IProductModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();

            return await lastValueFrom(
                this.httpService.put(`${process.env.SHIPRELAY_API_URL}/products/simple/${productId}`, reqBody, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }
}
