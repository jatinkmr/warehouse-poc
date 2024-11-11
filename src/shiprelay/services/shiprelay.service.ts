import { BadRequestException, Injectable } from "@nestjs/common";
import { FetchProductDto, ProductCreationDto } from "../dto";
import { ShipRelayLibService } from "./shiprelayLibs.service";

@Injectable()
export class ShipRelayService {
    constructor(private shipLibService: ShipRelayLibService) { }

    async fetchProductListService(reqBody: FetchProductDto): Promise<any> {
        return await this.shipLibService.fetchProductLibService(reqBody);
    }

    async fetchProductInfoService(productId: string): Promise<any> {
        return await this.shipLibService.fetchProductInfoLibService(productId);
    }

    async productCreationService(reqBody: ProductCreationDto): Promise<any> {
        return await this.shipLibService.productCreationLibService(reqBody);
    }

    async productArchiveService(productId: string): Promise<any> {
        return await this.shipLibService.productArchiveLibService(productId);
    }

    async productRestoreService(productId: string): Promise<any> {
        return await this.shipLibService.productRestoreLibService(productId);
    }

    async productUpdationService(productId: string, reqBody: ProductCreationDto): Promise<any> {
        return await this.shipLibService.productUpdationLibService(productId, reqBody);
    }
}
