import { Request, Response, RestController } from "@libs/boat";
import { Body, Controller, Get, Param, Patch, Post, Put, Req, Res } from "@nestjs/common";
import { ShipRelayService } from "../services";
import { BaseValidator } from "@libs/boat/validator";
import { FetchProductDto, ProductCreationDto, ShipmentCreationDto, ShipmentFetchDto } from "../dto";
import { __ } from "@squareboat/nestjs-localization";
import { ConfigService } from "@nestjs/config";

@Controller('shiprelay')
export class ShipRelayController extends RestController {
    constructor(private service: ShipRelayService, private validator: BaseValidator, private config: ConfigService) {
        super();
    }

    @Get('/')
    getShipRelayHealth() {
        return __('shipRelay.welcome')
    }

    @Get('/product')
    async fetchProductListController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        let reqData = req.all();
        let reqBody = {
            limit: +reqData.limit || +this.config.get('services.pagination.limit'),
            page: +reqData.page || +this.config.get('services.pagination.page'),
            ...(reqData.name && { name: reqData.name }),
            ...(reqData.sku && { sku: reqData.sku })
        };
        await this.validator.fire(reqBody, FetchProductDto);
        let response = await this.service.fetchProductListService(reqBody);
        return res.success(response)
    }

    @Get('/product/:productId')
    async fetchProductInfoController(@Req() req: Request, @Res() res: Response, @Param('productId') productId: string): Promise<Response> {
        let response = await this.service.fetchProductInfoService(productId);
        return res.success(response)
    }

    @Post('/product')
    async productCreationController(@Req() req: Request, @Res() res: Response, @Body() reqBody: ProductCreationDto): Promise<Response> {
        await this.validator.fire(reqBody, ProductCreationDto);
        let response = await this.service.productCreationService(reqBody);
        return res.success(response);
    }

    @Patch('/product/:productId/archive')
    async productArchiveController(@Req() req: Request, @Res() res: Response, @Param('productId') productId: string): Promise<Response> {
        let response = await this.service.productArchiveService(productId);
        return res.success(response)
    }

    @Patch('/product/:productId/restore')
    async productRestoreController(@Req() req: Request, @Res() res: Response, @Param('productId') productId: string): Promise<Response> {
        let response = await this.service.productRestoreService(productId);
        return res.success(response);
    }

    @Put('/product/:productId')
    async productUpdationController(@Req() req: Request, @Res() res: Response, @Body() reqBody: ProductCreationDto, @Param('productId') productId: string): Promise<Response> {
        await this.validator.fire(reqBody, ProductCreationDto);
        let response = await this.service.productUpdationService(productId, reqBody);
        return res.success(response);
    }

    @Post('/shipments')
    async createShipmentController(@Req() req: Request, @Res() res: Response, @Body() reqBody: ShipmentCreationDto): Promise<Response> {
        await this.validator.fire(reqBody, ShipmentCreationDto);
        let response = await this.service.createShipmentService(reqBody);
        return res.success(response);
    }

    @Get('/shipments')
    async fetchShipmentController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        let reqData = req.all();
        let reqBody = {
            limit: +reqData.limit || +this.config.get('services.pagination.limit'),
            page: +reqData.page || +this.config.get('services.pagination.page'),
            ...(reqData.status && { status: reqData.status }),
            ...(reqData.order_ref && { order_ref: reqData.order_ref })
        };
        await this.validator.fire(reqBody, ShipmentFetchDto);
        const response = await this.service.fetchShipmentService(reqBody);
        return res.success(response);
    }

    @Get('/shipments/:shipmentId')
    async fetchShipmentByIdController(@Req() req: Request, @Res() res: Response, @Param('shipmentId') shipmentId: string): Promise<Response> {
        const response = await this.service.fetchShipmentByIdService(shipmentId);
        return res.success(response);
    }

    @Patch('/shipments/:shipmentId/archive')
    async shipmentArchiveController(@Req() req: Request, @Res() res: Response, @Param('shipmentId') shipmentId: string): Promise<Response> {
        const response = await this.service.shipmentArchiveService(shipmentId);
        return res.success(response);
    }

    @Patch('/shipments/:shipmentId/restore')
    async shipmentRestoreController(@Req() req: Request, @Res() res: Response, @Param('shipmentId') shipmentId: string): Promise<Response> {
        const response = await this.service.shipmentRestoreService(shipmentId);
        return res.success(response);
    }

    @Patch('/shipments')
    async updateShipmentController(@Req() req: Request, @Res() res: Response, @Body() reqBody: ShipmentCreationDto): Promise<Response> {
        await this.validator.fire(reqBody, ShipmentCreationDto);
        const response = await this.service.updateShipmentService(reqBody);
        return res.success(response);
    }
}
