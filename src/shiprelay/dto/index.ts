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
    @IsString()
    @Transform(({ value }) => value?.trim())
    name?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    sku?: string;
}

class SettingsDto {
    @IsNumber()
    @Min(0)
    ship_width: number;

    @IsNumber()
    @Min(0)
    ship_length: number;

    @IsNumber()
    @Min(0)
    ship_height: number;

    @IsNumber()
    @Min(0)
    ship_weight: number;

    @IsString()
    @IsOptional()
    @Length(3, 10, { message: 'Tariff code should be between 3 and 10 characters.' })
    tariff_code: string;

    @IsNumber()
    @Min(1)
    parent_qty: number;

    @IsBoolean()
    @IsOptional()
    is_requestable: boolean;

    @IsBoolean()
    @IsOptional()
    is_foldable: boolean;

    @IsBoolean()
    @IsOptional()
    is_alcoholic: boolean;

    @IsBoolean()
    @IsOptional()
    is_hazmat: boolean;

    @IsBoolean()
    @IsOptional()
    needs_box: boolean;

    @IsNumber()
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
    @IsString()
    @IsOptional()
    // @Length(5, 20, { message: 'Source ID must be between 5 and 20 characters.' })
    @Transform(({ value }) => value?.trim())
    source_id: string;

    @IsString()
    @Length(3, 20, { message: 'Category must be between 3 and 20 characters.' })
    @IsEnum(CategoryEnum, {
        message: `Invalid category. Must be one of the following: ${Object.values(CategoryEnum).join(', ')}`,
    })
    @Transform(({ value }) => value?.trim())
    category: CategoryEnum;

    @IsString()
    @Length(5, 15, { message: 'Barcode must be between 5 and 15 characters.' })
    @Transform(({ value }) => value?.trim())
    barcode: string;

    @IsString()
    @Length(5, 15, { message: 'SKU must be between 5 and 15 characters.' })
    @Transform(({ value }) => value?.trim())
    sku: string;

    @IsString()
    @Length(3, 50, { message: 'Product name must be between 3 and 50 characters.' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @IsString()
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
    status: ShipmentStatus;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    order_ref: string;
}

class AddressDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    name: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    company: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    address1: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    address2: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    city: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    region: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    zip: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    country: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    email: string;
}

class ItemDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    product_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    price: number;
}

export class ShipmentCreationDto {
    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    id?: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_order_id: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_shipment_id: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    order_ref: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    shipment_total_cost: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    package_ref: number;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    notes: string;

    @IsDateString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    shipment_created_at: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    shipping_selected_ref: string;

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];
}

export class ShipmentShippedDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_order_id: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    source_shipment_id: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    order_ref: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    tracking_number: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    tracking_url: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    carrier: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    service: string;
}

class ShipmentDestinationDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    name: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    company: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    address1: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    address2?: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    city: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    region: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    country: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    zip: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    phone: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    email: string;
}

class ShipmentItemDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(obj => +obj.value)
    price: number;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsInt()
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