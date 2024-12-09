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
    LastUpdated?: Date = new Date();

    @IsString()
    LastUpdatedByUser: string = "gray.porter";
}

export class UpdateProductDto {
    @IsInt({ message: 'ID must be a positive number!' })
    @IsOptional()
    @Transform(({ value }) => +value)
    ID?: number;

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
    @IsString({ message: 'Order Item Name must be a string!' })
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString({ message: 'Order Item Value must be a string!' })
    @Transform(({ value }) => value?.trim())
    Value: string;
}

class OrderItemDto {
    @IsString({ message: 'SKU must be a string!' })
    @Transform(({ value }) => value?.trim())
    SKU: string;

    @IsInt({ message: 'ProductId must be a number!' })
    @Transform(obj => +obj.value)
    ProductId: number;

    @IsInt({ message: 'Quantity must be a number!' })
    @Transform(obj => +obj.value)
    Quantity: number;

    @IsString({ message: 'Details must be a string!' })
    @Transform(({ value }) => value?.trim())
    Details: string;

    @IsNumber({}, { message: 'Unit Price must be a number' })
    @Transform(obj => +obj.value)
    UnitPrice: number;

    @IsNumber({}, { message: 'UnitPriceVat must be a number!' })
    @Transform(obj => +obj.value)
    UnitPriceVat: number;

    @IsNumber({}, { message: 'Discount must be a number!' })
    @Transform(obj => +obj.value)
    Discount: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OrderItemNameValueDto)
    @IsArray()
    OrderItemNameValues?: OrderItemNameValueDto[];

    @IsOptional()
    @IsInt({ message: 'WarehouseId must be a number!' })
    @Transform(obj => +obj.value)
    WarehouseId?: number;

    @IsOptional()
    @IsString({ message: 'RequestedSerialNo must be a string!' })
    @Transform(({ value }) => value?.trim())
    RequestedSerialNo?: string;

    @IsOptional()
    @IsString({ message: 'RequestedBatchNo must be a string!' })
    @Transform(({ value }) => value?.trim())
    RequestedBatchNo?: string;

    @IsOptional()
    @IsString({ message: 'RequestedBBEDate must be a string!' })
    @Transform(({ value }) => value?.trim())
    RequestedBBEDate?: string;
}

class OrderNameValueDto {
    @IsString({ message: 'Name must be a string!' })
    @Transform(({ value }) => value?.trim())
    Name: string;

    @IsString({ message: 'Value must be a string!' })
    @Transform(({ value }) => value?.trim())
    Value: string;
}

class CashOnDeliveryDto {
    @IsNumber({}, { message: 'Amount must be a number!' })
    @Transform(obj => +obj.value)
    Amount: number;

    @IsString({ message: 'CurrenctyCode must be a string!' })
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

    @IsString({ message: 'OrderNumber must be a string!' })
    @Matches(/^ORD-\d{4}-\d{4}-\d{4}$/, {
        message: 'OrderNumber must match the format ORD-YYYY-MMDD-XXXX',
    })
    @Transform(({ value }) => value?.trim())
    OrderNumber: string;

    @IsOptional()
    @IsString({ message: 'ExternalOrderReference must be a string!' })
    @Transform(({ value }) => value?.trim())
    ExternalOrderReference?: string;

    @IsOptional()
    @IsString({ message: 'Title must be a string!' })
    @Transform(({ value }) => value?.trim())
    Title?: string;

    @IsOptional()
    @IsString({ message: 'CompanyName must be a string!' })
    @Transform(({ value }) => value?.trim())
    CompanyName?: string;

    @IsString({ message: 'FirstName must be a string!' })
    @Transform(({ value }) => value?.trim())
    FirstName: string;

    @IsOptional()
    @IsString({ message: 'LastName must be a string!' })
    @Transform(({ value }) => value?.trim())
    LastName?: string;

    @IsString({ message: 'Address1 must be a string!' })
    @Transform(({ value }) => value?.trim())
    Address1: string;

    @IsString({ message: 'Address2 must be a string!' })
    @Transform(({ value }) => value?.trim())
    Address2: string;

