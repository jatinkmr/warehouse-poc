import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { FetchProductDto, ProductCreationDto } from "../dto";
import { AxiosError } from "axios";
import { __ } from "@squareboat/nestjs-localization";
import { CacheStore } from '@squareboat/nest-cache';

@Injectable()
export class ShipRelayLibService {
    constructor(private readonly httpService: HttpService, private config: ConfigService) { }

    async login(): Promise<string | boolean> {
        const store = CacheStore("redis");
        const tokenKey = 'shipRelayToken';

        let isLoginTokenExist = await store.get(tokenKey);
        if (isLoginTokenExist) {
            return isLoginTokenExist;
        } else {
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

            const accessToken = response?.access_token;
            if (accessToken) {
                await store.set(tokenKey, accessToken, 31536000); // Set with a TTL of 1 year (31,536,000 seconds)
                return accessToken;
            }

            return false;
        }
    }

    async fetchProductLibService(reqBody: FetchProductDto): Promise<any> {
        const token = await this.login();

        const response = await lastValueFrom(
            this.httpService.get(`${process.env.SHIPRELAY_API_URL}/products?page=${reqBody.page}&per_page=${reqBody.limit}`, {
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
        )

        return response?.data?.length && { data: response.data, meta: response.meta } || [];
    }

    async fetchProductInfoLibService(productId: string): Promise<any> {
        const token = await this.login();

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
    }

    async productCreationLibService(reqBody: ProductCreationDto): Promise<any> {
        const token = await this.login();

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
    }

    async productArchiveLibService(productId: string): Promise<any> {
        const token = await this.login();

        let updatedProductId = +productId;

        return await lastValueFrom(
            this.httpService.patch(`${process.env.SHIPRELAY_API_URL}/products/${updatedProductId}/archive`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            }).pipe(
                map(response => response.data),
                catchError((error: AxiosError) => {
                    console.log('error: ', error);
                    if (error.response.status == 401)
                        throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                    else
                        throw new BadRequestException(error.response.data);
                })
            )
        )
    }

    async productRestoreLibService(productId: string): Promise<any> {
        const token = await this.login();

        return await lastValueFrom(
            this.httpService.patch(`${process.env.SHIPRELAY_API_URL}/products/${productId}/restore`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).pipe(
                map(response => response.data),
                catchError((error: AxiosError) => {
                    console.log('error: ', error);
                    if (error.response.status == 401)
                        throw new UnauthorizedException(__('shipRelay.unAuthorizedError'));
                    else
                        throw new BadRequestException(error.response.data);
                })
            )
        )
    }
}
