import { Injectable } from "@nestjs/common";
import { MintSoftLibService } from "./mintsoftLibs.service";
import { ICourierModel, ICourierServiceType, IInventoryRecord, IOrderCreation, IOrderModel, IOrderStatus, IProductList, IProductModel, IProductUpdation, IReturnCreation, IReturnInfo, IReturnReason } from "../interface";
import { FetchOrderDto, FetchProductDto, OrderCreationDto, ProductDto, ReturnCreationDto, UpdateProductDto } from "../dto";

@Injectable()
export class MintSoftService {
    constructor(private mintsoftLibService: MintSoftLibService) { }

    async productCreationService(reqBody: ProductDto): Promise<IProductModel> {
        return await this.mintsoftLibService.productCreationLibService(reqBody);
    }

    async fetchProductListService(reqBody: FetchProductDto): Promise<IProductList[]> {
        return await this.mintsoftLibService.fetchProductListLibService(reqBody);
    }

    async fetchCourierService(): Promise<ICourierModel[]> {
        return await this.mintsoftLibService.fetchCourierLibService();
    }

    async fetchCourierServiceTypesService(): Promise<ICourierServiceType[]> {
        return await this.mintsoftLibService.fetchCourierTypesLibService();
    }

    async fetchProductInfoService(productId: number): Promise<IProductList> {
        return await this.mintsoftLibService.fetchProductInfoLibService(productId);
    }

    async updateProductService(reqBody: UpdateProductDto): Promise<IProductUpdation> {
        return await this.mintsoftLibService.updateProductLibService(reqBody);
    }

    async searchProductService(searchText: string): Promise<IProductList[]> {
        return await this.mintsoftLibService.searchProductLibService(searchText);
    }

    async orderCreationService(reqBody: OrderCreationDto): Promise<IOrderCreation[]> {
        return await this.mintsoftLibService.orderCreationLibService(reqBody);
    }

    async orderInfoService(orderId: number): Promise<IOrderModel> {
        return await this.mintsoftLibService.orderInfoLibService(orderId);
    }

    async fetchOrderListService(reqBody: FetchOrderDto): Promise<IOrderModel[]> {
        return await this.mintsoftLibService.fetchOrderListLibService(reqBody);
    }

    async fetchProductInventoryService(productId: number): Promise<IInventoryRecord[]> {
        return await this.mintsoftLibService.fetchProductInventoryLibService(productId);
    }

    async fetchOrderStatusService(): Promise<IOrderStatus> {
        return await this.mintsoftLibService.fetchOrderStatusLibService();
    }

    async fetchAllReturnReasonService(): Promise<IReturnReason[]> {
        return await this.mintsoftLibService.fetchAllReturnReasonLibService();
    }

    async createReturnService(reqBody: ReturnCreationDto): Promise<IReturnCreation> {
        return await this.mintsoftLibService.createReturnLibService(reqBody);
    }

    async fetchReturnInfoService(returnId: number): Promise<IReturnInfo> {
        return await this.mintsoftLibService.fetchReturnInfoLibService(returnId);
    }
}