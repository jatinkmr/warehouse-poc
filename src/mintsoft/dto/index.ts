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
    @IsString()
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

export class UpdateProductDto {
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

    @IsInt()
    ID: number;

    @IsDateString()
    LastUpdated: string;

    @IsString()
    LastUpdatedByUser: string;
}