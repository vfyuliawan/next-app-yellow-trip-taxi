// To parse this data:
//
//   import { Convert, GetModelResponseData } from "./file";
//
//   const getModelResponseData = Convert.toGetModelResponseData(json);

export interface GetModelResponseData {
    data:         DataTransaction[];
    pagination:   Pagination;
    message:      string;
    messageError: null;
    statusCode:   number;
}


export interface Pagination {
    currentPage: number;
    pageSize:    number;
    totalPages:  number;
}


export interface DataTransaction {
    vendor_id:           VendorID;
    cityPickup?: string;
    cityDropOff?: string;
    pickup_datetime:     Date;
    dropoff_datetime:    Date;
    passenger_count:     string;
    trip_distance:       string;
    pickup_longitude:    string;
    pickup_latitude:     string;
    store_and_fwd_flag?: StoreAndFwdFlag;
    dropoff_longitude:   string;
    dropoff_latitude:    string;
    payment_type:        PaymentType;
    fare_amount:         string;
    mta_tax:             string;
    tip_amount:          string;
    tolls_amount:        string;
    total_amount:        string;
    imp_surcharge:       string;
    rate_code:           string;
}

export enum PaymentType {
    Crd = "CRD",
    Csh = "CSH",
    NOC = "NOC",
    Unk = "UNK",
}

export enum StoreAndFwdFlag {
    N = "N",
    Y = "Y",
}

export enum VendorID {
    Cmt = "CMT",
    Vts = "VTS",
}

// Converts JSON strings to/from your types
export class ConvertGetModelResponseData {
    public static toGetModelResponseData(json: string): GetModelResponseData {
        return JSON.parse(json);
    }

    public static getModelResponseDataToJson(value: GetModelResponseData): string {
        return JSON.stringify(value);
    }
}
