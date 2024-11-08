import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { FetchProductDto, ProductCreationDto } from "../dto";
import { AxiosError } from "axios";
import { __ } from "@squareboat/nestjs-localization";

@Injectable()
export class ShipRelayLibService {
    constructor(private readonly httpService: HttpService, private config: ConfigService) { }

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
        return response?.access_token || false;
    }

    async fetchProductLibService(reqBody: FetchProductDto): Promise<any> {
        const token = await this.login();

        const response = await lastValueFrom(
            this.httpService.get(`${process.env.SHIPRELAY_API_URL}/products?page=${reqBody.page}&per_page=${reqBody.limit}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).pipe(
                map(response => response.data),
                catchError((error: AxiosError) => {
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
                    if (error.response.status == 404)
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
                    console.log('error: ', error.response.data);
                    throw new BadRequestException(error.response.data);
                })
            )
        )
    }
}
