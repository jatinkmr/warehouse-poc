import { Injectable } from "@nestjs/common";
import { FetchProductDto, ProductCreationDto, ShipmentCreationDto, ShipmentFetchDto } from "../dto";
import { ShipRelayLibService } from "./shiprelayLibs.service";
import { IProductModel, IShipmentModel } from "../interface";

@Injectable()
export class ShipRelayService {
    constructor(private shipLibService: ShipRelayLibService) { }

    async fetchProductListService(reqBody: FetchProductDto): Promise<IProductModel[]> {
        return await this.shipLibService.fetchProductLibService(reqBody);
    }

    async fetchProductInfoService(productId: string): Promise<IProductModel> {
        return await this.shipLibService.fetchProductInfoLibService(productId);
    }

    async productCreationService(reqBody: ProductCreationDto): Promise<IProductModel> {
        return await this.shipLibService.productCreationLibService(reqBody);
    }

    async productArchiveService(productId: string): Promise<IProductModel> {
        return await this.shipLibService.productArchiveLibService(productId);
    }

    async productRestoreService(productId: string): Promise<IProductModel> {
        return await this.shipLibService.productRestoreLibService(productId);
    }

    async productUpdationService(productId: string, reqBody: ProductCreationDto): Promise<IProductModel> {
        return await this.shipLibService.productUpdationLibService(productId, reqBody);
    }

    async createShipmentService(reqBody: ShipmentCreationDto): Promise<IShipmentModel> {
        return await this.shipLibService.createShipmentLibService(reqBody);
    }

    async fetchShipmentService(reqBody: ShipmentFetchDto): Promise<IShipmentModel[]> {
        return await this.shipLibService.fetchShipmentLibService(reqBody);
    }

    async fetchShipmentByIdService(shipmentId: string): Promise<IShipmentModel> {
        return await this.shipLibService.fetchShipmentByIdLibService(shipmentId);
    }

    async shipmentArchiveService(shipmentId: string): Promise<IShipmentModel> {
        return await this.shipLibService.shipmentArchiveLibService(shipmentId);
    }

    async shipmentRestoreService(shipmentId: string): Promise<IShipmentModel> {
        return await this.shipLibService.shipmentRestoreLibService(shipmentId);
    }

    async updateShipmentService(reqBody: ShipmentCreationDto): Promise<IShipmentModel> {
        return await this.shipLibService.updateShipmentLibService(reqBody);
    }
}
