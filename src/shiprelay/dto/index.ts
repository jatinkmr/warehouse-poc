import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator";

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
    @Transform(obj => +obj.value)
    page: number;

    @IsOptional()
    @IsString({ message: 'Name must be a string!' })
    @Transform(({ value }) => value?.trim())
    name?: string;

    @IsOptional()
    @IsString({ message: 'SKU must be a string!' })
    @Transform(({ value }) => value?.trim())
    sku?: string;
}

class SettingsDto {
    @IsNumber({}, { message: 'ship_width must be a number!' })
    @Min(0)
    @Transform(obj => +obj.value)
    ship_width: number;

    @IsNumber({}, { message: 'ship_length must be a number!' })
    @Min(0)
    @Transform(obj => +obj.value)
    ship_length: number;

    @IsNumber({}, { message: 'ship_height must be a number!' })
    @Min(0)
    @Transform(obj => +obj.value)
    ship_height: number;

    @IsNumber({}, { message: 'ship_weight must be a number!' })
    @Min(0)
    @Transform(obj => +obj.value)
    ship_weight: number;

    @IsString({ message: 'tariff_code must be a string!' })
    @IsOptional()
    @Length(3, 10, { message: 'Tariff code should be between 3 and 10 characters.' })
    tariff_code?: string;

    @IsNumber({}, { message: 'Parent Qty must be a number!' })
    @IsOptional()
    @Transform(obj => +obj.value)
    parent_qty: number;

    @IsBoolean({ message: 'is_requestable value must be a boolean value!' })
    @IsOptional()
    is_requestable?: boolean;

    @IsBoolean({ message: 'is_foldable value must be a boolean value!' })
    @IsOptional()
    is_foldable?: boolean;

    @IsBoolean({ message: 'is_alcoholic value must be a boolean value!' })
    @IsOptional()
    is_alcoholic?: boolean;

    @IsBoolean({ message: 'is_hazmat value must be a boolean value!' })
    @IsOptional()
    is_hazmat?: boolean;

    @IsBoolean({ message: 'needs_box value must be a boolean value!' })
    @IsOptional()
    needs_box?: boolean;

    @IsNumber({}, { message: 'source_unit_cost must be a number!' })
    @Min(0)
    source_unit_cost: number;
}

enum CategoryEnum {
    HARD_GOODS = 'hard-goods',
    SOFT_GOODS = 'soft-goods',
    COMMODITY = 'commodity',
    GLASS = 'glass',
    MEDIA = 'media',
    BOXING = 'boxing',
    PRINT = 'print',
    PACKAGING = 'packaging',
}

