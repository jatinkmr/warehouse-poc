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

interface IOrderChannel {
    Name?: string;
    Description?: string | null;
    Active?: boolean;
    Logo?: string;
    ClientId?: number;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

interface IOrderCountry {
    Name?: string;
    Code?: string;
    Code3?: string;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

interface IOrderCurrency {
    Name?: string;
    Code?: string;
    Symbol?: string;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

interface IOrderNameValue {
    OrderId?: number;
    Name?: string;
    Value?: string;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

interface IOrderRecipientType {
    Name?: string;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

interface IOrderItemNameValues {
    Name?: string;
    Value?: string;
    Internal?: boolean;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

interface IOrderItems {
    OrderItemNameValues: IOrderItemNameValues[],
    OrderId?: number;
    ProductId?: number;
    Quantity?: number;
    Allocated?: number;
    Commited?: number;
    OnBackOrder?: number;
    SourceLineSubTotal?: number | null;
    SourceLineTotalTax?: number | null;
    SourceLineTotalDiscount?: number | null;
    SourceLineTotal?: number | null;
    Price?: number;
    Vat?: number;
    Discount?: number;
    PriceNet?: number;
    Tax?: number;
    DiscountGross?: number;
    TaxRate?: number | null;
    DiscountNet?: number | null;
    DiscountTax?: number | null;
    NetPaid?: number;
    TaxPaid?: number;
    TotalTax?: number;
    Details?: string;
    SKU?: string;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

export interface IOrderModel {
    Channel?: IOrderChannel,
    Country?: IOrderCountry,
    Currency?: IOrderCurrency,
    OrderNameValues: IOrderNameValue[],
    RecipientType: IOrderRecipientType,
    ClientId?: number;
    CLIENT_CODE?: string | null;
    OrderNumber?: string;
    ExternalOrderReference?: string;
    OrderDate?: string;
    DespatchDate?: string | null;
    RequiredDespatchDate?: string;
    RequiredDeliveryDate?: string;
    Title?: string;
    FirstName?: string;
    LastName?: string;
    CompanyName?: string;
    Address1?: string;
    Address2?: string;
    Address3?: string;
    Town?: string;
    County?: string;
    PostCode?: string;
    Phone?: string;
    Mobile?: string;
    Email?: string;
    CountryId?: number;
    Source?: string;
    Comments?: string;
    GiftMessages?: string;
    DeliveryNotes?: string;
    VATNumber?: string;
    EORINumber?: string;
    PIDNumber?: string;
    OrderStatusId?: number;
    NumberOfParcels?: number;
    TotalItems?: number;
    TotalWeight?: number;
    OrderValue?: number;
    Part?: number;
    NumberOfParts?: number;
    CourierServiceTypeId?: number;
    CourierServiceId?: number;
    CourierServiceName?: string;
    TrackingNumber?: string | null;
    TrackingURL?: string;
    ShippingTotalExVat?: number;
    DiscountTotalExVat?: number;
    DiscountTotalVat?: number;
    TotalVat?: number;
    PIIRemoved?: boolean;
    ShippingNet?: number;
    ShippingTax?: number;
    ShippingGross?: number;
    DiscountNet?: number;
    DiscountTax?: number;
    TotalOrderNet?: number | null;
    TotalOrderTax?: number;
    TotalOrderGross?: number;
    DiscountGross?: number;
    WarehouseId?: number;
    WAREHOUSE_CODE?: string | null;
    ChannelId?: number;
    CurrencyId?: number;
    DespatchedByUser: string | null;
    OrderItems: IOrderItems[],
    OrderLock?: boolean;
    Tags?: string | null;
    SourceOrderDate?: string | null;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

export interface IInventoryRecord {
    ProductId?: number;
    StockLevel?: number;
    Allocated?: number;
    OnHand?: number;
    AwaitingReplen?: number;
    OnOrder?: number;
    RequiredByBackOrder?: number;
    InQuarantine?: number;
    InTransit?: number;
    InTransition?: number;
    Scrapped?: number;
    SKU?: string;
    WarehouseId?: number;
    LocationId?: number;
    Breakdown?: string[] | null;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string;
}

export interface ICourierServiceType {
    Name?: string;
    Active?: boolean;
    ID?: number;
    LastUpdated?: string;
    LastUpdatedByUser?: string | null;
}