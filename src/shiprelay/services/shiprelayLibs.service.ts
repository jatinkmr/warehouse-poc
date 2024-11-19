import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { FetchProductDto, ProductCreationDto, ShipmentCreationDto, ShipmentFetchDto } from "../dto";
import { AxiosError } from "axios";
import { __ } from "@squareboat/nestjs-localization";
import { CacheStore } from '@squareboat/nest-cache';
import { IProductModel, IShipmentModel } from "../interface";

@Injectable()
export class ShipRelayLibService {
    constructor(private readonly httpService: HttpService, private config: ConfigService) { }

    private async retryRequestWithNewToken(requestFn: () => Promise<any>, retries = 3): Promise<any> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            console.log({ type: 'INFO', message: `ShipRelay Attempting attempt - ${attempt}...` });
            try {
                return await requestFn();
            } catch (error) {
                console.log({ type: 'ERROR-INFO', attempt, message: `ShipRelay Attempt ${attempt} failed, retrying...` });
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
        let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

        const response = await lastValueFrom(
            this.httpService.post(`${shipRelayUrl}/login`, { email, password }).pipe(
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
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            let fetchProductUrl = `${shipRelayUrl}/products?page=${reqBody.page}&per_page=${reqBody.limit}`;
            if (reqBody.name) {
                fetchProductUrl += `&name=${encodeURIComponent(reqBody.name)}`;
            }
            if (reqBody.sku) {
                fetchProductUrl += `&sku=${encodeURIComponent(reqBody.sku)}`;
            }
            const response = await lastValueFrom(
                this.httpService.get(fetchProductUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
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
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${shipRelayUrl}/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else if (error.response.status == 404)
                            throw new NotFoundException(__('errorMessage.productNotFoundError'))
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
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.post(`${shipRelayUrl}/products/simple`, reqBody, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
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
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.patch(`${shipRelayUrl}/products/${productId}/archive`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
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
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.patch(`${shipRelayUrl}/products/${productId}/restore`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
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
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.put(`${shipRelayUrl}/products/simple/${productId}`, reqBody, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async createShipmentLibService(reqBody: ShipmentCreationDto): Promise<IShipmentModel> {
        let updatedReqBody = {
            ...reqBody,
            reseller_id: this.config.get('services.shipRelay.shipRelayReSellerId'),
            type: 'b2c',
        }

        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');
            console.log(`${shipRelayUrl}/shipments`);

            return await lastValueFrom(
                this.httpService.post(`${shipRelayUrl}/shipments`, updatedReqBody, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async fetchShipmentLibService(reqBody: ShipmentFetchDto): Promise<IShipmentModel[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            let fetchShipmentUrl = `${shipRelayUrl}/shipments?page=${reqBody.page}&per_page=${reqBody.limit}`;

            if (reqBody.status) {
                fetchShipmentUrl += `&status=${reqBody.status}`;
            }
            if (reqBody.order_ref) {
                fetchShipmentUrl += `&order_ref=${reqBody.order_ref}`
            }

            return await lastValueFrom(
                this.httpService.get(fetchShipmentUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async fetchShipmentByIdLibService(shipmentId: string): Promise<IShipmentModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${shipRelayUrl}/shipments/${shipmentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else if (error.response.status == 404)
                            throw new NotFoundException(__('errorMessage.shipmentNotFoundError'))
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async shipmentArchiveLibService(shipmentId: string): Promise<any> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            console.log('token: ', token);
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');
            console.log(`${shipRelayUrl}/shipments/${shipmentId}/archive`);

            return await lastValueFrom(
                this.httpService.patch(`${shipRelayUrl}/shipments/${shipmentId}/archive`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async shipmentRestoreLibService(shipmentId: string): Promise<any> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.patch(`${shipRelayUrl}/shipments/${shipmentId}/restore`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }

    async updateShipmentLibService(reqBody: ShipmentCreationDto): Promise<any> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let shipRelayUrl = this.config.get('services.shipRelay.shipRelayApiUrl');

            return await lastValueFrom(
                this.httpService.put(`${shipRelayUrl}/shipments/${reqBody.id}`, reqBody, {
                    headers: { Authorization: `Bearer ${token}` }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error.response.data);
                    })
                )
            )
        })
    }
}
