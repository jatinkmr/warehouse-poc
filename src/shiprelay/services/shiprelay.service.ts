import { BadRequestException, Injectable } from "@nestjs/common";
import { FetchProductDto, ProductCreationDto } from "../dto";
import { ShipRelayLibService } from "./shiprelayLibs.service";

@Injectable()
export class ShipRelayService {
    constructor(private shipLibService: ShipRelayLibService) { }

    async fetchProductListService(reqBody: FetchProductDto): Promise<any> {
        return await this.shipLibService.fetchProductLibService(reqBody);
    }

    async productCreationService(reqBody: ProductCreationDto): Promise<any> {
        return await this.shipLibService.productCreationLibService(reqBody);
    }

    async fetchProductInfoService(productId: string): Promise<any> {
        return await this.shipLibService.fetchProductInfoLibService(productId);
    }
}
