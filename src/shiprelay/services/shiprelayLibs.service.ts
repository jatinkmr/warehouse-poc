import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
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
                    // Log error details for debugging
                    console.error('Login error:', error.message);

                    // Check for 401 status, which usually indicates wrong credentials
                    if (error.response?.status === 401) {
                        throw new Error(__('shipRelay.inValidCredentials'));
                    }

                    // Throw a generic error for other HTTP errors
                    throw new Error(__('shipRelay.loginFailed'));
                })
            ),
        );
        console.log('response => ', response);
        return response?.access_token || false;
    }

    async productCreationLibService(reqBody: ProductCreationDto): Promise<any> {
        const token = await this.login();
        if (!token) return new BadRequestException(__('shipRelay.inValidCredentials'));

        console.log('token response => ', token);
        return;
    }

    async fetchProductLibService(reqBody: FetchProductDto): Promise<any> {
        const token = await this.login();
        if (!token) return new BadRequestException(__('shipRelay.inValidCredentials'));

        const response = await lastValueFrom(
            this.httpService.get(`${process.env.SHIPRELAY_API_URL}/products?page=${reqBody.page}&per_page=${reqBody.limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).pipe(
                map(response => response.data),
                catchError((error: AxiosError) => {
                    // Log error details for debugging
                    console.error('Login error:', error.message);

                    // Check for 401 status, which usually indicates wrong credentials
                    if (error.response?.status === 401) {
                        throw new Error(__('shipRelay.inValidCredentials'));
                    }

                    // Throw a generic error for other HTTP errors
                    throw new Error(__('shipRelay.loginFailed'));
                })
            )
        )

        console.log('response: ', response);
        return response?.data?.length && { data: response.data, meta: response.meta } || [];
    }
}
