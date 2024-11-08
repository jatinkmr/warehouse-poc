import { Module } from "@nestjs/common";
import { ShipRelayController } from "./controllers";
import { ShipRelayService } from "./services";
import { ShipRelayLibService } from "./services/shiprelayLibs.service";
import { BoatModule } from "@libs/boat";
import { HttpModule } from "@nestjs/axios";

@Module({
    controllers: [ShipRelayController],
    providers: [
        ShipRelayService,
        ShipRelayLibService
    ],
    imports: [
        BoatModule,
        HttpModule,
    ]
})
export class ShipRelayModule { }