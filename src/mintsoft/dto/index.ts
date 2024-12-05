import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, ValidateNested } from "class-validator";

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

export class ProductDto {
    @IsString({ message: 'SKU must be a string!' })
    @IsNotEmpty({ message: 'SKU is required!' })
    @MaxLength(75, { message: 'SKU must not exceed 75 characters!' })
    @Transform(({ value }) => value?.trim())
    SKU: string;

    @IsString({ message: 'Name must be a string!' })
    @IsNotEmpty({ message: 'Name is required!' })
    @MaxLength(99, { message: 'Name must not exceed 99 characters!' })
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString({ message: 'Description must be a string!' })
    @IsNotEmpty({ message: 'Description is required!' })
    @Transform(({ value }) => value?.trim())
    Description: string;

    @IsNumber({}, { message: 'Weight must be a valid number!' })
    @Transform(({ value }) => (value !== null && value !== undefined ? +value : value))
    Weight: number;

    @IsString({ message: 'ImageURL must be a string!' })
    @IsNotEmpty({ message: 'ImageURL is required!' })
    @Transform(({ value }) => value?.trim())
    ImageURL: string;

    @IsOptional()
    LastUpdated: Date = new Date();

    @IsString()
    LastUpdatedByUser: string = "gray.porter";
}

export class UpdateProductDto {
    @IsInt()
    @IsOptional()
    @Transform(obj => +obj.value)
    ID: number;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    SKU?: string;

    @IsString({ message: 'Name must be a string!' })
    @IsNotEmpty({ message: 'Name is required!' })
    @MaxLength(99, { message: 'Name must not exceed 99 characters!' })
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString({ message: 'Description must be a string!' })
    @IsNotEmpty({ message: 'Description is required!' })
    @Transform(({ value }) => value?.trim())
    Description: string;

    @IsNumber({}, { message: 'Weight must be a valid number!' })
    @Transform(({ value }) => (value !== null && value !== undefined ? +value : value))
    Weight: number;

    @IsString({ message: 'ImageURL must be a string!' })
    @IsNotEmpty({ message: 'ImageURL is required!' })
    @Transform(({ value }) => value?.trim())
    ImageURL: string;

    @IsOptional()
    LastUpdated: Date = new Date();

    @IsString()
    LastUpdatedByUser: string = "gray.porter";
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

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OrderItemNameValueDto)
    @IsArray()
    OrderItemNameValues?: OrderItemNameValueDto[];

    @IsOptional()
    @IsInt()
    @Transform(obj => +obj.value)
    WarehouseId?: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    RequestedSerialNo: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    RequestedBatchNo: string;

    @IsOptional()
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

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OrderNameValueDto)
    @IsArray()
    OrderNameValues?: OrderNameValueDto[];

    @IsString()
    @Matches(/^ORD-\d{4}-\d{4}-\d{4}$/, {
        message: 'OrderNumber must match the format ORD-YYYY-MMDD-XXXX',
    })
    @Transform(({ value }) => value?.trim())
    OrderNumber: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    ExternalOrderReference?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    Title?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    CompanyName?: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    FirstName: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    LastName?: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Address1: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Address2: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    Address3?: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Town: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    County?: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    PostCode: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Country: string;

    @IsOptional()
    @IsInt()
    @Transform(obj => +obj.value)
    CountryId?: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Email: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    Phone?: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Mobile: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    CourierService?: string;

    @IsOptional()
    @IsInt()
    @Transform(obj => +obj.value)
    CourierServiceId?: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    Channel?: string;

    @IsOptional()
    @IsInt()
    @Transform(obj => +obj.value)
    ChannelId?: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    Warehouse?: string;

    @IsInt()
    @Transform(obj => +obj.value)
    WarehouseId: number;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Currency: string;

    @IsOptional()
    @IsInt()
    @Transform(obj => +obj.value)
    CurrencyId?: number;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value?.trim())
    DeliveryDate?: string;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value?.trim())
    DespatchDate?: string;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value?.trim())
    RequiredDeliveryDate?: string;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value?.trim())
    RequiredDespatchDate?: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    Comments: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    DeliveryNotes: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    GiftMessages: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    VATNumber?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    EORINumber?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    PIDNumber?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    IOSSNumber?: string;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    OrderValue?: number;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    ShippingTotalExVat?: number;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    ShippingTotalVat?: number;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    DiscountTotalExVat?: number;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    DiscountTotalVat?: number;

    @IsOptional()
    @IsNumber()
    @Transform(obj => +obj.value)
    TotalVat?: number;

    @IsOptional()
    @IsInt()
    @Transform(obj => +obj.value)
    ClientId?: number;

    @IsOptional()
    @IsInt()
    @Transform(obj => +obj.value)
    NumberOfParcels?: number;

    @ValidateNested()
    @Type(() => CashOnDeliveryDto)
    CashOnDelivery: CashOnDeliveryDto;

    @IsString()
    @Transform(({ value }) => value?.trim())
    RecipientType?: string;
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
