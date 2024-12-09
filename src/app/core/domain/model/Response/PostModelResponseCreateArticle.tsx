// To parse this data:
//
//   import { Convert, ModelResponseCreateArticle } from "./file";
//
//   const modelResponseCreateArticle = Convert.toModelResponseCreateArticle(json);

export interface ModelResponseCreateArticle {
    data: DataArticle;
    meta: Meta;
}

export interface DataArticle {
    id:              number;
    documentId:      string;
    title:           string;
    description:     string;
    cover_image_url: string;
    createdAt:       Date;
    updatedAt:       Date;
    publishedAt:     Date;
    locale:          null;
}

export interface Meta {
}

// Converts JSON strings to/from your types
export class ConvertModelResponseCreateArticle {
    public static toModelResponseCreateArticle(json: string): ModelResponseCreateArticle {
        return JSON.parse(json);
    }

    public static modelResponseCreateArticleToJson(value: ModelResponseCreateArticle): string {
        return JSON.stringify(value);
    }
}
