import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { AxiosError } from "axios";
import { __ } from "@squareboat/nestjs-localization";
import { ICourierModel, ICourierServiceType, IInventoryRecord, IOrderCreation, IOrderModel, IOrderStatus, IProductList, IProductModel, IProductUpdation, IReturnCreation, IReturnInfo, IReturnReason } from "../interface";
import { FetchOrderDto, FetchProductDto, OrderCreationDto, ProductDto, ReturnCreationDto, UpdateProductDto } from "../dto";

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

    async productCreationLibService(reqBody: ProductDto): Promise<IProductModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.put(`${url}/Product`, reqBody, {
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

    async fetchProductListLibService(reqBody: FetchProductDto): Promise<IProductList[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Product/List?PageNo=${reqBody.page}&Limit=${reqBody.limit}`, {
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

    async fetchCourierTypesLibService(): Promise<ICourierServiceType[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Courier/ServiceTypes`, {
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

    async fetchProductInfoLibService(productId: number): Promise<IProductList> {
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

    async updateProductLibService(reqBody: UpdateProductDto): Promise<IProductUpdation> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl')

            return await lastValueFrom(
                this.httpService.post(`${url}/Product`, reqBody, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async searchProductLibService(searchText: string): Promise<IProductList[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl')

            return await lastValueFrom(
                this.httpService.get(`${url}/Product/Search?Search=${searchText}`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async orderCreationLibService(reqBody: OrderCreationDto): Promise<IOrderCreation[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.put(`${url}/Order`, reqBody, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async orderInfoLibService(orderId: number): Promise<IOrderModel> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Order/${orderId}`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else if (error.response.status == 404)
                            throw new NotFoundException(__('errorMessage.orderNotFoundError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async fetchOrderListLibService(reqBody: FetchOrderDto): Promise<IOrderModel[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            let fetchOrderUrl = `${url}/Order/List?PageNo=${reqBody.page}&Limit=${reqBody.limit}`;
            if (reqBody.warehouseId) {
                fetchOrderUrl += `&WarehouseId=${reqBody.warehouseId}`
            }
            if (reqBody.orderStatusId) {
                fetchOrderUrl += `&OrderStatusId=${reqBody.orderStatusId}`
            }
            if (reqBody.courierServiceId) {
                fetchOrderUrl += `&CourierServiceId=${reqBody.courierServiceId}`
            }

            return await lastValueFrom(
                this.httpService.get(fetchOrderUrl, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async fetchProductInventoryLibService(productId: number): Promise<IInventoryRecord[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Product/${productId}/Inventory`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async fetchOrderStatusLibService(): Promise<IOrderStatus> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Order/Statuses`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async fetchAllReturnReasonLibService(): Promise<IReturnReason[]> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Return/Reasons`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async createReturnLibService(reqBody: ReturnCreationDto): Promise<IReturnCreation> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.post(`${url}/Return/CreateReturn/${reqBody.OrderId}`, {}, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }

    async fetchReturnInfoLibService(returnId: number): Promise<IReturnInfo> {
        return this.retryRequestWithNewToken(async () => {
            const token = await this.getToken();
            let url = this.config.get('services.mintSoft.mintSoftApiUrl');

            return await lastValueFrom(
                this.httpService.get(`${url}/Return/${returnId}`, {
                    headers: { 'ms-apikey': token }
                }).pipe(
                    map(response => response.data),
                    catchError((error: AxiosError) => {
                        if (error.response.status == 401)
                            throw new UnauthorizedException(__('errorMessage.unAuthorizedError'));
                        else if (error.response.status == 404)
                            throw new NotFoundException(__('errorMessage.returnNotFoundError'));
                        else
                            throw new BadRequestException(error)
                    })
                )
            )
        })
    }
}
