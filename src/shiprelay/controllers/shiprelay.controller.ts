import { Request, Response, RestController } from "@libs/boat";
import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ShipRelayService } from "../services";
import { BaseValidator } from "@libs/boat/validator";
import { FetchProductDto, ProductCreationDto } from "../dto";
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
        let reqBody = { limit: +reqData.limit || +this.config.get('services.pagination.limit'), page: +reqData.page || +this.config.get('services.pagination.page') };
        await this.validator.fire(reqBody, FetchProductDto);
        let response = await this.service.fetchProductListService(reqBody);
        return res.success(
            // await this.paginate(response, )
            response
        )
    }

    @Post('/product')
    async productCreationController(@Req() req: Request, @Res() res: Response, @Body() reqBody: ProductCreationDto): Promise<Response> {
        await this.validator.fire(reqBody, ProductCreationDto);
        let response = await this.service.productCreationService(reqBody);
        return res.success({ message: 'done', response });
    }
}
