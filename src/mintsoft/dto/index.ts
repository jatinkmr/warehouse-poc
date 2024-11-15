import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class FetchProductDto {
    @IsInt({ message: 'Limit must be a positive integer' })
    @Min(1, { message: 'Limit must be at least 1' })
    @IsNumber({}, { message: 'Limit must be a number!' })
    @IsNotEmpty({ message: 'Limit is required!' })
    limit: number;

    @IsInt({ message: 'Page must be a positive integer' })
    @Min(1, { message: 'Page must be at least 1' })
    @IsNumber({}, { message: 'Page must be a number!' })
    @IsNotEmpty({ message: 'Page is required!' })
    page: number;
}

class CommodityCodeDto {
    @IsString({ message: 'Code must be a string!' })
    Code: string;

    @IsInt()
    ID: number;

    @IsDateString()
    LastUpdated: string;

    @IsString()
    LastUpdatedByUser: string;
}

class CountryOfManufactureDto {
    @IsString()
    Name: string;

    @IsString()
    Code: string;

    @IsString()
    Code3: string;

    @IsInt()
    ID: number;

    @IsDateString()
    LastUpdated: string;

    @IsString()
    LastUpdatedByUser: string;
}

export class ProductDto {
    @ValidateNested()
    @Type(() => CommodityCodeDto)
    CommodityCode: CommodityCodeDto;

    @ValidateNested()
    @Type(() => CountryOfManufactureDto)
    CountryOfManufacture: CountryOfManufactureDto;

    @IsOptional()
    @IsArray()
    ProductInCategories: any[];

    @IsOptional()
    @IsArray()
    ProductPrices: any[];

    @IsOptional()
    @IsArray()
    ProductSuppliers: any[];

    @IsString()
    SKU: string;

    @IsString()
    Name: string;

    @IsString()
    @IsOptional()
    PalletSizes: string;

    @IsOptional()
    PackingInstructions: string | null;

    @IsString()
    Description: string;

    @IsString()
    CustomsDescription: string;

    @IsInt()
    CountryOfManufactureId: number;

    @IsString()
    EAN: string;

    @IsString()
    UPC: string;

    @IsInt()
    LowStockAlertLevel: number;

    @IsNumber()
    Weight: number;

    @IsOptional()
    @IsNumber()
    Height: number | null;

    @IsOptional()
    @IsNumber()
    Width: number | null;

    @IsOptional()
    @IsNumber()
    Depth: number | null;

    @IsOptional()
    @IsNumber()
    Volume: number | null;

    @IsBoolean()
    BackOrder: boolean;

    @IsBoolean()
    Bundle: boolean;

    @IsBoolean()
    DisCont: boolean;

    @IsNumber()
    Price: number;

    @IsNumber()
    CostPrice: number;

    @IsBoolean()
    VatExempt: boolean;

    @IsInt()
    AdditionalParcelsRequired: number;

    @IsInt()
    UnitsPerParcel: number;

    @IsBoolean()
    HasBatchNumber: boolean;

    @IsOptional()
    LogBatchInbound: any | null;

    @IsOptional()
    LogBatchOutbound: any | null;

    @IsBoolean()
    HasSerialNumber: boolean;

    @IsOptional()
    LogSerialInbound: any | null;

    @IsOptional()
    LogSerialOutbound: any | null;

    @IsBoolean()
    HasExpiryDate: boolean;

    @IsOptional()
    LogExpiryDateInbound: any | null;

    @IsOptional()
    LogExpiryDateOutbound: any | null;

    @IsInt()
    BestBeforeDateWarningPeriodDays: number;

    @IsInt()
    HandlingTime: number;

    @IsOptional()
    @IsString()
    UnNumber: string | null;

    @IsString()
    ImageURL: string;

    @IsOptional()
    ProductHazardousGoods: any | null;

    @IsOptional()
    ProductPurchasingSettings: any | null;

    @IsOptional()
    ProductGrowthRates: any | null;

    @IsOptional()
    ExternalFulFilmentProduct: any | null;

    @IsOptional()
    ExternalFulFilmentProductInventory: any | null;

    @IsOptional()
    OrderItems: any | null;

    @IsBoolean()
    Subscription: boolean;

    @IsInt()
    SubscriptionLength: number;

    @IsOptional()
    @IsString()
    SubscriptionFrequency: string | null;

    @IsInt()
    ClientId: number;

    @IsDateString()
    LastUpdated: string;

