import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Min, ValidateNested } from "class-validator";

export class FetchProductDto {
    @IsInt({ message: 'Limit must be a positive integer' })
    @Min(1, { message: 'Limit must be at least 1' })
    @IsNumber({}, { message: 'Limit must be a number!' })
    @IsNotEmpty({ message: 'Limit is required!' })
    @Transform(obj => +obj.value)
    limit: number;

    @IsInt({ message: 'Page must be a positive integer' })
    @Min(1, { message: 'Page must be at least 1' })
    @IsNumber({}, { message: 'Page must be a number!' })
    @IsNotEmpty({ message: 'Page is required!' })
    page: number;
}

class CommodityCodeDto {
    @IsString({ message: 'Code must be a string!' })
    @Transform(({ value }) => value?.trim())
    Code: string;

    @IsInt()
    @Transform(obj => +obj.value)
    ID: number;

    @IsOptional()
    LastUpdated: Date = new Date();

    @IsString()
    LastUpdatedByUser: string = "gray.porter";
}

class CountryOfManufactureDto {
    @IsString()
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Code: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Code3: string;

    @IsInt()
    @Transform(obj => +obj.value)
    ID: number;

    @IsOptional()
    LastUpdated: Date = new Date();

    @IsString()
    LastUpdatedByUser: string = "gray.porter";
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
    @Transform(({ value }) => value?.trim())
    SKU: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    PalletSizes: string;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    PackingInstructions: string | null;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Description: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    CustomsDescription: string;

    @IsInt()
    @Transform(obj => +obj.value)
    CountryOfManufactureId: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    EAN: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    UPC: string;

    @IsInt()
    LowStockAlertLevel: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    Weight: number;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    Height: number | null;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    Width: number | null;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    Depth: number | null;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    Volume: number | null;

    @IsBoolean()
    BackOrder: boolean;

    @IsBoolean()
    Bundle: boolean;

    @IsBoolean()
    DisCont: boolean;

    @IsNumber()
    @Transform(obj => +obj.value)
    Price: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    CostPrice: number;

    @IsBoolean()
    VatExempt: boolean;

    @IsInt()
    @Transform(obj => +obj.value)
    AdditionalParcelsRequired: number;

    @IsInt()
    @Transform(obj => +obj.value)
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
    @Transform(obj => +obj.value)
    BestBeforeDateWarningPeriodDays: number;

    @IsInt()
    @Transform(obj => +obj.value)
    HandlingTime: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    UnNumber: string | null;

    @IsString()
    @Transform(({ value }) => value?.trim())
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
    @Transform(obj => +obj.value)
    SubscriptionLength: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    SubscriptionFrequency: string | null;

    @IsInt()
    @Transform(obj => +obj.value)
    ClientId: number;

    @IsOptional()
    LastUpdated: Date = new Date();

    @IsString()
    LastUpdatedByUser: string = "gray.porter";
}

export class UpdateProductDto extends ProductDto {
    @IsInt()
    @IsOptional()
    @Transform(obj => +obj.value)
    ID: number;
}

class OrderItemNameValueDto {
    @IsString()
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Value: string;
}

class OrderItemDto {
    @IsString()
    @Transform(({ value }) => value?.trim())
    SKU: string;

    @IsInt()
    @Transform(obj => +obj.value)
    ProductId: number;

    @IsInt()
    @Transform(obj => +obj.value)
    Quantity: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Details: string;

    @IsNumber()
    @Transform(obj => +obj.value)
    UnitPrice: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    UnitPriceVat: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    Discount: number;

    @ValidateNested({ each: true })
    @Type(() => OrderItemNameValueDto)
    @IsArray()
    OrderItemNameValues: OrderItemNameValueDto[];

    @IsInt()
    @Transform(obj => +obj.value)
    WarehouseId: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    RequestedSerialNo: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    RequestedBatchNo: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    RequestedBBEDate: string;
}

class OrderNameValueDto {
    @IsString()
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Value: string;
}

class CashOnDeliveryDto {
    @IsNumber()
    @Transform(obj => +obj.value)
    Amount: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
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
    @Matches(/^ORD-\d{4}-\d{4}-\d{4}$/, {
        message: 'OrderNumber must match the format ORD-YYYY-MMDD-XXXX',
    })
    @Transform(({ value }) => value?.trim())
    OrderNumber: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    ExternalOrderReference: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Title: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    CompanyName: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    FirstName: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    LastName: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Address1: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Address2: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Address3: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Town: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    County: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    PostCode: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Country: string;

    @IsInt()
    @Transform(obj => +obj.value)
    CountryId: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Email: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Phone: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Mobile: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    CourierService: string;

    @IsInt()
    @Transform(obj => +obj.value)
    CourierServiceId: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Channel: string;

    @IsInt()
    @Transform(obj => +obj.value)
    ChannelId: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Warehouse: string;

    @IsInt()
    @Transform(obj => +obj.value)
    WarehouseId: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Currency: string;

    @IsInt()
    @Transform(obj => +obj.value)
    CurrencyId: number;

    @IsDateString()
    @Transform(({ value }) => value?.trim())
    DeliveryDate: string;

    @IsDateString()
    @Transform(({ value }) => value?.trim())
    DespatchDate: string;

    @IsDateString()
    @Transform(({ value }) => value?.trim())
    RequiredDeliveryDate: string;

    @IsDateString()
    @Transform(({ value }) => value?.trim())
    RequiredDespatchDate: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Comments: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    DeliveryNotes: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    GiftMessages: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    VATNumber: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    EORINumber: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    PIDNumber: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    IOSSNumber: string;

    @IsNumber()
    @Transform(obj => +obj.value)
    OrderValue: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    ShippingTotalExVat: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    ShippingTotalVat: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    DiscountTotalExVat: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    DiscountTotalVat: number;

    @IsNumber()
    @Transform(obj => +obj.value)
    TotalVat: number;

    @IsInt()
    @Transform(obj => +obj.value)
    ClientId: number;

    @IsInt()
    @Transform(obj => +obj.value)
    NumberOfParcels: number;

    @ValidateNested()
    @Type(() => CashOnDeliveryDto)
    CashOnDelivery: CashOnDeliveryDto;

    @IsString()
    @Transform(({ value }) => value?.trim())
    RecipientType: string;
}

export class FetchOrderDto {
    @IsInt({ message: 'Limit must be a positive integer' })
    @Min(1, { message: 'Limit must be at least 1' })
    @IsNumber({}, { message: 'Limit must be a number!' })
    @IsNotEmpty({ message: 'Limit is required!' })
    @Transform(obj => +obj.value)
    limit: number;

    @IsInt({ message: 'Page must be a positive integer' })
    @Min(1, { message: 'Page must be at least 1' })
    @IsNumber({}, { message: 'Page must be a number!' })
    @IsNotEmpty({ message: 'Page is required!' })
    @Transform(obj => +obj.value)
    page: number;

    @IsOptional()
    @IsNumber({}, { message: 'WarehouseId must be a number!' })
    @Transform(obj => +obj.value)
    warehouseId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Order StatusId must be a number!' })
    @Transform(obj => +obj.value)
    orderStatusId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Courier ServiceId must be a number!' })
    @Transform(obj => +obj.value)
    courierServiceId?: number;
}

export class ReturnCreationDto {
    @IsNumber({}, { message: 'OrderId must be a number!' })
    @IsNotEmpty({ message: 'OrderId is required!' })
    @Transform(obj => +obj.value)
    OrderId: number;
}
