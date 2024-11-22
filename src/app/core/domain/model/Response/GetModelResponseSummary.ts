// To parse this data:
//
//   import { Convert, ModelResponsePaymentSummary } from "./file";
//
//   const modelResponsePaymentSummary = Convert.toModelResponsePaymentSummary(json);

export interface GetModelResponseSummary {
    data:         DataSummary[];
    message:      string;
    messageError: null;
    statusCode:   number;
}

export interface DataSummary {
    payment_type:     string;
    sum_total_amount: string;
}

// Converts JSON strings to/from your types
export class ConvertGetModelResponseSummary {
    public static toModelResponsePaymentSummary(json: string): GetModelResponseSummary {
        return JSON.parse(json);
    }

    public static modelResponsePaymentSummaryToJson(value: GetModelResponseSummary): string {
        return JSON.stringify(value);
    }
}
