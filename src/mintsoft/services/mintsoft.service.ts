import { Injectable } from "@nestjs/common";
import { MintSoftLibService } from "./mintsoftLibs.service";
import { ICourierModel } from "../interface";
import { FetchProductDto, UpdateProductDto } from "../dto";

@Injectable()
export class MintSoftService {
    constructor(private mintsoftLibService: MintSoftLibService) { }

    async fetchProductListService(reqBody: FetchProductDto): Promise<any> {
        return await this.mintsoftLibService.fetchProductListLibService(reqBody);
    }

    async fetchCourierService(): Promise<ICourierModel[]> {
        return await this.mintsoftLibService.fetchCourierLibService();
    }

    async fetchProductInfoService(productId: number): Promise<any> {
        return await this.mintsoftLibService.fetchProductInfoLibService(productId);
    }

    async updateProductService(reqBody: UpdateProductDto): Promise<any> {
        return await this.mintsoftLibService.updateProductLibService(reqBody);
    }

    async searchProductService(searchText: string): Promise<any> {
        return await this.mintsoftLibService.searchProductLibService(searchText);
    }
}