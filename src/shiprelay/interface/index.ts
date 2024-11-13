import { ObjectionModel } from "@libs/boat";

interface ISettingModel extends ObjectionModel {
    parent_qty?: number;
    is_requestable?: boolean;
    is_foldable?: boolean;
    is_alcoholic?: boolean;
    is_hazmat?: boolean;
    needs_box?: boolean;
    ship_length?: number;
    ship_width?: number;
    ship_height?: number;
    ship_weight?: number;
    tariff_code?: string;
    source_unit_cost?: number;
    min_product_stock_threshold?: number;
    default_retail_price_per_unit?: number;
    ship_volume?: number;
    is_fragile?: boolean;
    needs_segregation?: boolean;
    is_meshable?: boolean;
    source_id: number;
}

export interface IProductModel extends ObjectionModel {
    id?: number;
    suite_id?: number;
    source_id?: string;
    type?: string;
    category?: string;
    barcode?: string;
    sku?: string;
    name?: string;
    thumb?: string;
    stock_count?: number;
    reserved_count?: number;
    available_count?: number;
    once_received?: boolean;
    settings?: ISettingModel,
    updated_at?: Date;
    archived_at?: Date;
}
