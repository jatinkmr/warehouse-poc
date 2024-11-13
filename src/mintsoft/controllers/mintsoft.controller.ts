import { Request, Response, RestController } from "@libs/boat";
import { BaseValidator } from "@libs/boat/validator";
import { Body, Controller, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MintSoftService } from "../services";
import { __ } from "@squareboat/nestjs-localization";

@Controller('mintsoft')
export class MintSoftController extends RestController {
    constructor(private service: MintSoftService, private validator: BaseValidator, private config: ConfigService) {
        super();
    }

    @Get('/')
    getMintSoftHealth() {
        return __('mintSoft.welcome')
    }

    @Get('/product')
    async fetchProductListController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const response = await this.service.fetchProductListService();
        return res.success(response);
    }

    @Get('/product/:productId')
    async fetchProductInfoController(@Req() req: Request, @Res() res: Response, @Param('productId') productId: number): Promise<Response> {
        console.log('productId: ', productId);
        const response = await this.service.fetchProductInfoService(productId);
        return res.success(response);
    }

    @Get('/courier')
    async fetchCourierController(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const response = await this.service.fetchCourierService();
        return res.success(response);
    }
}