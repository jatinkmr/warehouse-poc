import { Transform, Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator";

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

export class ProductCreationDto {
    @IsString()
    @Length(5, 20, { message: 'Source ID must be between 5 and 20 characters.' })
    source_id: string;

    @IsString()
    @Length(3, 20, { message: 'Category must be between 3 and 20 characters.' })
    category: string;

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
