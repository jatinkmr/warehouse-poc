import { ObjectionModel } from "@libs/boat";

export interface ICourierModel extends ObjectionModel {
    CourierServiceTypeId?: number;
    Name?: string;
    TrackingURL?: string;
    ActiveB?: boolean;
    ID?: number;
    LastUpdated?: Date;
    LastUpdatedByUser?: string;
}