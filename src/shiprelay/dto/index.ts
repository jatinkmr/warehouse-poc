import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator";

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

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
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
    @Length(3, 10, { message: 'Tariff code should be between 3 and 10 characters.' })
    tariff_code: string;

    @IsNumber()
    @Min(1)
    parent_qty: number;

    @IsBoolean()
    is_requestable: boolean;

    @IsBoolean()
    is_foldable: boolean;

    @IsBoolean()
    is_alcoholic: boolean;

    @IsBoolean()
    is_hazmat: boolean;

    @IsBoolean()
    needs_box: boolean;

    @IsNumber()
    @Min(0)
    source_unit_cost: number;

    @IsNumber()
    @Min(0)
    min_product_stock_threshold: number;

    @IsNumber()
    @Min(0)
    default_retail_price_per_unit: number;
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
    @Length(5, 20, { message: 'Source ID must be between 5 and 20 characters.' })
    source_id: string;

    @IsString()
    @Length(3, 20, { message: 'Category must be between 3 and 20 characters.' })
    @IsEnum(CategoryEnum, {
        message: `Invalid category. Must be one of the following: ${Object.values(CategoryEnum).join(', ')}`,
    })
    category: CategoryEnum;

    @IsString()
    @Length(5, 15, { message: 'Barcode must be between 5 and 15 characters.' })
    barcode: string;

    @IsString()
    @Length(5, 15, { message: 'SKU must be between 5 and 15 characters.' })
    sku: string;

    @IsString()
    @Length(3, 50, { message: 'Product name must be between 3 and 50 characters.' })
    name: string;

    @IsString()
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
    limit: number;

    @IsInt({ message: 'Page must be a positive integer' })
    @Min(1, { message: 'Page must be at least 1' })
    @IsNumber({}, { message: 'Page must be a number!' })
    @IsNotEmpty({ message: 'Page is required!' })
    page: number;

    @IsEnum(ShipmentStatus, {
        message: `Status must be one of the following: ${Object.values(ShipmentStatus).join(', ')}`,
    })
    @IsOptional()
    status: ShipmentStatus;

    @IsOptional()
    order_ref: string;
}

class AddressDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    company: string;

    @IsString()
    @IsNotEmpty()
    address1: string;

    @IsString()
    @IsOptional()
    address2: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    region: string;

    @IsString()
    @IsNotEmpty()
    zip: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

class ItemDto {
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class ShipmentCreationDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    source_order_id: string;

    @IsString()
    @IsNotEmpty()
    source_shipment_id: string;

    @IsString()
    @IsNotEmpty()
    order_ref: string;

    @IsNumber()
    @IsNotEmpty()
    shipment_total_cost: number;

    @IsNumber()
    @IsNotEmpty()
    package_ref: number;

    @IsString()
    @IsOptional()
    notes: string;

    @IsDateString()
    @IsNotEmpty()
    shipment_created_at: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString()
    @IsOptional()
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
    source_order_id: string;

    @IsString()
    @IsNotEmpty()
    source_shipment_id: string;

    @IsString()
    @IsNotEmpty()
    order_ref: string;

    @IsString()
    @IsNotEmpty()
    tracking_number: string;

    @IsString()
    @IsNotEmpty()
    tracking_url: string;

    @IsString()
    @IsNotEmpty()
    carrier: string;

    @IsString()
    @IsNotEmpty()
    service: string;
}