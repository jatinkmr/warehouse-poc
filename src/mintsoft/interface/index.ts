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

export interface IProductModel extends ObjectionModel {
    ProductId?: number;
    SKU?: string;
    Name?: string;
    Success?: boolean;
    Message?: string;
}

export interface IProductList {
    CommodityCode: {
        Code: string;
        ID: number;
        LastUpdated: string; // ISO date string
        LastUpdatedByUser: string;
    };
    CountryOfManufacture: {
        Name: string;
        Code: string;
        Code3: string;
        ID: number;
        LastUpdated: string; // ISO date string
        LastUpdatedByUser: string;
    };
    ProductInCategories: any[]; // Array of objects (define specific structure if available)
    ProductPrices: any[]; // Array of objects (define specific structure if available)
    ProductSuppliers: any[]; // Array of objects (define specific structure if available)
    SKU: string;
    Name: string;
    PalletSizes: string;
    PackingInstructions: string | null;
    Description: string;
    CustomsDescription: string;
    CountryOfManufactureId: number;
    EAN: string;
    UPC: string;
    LowStockAlertLevel: number;
    Weight: number;
    Height: number | null;
    Width: number | null;
    Depth: number | null;
    Volume: number | null;
    BackOrder: boolean;
    Bundle: boolean;
    DisCont: boolean;
    Price: number;
    CostPrice: number;
    VatExempt: boolean;
    AdditionalParcelsRequired: number;
    UnitsPerParcel: number;
    HasBatchNumber: boolean;
    LogBatchInbound: string | null;
    LogBatchOutbound: string | null;
    HasSerialNumber: boolean;
    LogSerialInbound: string | null;
    LogSerialOutbound: string | null;
    HasExpiryDate: boolean;
    LogExpiryDateInbound: string | null;
    LogExpiryDateOutbound: string | null;
    BestBeforeDateWarningPeriodDays: number;
    HandlingTime: number;
    UnNumber: string | null;
    ImageURL: string;
    ProductHazardousGoods: any | null; // Define specific type if available
    ProductPurchasingSettings: any | null; // Define specific type if available
    ProductGrowthRates: any | null; // Define specific type if available
    ExternalFulFilmentProduct: any | null; // Define specific type if available
    ExternalFulFilmentProductInventory: any | null; // Define specific type if available
    OrderItems: any | null; // Define specific type if available
    Subscription: boolean;
    SubscriptionLength: number;
    SubscriptionFrequency: string | null;
    ClientId: number;
    ID: number;
    LastUpdated: string; // ISO date string
    LastUpdatedByUser: string;
}

export interface IProductUpdation {
    ID?: string;
    Success?: boolean;
    Message?: string;
    WarningMessage?: string;
    AllocatedFromReplen?: boolean;
}

export interface IOrderCreation {
    OrderId?: number;
    DropShipOrderId?: number;
    OrderNumber?: number | null;
    Success?: boolean;
    OrderStatusId?: number;
    OrderStatus?: string | null;
    Message?: string;
    OrderItems?: string | number | null;
}