// To parse this data:
//
//   import { Convert, ModelRequestCreateArticle } from "./file";
//
//   const modelRequestCreateArticle = Convert.toModelRequestCreateArticle(json);

export interface ModelRequestCreateArticle {
    data: DataArticelSubmit;
}

export interface DataArticelSubmit {
    title:           string;
    description:     string;
    cover_image_url: string;
    category:        number;
}

// Converts JSON strings to/from your types
export class ConvertModelRequestCreateArticle {
    public static toModelRequestCreateArticle(json: string): ModelRequestCreateArticle {
        return JSON.parse(json);
    }

    public static modelRequestCreateArticleToJson(value: ModelRequestCreateArticle): string {
        return JSON.stringify(value);
    }
}
