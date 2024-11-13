import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { AxiosError } from "axios";
import { __ } from "@squareboat/nestjs-localization";
import { ICourierModel } from "../interface";

@Injectable()
export class MintSoftLibService {
    constructor(private readonly httpService: HttpService, private config: ConfigService) { }

    private async retryRequestWithNewToken(requestFn: () => Promise<any>, retries = 3): Promise<any> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            console.log({ type: 'INFO', message: `MintSoft Attempting attempt - ${attempt}...` });
            try {
                return await requestFn();
            } catch (error) {
                console.log({ type: 'ERROR-INFO', attempt, message: `MintSoft Attempt ${attempt} failed, retrying...` });
                throw error;
            }
        }
    }

    private async getToken(): Promise<string> {
        return this.config.get('services.mintSoft.mintSoftApiKey')
    }

    async fetchProductListLibService(): Promise<any> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Product/List`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error);
                    })
                )
            )
        })
    }

    async fetchCourierLibService(): Promise<ICourierModel[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Courier/Services`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error);
                    })
                )
            )
        })
    }

    async fetchProductInfoLibService(productId: number): Promise<any> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl')

            return await lastValueFrom(
                this.httpService.get(`${url}/Product/${productId}`, {
                    headers: { 'ms-apikey': token }
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
        })
    }
}