// To parse this data:
//
//   import { Convert, GetModeResponsDetail } from "./file";
//
//   const getModeResponsDetail = Convert.toGetModeResponsDetail(json);

export interface GetModeResponsDetail {
    data: DetailArticel;
}

export interface DetailArticel {
    title:           string;
    description:     string;
    cover_image_url: string;
    category:        number | any;
    publishedAt?:    Date;
}

// Converts JSON strings to/from your types
export class ConvertGetModeResponsDetail {
    public static toGetModeResponsDetail(json: string): GetModeResponsDetail {
        return JSON.parse(json);
    }

    public static getModeResponsDetailToJson(value: GetModeResponsDetail): string {
        return JSON.stringify(value);
    }
}
