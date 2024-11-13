import { Module } from "@nestjs/common";
import { MintSoftController } from "./controllers";
import { BoatModule } from "@libs/boat";
import { HttpModule } from "@nestjs/axios";
import { MintSoftService } from "./services";
import { MintSoftLibService } from "./services/mintsoftLibs.service";

@Module({
    controllers: [MintSoftController],
    providers: [
        MintSoftService,
        MintSoftLibService
    ],
    imports: [
        BoatModule,
        HttpModule
    ]
})
export class MintSoftModule { }