    @IsString()
    LastUpdatedByUser: string;
}

export class UpdateProductDto extends ProductDto {
    @IsInt()
    @IsOptional()
    ID: number;
}

class OrderItemNameValueDto {
    @IsString()
    Name: string;

    @IsString()
    Value: string;
}

class OrderItemDto {
    @IsString()
    SKU: string;

    @IsInt()
    ProductId: number;

    @IsInt()
    Quantity: number;

    @IsString()
    Details: string;

    @IsNumber()
    UnitPrice: number;

    @IsNumber()
    UnitPriceVat: number;

    @IsNumber()
    Discount: number;

    @ValidateNested({ each: true })
    @Type(() => OrderItemNameValueDto)
    @IsArray()
    OrderItemNameValues: OrderItemNameValueDto[];

    @IsInt()
    WarehouseId: number;

    @IsString()
    RequestedSerialNo: string;

    @IsString()
    RequestedBatchNo: string;

    @IsString()
    RequestedBBEDate: string;
}

class OrderNameValueDto {
    @IsString()
    Name: string;

    @IsString()
    Value: string;
}

class CashOnDeliveryDto {
    @IsNumber()
    Amount: number;

    @IsString()
    CurrencyCode: string;
}

export class OrderCreationDto {
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @IsArray()
    OrderItems: OrderItemDto[];

    @ValidateNested({ each: true })
    @Type(() => OrderNameValueDto)
    @IsArray()
    OrderNameValues: OrderNameValueDto[];

    @IsString()
    OrderNumber: string;

    @IsString()
    ExternalOrderReference: string;

    @IsString()
    Title: string;

    @IsString()
    CompanyName: string;

    @IsString()
    FirstName: string;

    @IsString()
    LastName: string;

    @IsString()
    Address1: string;

    @IsString()
    Address2: string;

    @IsString()
    Address3: string;

    @IsString()
    Town: string;

    @IsString()
    County: string;

    @IsString()
    PostCode: string;

    @IsString()
    Country: string;

    @IsInt()
    CountryId: number;

    @IsString()
    Email: string;

    @IsString()
    Phone: string;

    @IsString()
    Mobile: string;

    @IsString()
    CourierService: string;

    @IsInt()
    CourierServiceId: number;

    @IsString()
    Channel: string;

    @IsInt()
    ChannelId: number;

    @IsString()
    Warehouse: string;

    @IsInt()
    WarehouseId: number;

    @IsString()
    Currency: string;

    @IsInt()
    CurrencyId: number;

    @IsDateString()
    DeliveryDate: string;

    @IsDateString()
    DespatchDate: string;

    @IsDateString()
    RequiredDeliveryDate: string;

    @IsDateString()
    RequiredDespatchDate: string;

    @IsString()
    Comments: string;

    @IsString()
    DeliveryNotes: string;

    @IsString()
    GiftMessages: string;

    @IsString()
    VATNumber: string;

    @IsString()
    EORINumber: string;

    @IsString()
    PIDNumber: string;

    @IsString()
    IOSSNumber: string;

    @IsNumber()
    OrderValue: number;

    @IsNumber()
    ShippingTotalExVat: number;

    @IsNumber()
    ShippingTotalVat: number;

    @IsNumber()
    DiscountTotalExVat: number;

    @IsNumber()
    DiscountTotalVat: number;

    @IsNumber()
    TotalVat: number;

    @IsInt()
    ClientId: number;

    @IsInt()
    NumberOfParcels: number;

    @ValidateNested()
    @Type(() => CashOnDeliveryDto)
    CashOnDelivery: CashOnDeliveryDto;

    @IsString()
    RecipientType: string;
}

export class FetchOrderDto {
    @IsInt({ message: 'Limit must be a positive integer' })
    @Min(1, { message: 'Limit must be at least 1' })
    @IsNumber({}, { message: 'Limit must be a number!' })
    @IsNotEmpty({ message: 'Limit is required!' })
    limit: number;

    @IsInt({ message: 'Page must be a positive integer' })
    @Min(1, { message: 'Page must be at least 1' })
    @IsNumber({}, { message: 'Page must be a number!' })
    @IsNotEmpty({ message: 'Page is required!' })
    page: number;

    @IsOptional()
    @IsNumber({}, { message: 'WarehouseId must be a number!' })
    warehouseId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Order StatusId must be a number!' })
    orderStatusId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Courier ServiceId must be a number!' })
    courierServiceId?: number;
}