    @IsString({ message: 'Address3 must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    Address3?: string;

    @IsString({ message: 'Town must be a string!' })
    @Transform(({ value }) => value?.trim())
    Town: string;

    @IsOptional()
    @IsString({ message: 'County must be a string!' })
    @Transform(({ value }) => value?.trim())
    County?: string;

    @IsString({ message: 'PostCode must be a string!' })
    @Transform(({ value }) => value?.trim())
    PostCode: string;

    @IsString({ message: 'Country must be a string!' })
    @Transform(({ value }) => value?.trim())
    Country: string;

    @IsOptional()
    @IsInt({ message: 'CountryId must be an integer value!' })
    @Transform(obj => +obj.value)
    CountryId?: number;

    @IsString({ message: 'Email must be a string!' })
    @Transform(({ value }) => value?.trim())
    Email: string;

    @IsOptional()
    @IsString({ message: 'Phone must be a string!' })
    @Transform(({ value }) => value?.trim())
    Phone?: string;

    @IsString({ message: 'Mobile must be a string!' })
    @Transform(({ value }) => value?.trim())
    Mobile: string;

    @IsOptional()
    @IsString({ message: 'CourierService must be a string!' })
    @Transform(({ value }) => value?.trim())
    CourierService?: string;

    @IsOptional()
    @IsInt({ message: 'CourierSerivceId must be an integer value!' })
    @Transform(obj => +obj.value)
    CourierServiceId?: number;

    @IsOptional()
    @IsString({ message: 'Channel must be a string!' })
    @Transform(({ value }) => value?.trim())
    Channel?: string;

    @IsOptional()
    @IsInt({})
    @Transform(obj => +obj.value)
    ChannelId?: number;

    @IsOptional()
    @IsString({ message: 'Warehouse must be a string!' })
    @Transform(({ value }) => value?.trim())
    Warehouse?: string;

    @IsInt({ message: 'WarehouseId must be a number!' })
    @Transform(obj => +obj.value)
    WarehouseId: number;

    @IsString({ message: 'Currency must be a string!' })
    @Transform(({ value }) => value?.trim())
    Currency: string;

    @IsOptional()
    @IsInt({ message: 'CurrencyId must be an integer value!' })
    @Transform(obj => +obj.value)
    CurrencyId?: number;

    @IsOptional()
    @IsDateString({}, { message: 'DeliveryDate must be a valid ISO 8601 date string!' })
    // @IsDateString({ message: 'DeliveryDate must be ' })
    @Transform(({ value }) => value?.trim())
    DeliveryDate?: string;

    @IsOptional()
    @IsDateString({}, { message: 'DespatchDate must be a valid ISO 8601 date string!' })
    @Transform(({ value }) => value?.trim())
    DespatchDate?: string;

    @IsOptional()
    @IsDateString({}, { message: 'RequiredDeliveryDate must be a valid ISO 8601 date string!' })
    @Transform(({ value }) => value?.trim())
    RequiredDeliveryDate?: string;

    @IsOptional()
    @IsDateString({}, { message: 'RequiredDespatchDate must be a valid ISO 8601 date string!' })
    @Transform(({ value }) => value?.trim())
    RequiredDespatchDate?: string;

    @IsString({ message: 'Comments must be a string!' })
    @Transform(({ value }) => value?.trim())
    Comments: string;

    @IsString({ message: 'DeliveryNotes must be a string!' })
    @Transform(({ value }) => value?.trim())
    DeliveryNotes: string;

    @IsString({ message: 'GiftMessages must be a string!' })
    @Transform(({ value }) => value?.trim())
    GiftMessages: string;

    @IsOptional()
    @IsString({ message: 'VATNumber must be a string!' })
    @Transform(({ value }) => value?.trim())
    VATNumber?: string;

    @IsOptional()
    @IsString({ message: 'EORINumber must be a string!' })
    @Transform(({ value }) => value?.trim())
    EORINumber?: string;

    @IsOptional()
    @IsString({ message: 'PIDNumber must be a string!' })
    @Transform(({ value }) => value?.trim())
    PIDNumber?: string;

    @IsOptional()
    @IsString({ message: 'IOSSNumber must be a string!' })
    @Transform(({ value }) => value?.trim())
    IOSSNumber?: string;

    @IsOptional()
    @IsNumber({}, { message: 'OrderValue must be a valid number!' })
    @Transform(obj => +obj.value)
    OrderValue?: number;

    @IsOptional()
    @IsNumber({}, { message: 'ShippingTotalExVat must be a valid number!' })
    @Transform(obj => +obj.value)
    ShippingTotalExVat?: number;

    @IsOptional()
    @IsNumber({}, { message: 'ShippingTotalVat must be a Valid number!' })
    @Transform(obj => +obj.value)
    ShippingTotalVat?: number;

    @IsOptional()
    @IsNumber({}, { message: 'DiscountTotalExVat must be a valid number!' })
    @Transform(obj => +obj.value)
    DiscountTotalExVat?: number;

    @IsOptional()
    @IsNumber({}, { message: 'DiscountTotalVat must be a valid number!' })
    @Transform(obj => +obj.value)
    DiscountTotalVat?: number;

    @IsOptional()
    @IsNumber({}, { message: 'TotalVat must be a valid number!' })
    @Transform(obj => +obj.value)
    TotalVat?: number;

    @IsOptional()
    @IsInt({ message: 'ClientId must be a valid number!' })
    @Transform(obj => +obj.value)
    ClientId?: number;

    @IsOptional()
    @IsInt({ message: 'NumberOfParcels must be a valid number!' })
    @Transform(obj => +obj.value)
    NumberOfParcels?: number;

    @ValidateNested()
    @Type(() => CashOnDeliveryDto)
    CashOnDelivery: CashOnDeliveryDto;

    @IsString({ message: 'RecipientType must be a string!' })
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
