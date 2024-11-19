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

interface IItem {
    product_id: number;
    quantity: number;
    sub_total: number;
}

interface IParcel {
    name: string | null;
    dims: string | null;
    weight: number | null;
}

interface ICarrier {
    carrier: string;
    service: string | null;
    options: ICarrierOptions;
}

interface ICarrierOptions {
    carrier_insurance: boolean;
    delivery_confirmation: boolean;
}

interface Address {
    name: string;
    company: string;
    address1: string;
    address2: string | null;
    city: string;
    region: string;
    zip: string;
    country: string;
    phone: string;
    email: string;
}

export interface IShipmentModel extends ObjectionModel {
    id?: string;
    reseller_id?: string;
    type?: string;
    status?: string;
    source_order_id?: string;
    source_shipment_id?: string | null;
    order_ref?: string;
    shipment_total_cost?: number;
    package_ref?: number;
    notes?: string | null;
    shipment_created_at?: Date;
    tags?: string[] | null;
    shipping_selected_ref?: string | null;
    items?: IItem[];
    parcel?: IParcel[];
    carrier?: ICarrier[];
    tracking?: string | null;
    address?: Address;
    warehouse?: string | null;
    created_at?: Date;
    updated_at?: Date;
}