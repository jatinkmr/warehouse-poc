import { Request, Response, RestController } from "@libs/boat";
import { BaseValidator } from "@libs/boat/validator";
import { Body, Controller, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MintSoftService } from "../services";
import { __ } from "@squareboat/nestjs-localization";
import { FetchOrderDto, FetchProductDto, OrderCreationDto, ProductDto, UpdateProductDto } from "../dto";

@Controller('mintsoft')
export class MintSoftController extends RestController {
    constructor(private service: MintSoftService, private validator: BaseValidator, private config: ConfigService) {
        super();
    }

    @Get('/')
    getMintSoftHealth() {
        return __('mintSoft.welcome')
    }

    @Put('/product')
    async productCreationController(@Req() req: Request, @Res() res: Response, @Body() reqBody: ProductDto): Promise<Response> {
        await this.validator.fire(reqBody, ProductDto)
        const response = await this.service.productCreationService(reqBody);
        return res.success(response);
    }

    @Get('/product')
    async fetchProductListController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        let reqData = req.all();
        let reqBody = {
            limit: +reqData.limit || +this.config.get('services.pagination.limit'),
            page: +reqData.page || +this.config.get('services.pagination.page')
        };
        await this.validator.fire(reqBody, FetchProductDto);
        const response = await this.service.fetchProductListService(reqBody);
        return res.success(response);
    }

    @Get('/product/:productId')
    async fetchProductInfoController(@Req() req: Request, @Res() res: Response, @Param('productId') productId: number): Promise<Response> {
        const response = await this.service.fetchProductInfoService(productId);
        return res.success(response);
    }

    @Get('/courier')
    async fetchCourierController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const response = await this.service.fetchCourierService();
        return res.success(response);
    }

    @Put('/product')
    async updateProductController(@Req() req: Request, @Res() res: Response, @Body() reqBody: UpdateProductDto): Promise<Response> {
        await this.validator.fire(reqBody, UpdateProductDto);
        const response = await this.service.updateProductService(reqBody);
        return res.success(response);
    }

    @Get('/search')
    async searchProductController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        let reqData = req.all();
        const response = await this.service.searchProductService(reqData.search);
        return res.success(response);
    }

    @Get('/order')
    async fetchOrderListController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        let reqData = req.all();
        let reqBody = {
            limit: +reqData.limit || +this.config.get('services.pagination.limit'),
            page: +reqData.page || +this.config.get('services.pagination.page'),
            ...(reqData.warehouseId && { warehouseId: reqData.warehouseId }),
            ...(reqData.orderStatusId && { orderStatusId: reqData.orderStatusId }),
            ...(reqData.clientId && { clientId: reqData.clientId }),
            ...(reqData.courierServiceId && { courierServiceId: reqData.courierServiceId })
        };
        await this.validator.fire(reqBody, FetchOrderDto);
        const response = await this.service.fetchOrderListService(reqBody);
        return res.success(response);
    }

    @Put('/order')
    async orderCreationController(@Req() req: Request, @Res() res: Response, @Body() reqBody: OrderCreationDto): Promise<Response> {
        await this.validator.fire(reqBody, OrderCreationDto)
        const response = await this.service.orderCreationService(reqBody);
        return res.success(response);
    }

    @Get('/order/:orderId')
    async orderInfoController(@Req() req: Request, @Res() res: Response, @Param('orderId') orderId: number): Promise<Response> {
        const response = await this.service.orderInfoService(orderId);
        return res.success(response);
    }
}
