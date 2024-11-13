import { Injectable } from "@nestjs/common";
import { MintSoftLibService } from "./mintsoftLibs.service";
import { ICourierModel } from "../interface";

@Injectable()
export class MintSoftService {
    constructor(private mintsoftLibService: MintSoftLibService) { }

    async fetchProductListService(): Promise<any> {
        return await this.mintsoftLibService.fetchProductListLibService();
    }

    async fetchCourierService(): Promise<ICourierModel[]> {
        return await this.mintsoftLibService.fetchCourierLibService();
    }

    async fetchProductInfoService(productId: number): Promise<any> {
        return await this.mintsoftLibService.fetchProductInfoLibService(productId);
    }
}