export class ProductCreationDto {
    @IsString({ message: 'source_id must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    source_id?: string;

    @IsString({ message: 'Category must be a string!' })
    @Length(3, 20, { message: 'Category must be between 3 and 20 characters.' })
    @IsEnum(CategoryEnum, {
        message: `Invalid category. Must be one of the following: ${Object.values(CategoryEnum).join(', ')}`,
    })
    @Transform(({ value }) => value?.trim())
    category: CategoryEnum;

    @IsString({ message: 'Barcode must be a string!' })
    @Length(5, 15, { message: 'Barcode must be between 5 and 15 characters.' })
    @Transform(({ value }) => value?.trim())
    barcode: string;

    @IsString({ message: 'SKU must be a string!' })
    @Length(5, 15, { message: 'SKU must be between 5 and 15 characters.' })
    @Transform(({ value }) => value?.trim())
    sku: string;

    @IsString({ message: 'Name must be a string!' })
    @Length(3, 50, { message: 'Product name must be between 3 and 50 characters.' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @IsString({ message: 'Thumb must be a string!' })
    @Transform(({ value }) => value?.trim())
    thumb: string;

    @ValidateNested()
    @Type(() => SettingsDto)
    settings: SettingsDto;
}

enum ShipmentStatus {
    QUEUED = 'queued',
    HELD = 'held',
    REQUESTED = 'requested',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    RETURNED = 'returned',
    INACTIVE = 'inactive',
}

export class ShipmentFetchDto {
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

    @IsEnum(ShipmentStatus, {
        message: `Status must be one of the following: ${Object.values(ShipmentStatus).join(', ')}`,
    })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    status?: ShipmentStatus;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    order_ref?: string;
}

class AddressDto {
    @IsString({ message: 'Name must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    name: string;

    @IsString({ message: 'Company must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    company?: string;

    @IsString({ message: 'Address1 must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    address1: string;

    @IsString({ message: 'Address2 must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    address2?: string;

    @IsString({ message: 'City must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    city: string;

    @IsString({ message: 'Region must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    region: string;

    @IsString({ message: 'Zip must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    zip: string;

    @IsString({ message: 'Country must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    country: string;

    @IsString({ message: 'Phone must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    phone?: string;

    @IsEmail({}, { message: 'Email must be valid email address!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    email: string;
}

class ItemDto {
    @IsNumber({}, { message: 'ProductId must be a number!' })
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    product_id: number;

    @IsNumber({}, { message: 'Quantity must be a number!' })
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    quantity: number;

    @IsNumber({}, { message: 'Price must be a number!' })
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    price: number;
}

export class ShipmentCreationDto {
    @IsString({ message: 'ID must be a string' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    id?: string;

    @IsString({ message: 'Source_Order_Id must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_order_id: string;

    @IsString({ message: 'source_shipment_id must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_shipment_id: string;

    @IsString({ message: 'Order_Ref must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    order_ref: string;

    @IsNumber({}, { message: 'Shipment_total_cost must be number!' })
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    shipment_total_cost: number;

    @IsNumber({}, { message: 'Package_Ref must be a number!' })
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    package_ref: number;

    @IsString({ message: 'Notes must be a string!!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    notes?: string;

    @IsDateString({}, { message: 'shipment_create_at must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    shipment_created_at: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString({ message: 'shipping_selected_ref must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    shipping_selected_ref?: string;

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];
}

export class ShipmentShippedDto {
    @IsString({ message: 'source_order_id must be a string!!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_order_id: string;

    @IsString({ message: 'source_shipment_id must be string' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_shipment_id: string;

    @IsString({ message: 'Order_ref must be astring!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    order_ref: string;

    @IsString({ message: 'tracking_number must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    tracking_number: string;

    @IsString({ message: 'tracking_url must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    tracking_url: string;

    @IsString({ message: 'Carrier must be a string!!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    carrier: string;

    @IsString({ message: 'Service must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    service: string;
}

class ShipmentDestinationDto {
    @IsString({ message: 'Name must be astring!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    name: string;

    @IsString({ message: 'Company must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    company?: string;

    @IsString({ message: 'Address1 must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    address1: string;

    @IsString({ message: 'Address2 must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    address2?: string;

    @IsString({ message: 'City must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    city: string;

    @IsString({ message: 'Region must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    region: string;

    @IsString({ message: 'Country must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    country: string;

    @IsString({ message: 'Zip must be a string!' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    zip: string;

    @IsString({ message: 'Phone must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    phone?: string;

    @IsString({ message: 'Email must be a string!' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    email?: string;
}

class ShipmentItemDto {
    @IsNumber({}, { message: 'Quantity must be a number!' })
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    quantity: number;

    @IsNumber({}, { message: 'Price must be a number!' })
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    price: number;

    @IsString({ message: 'Currencty must be a strng!' })
    @IsNotEmpty()
    currency: string;

    @IsInt({ message: 'Product Id must be a number!' })
    @IsNotEmpty()
    product_id: number;
}

export class ShipmentRateDto {
    @ValidateNested()
    @Type(() => ShipmentDestinationDto)
    destination: ShipmentDestinationDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ShipmentItemDto)
    items: ShipmentItemDto[];
}