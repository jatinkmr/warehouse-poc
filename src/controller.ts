import { RestController } from "@libs/boat";
import { Controller, Get } from "@nestjs/common";
import { __ } from '@squareboat/nestjs-localization';

@Controller('')
export class RootController extends RestController {
    constructor() { super(); }

    @Get('')
    getHealth() {
        return __('homePageWelcome');
    }
}
