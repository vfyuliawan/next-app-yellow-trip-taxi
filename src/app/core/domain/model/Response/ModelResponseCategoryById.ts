// To parse this data:
//
//   import { Convert, ModelResponseCategoryByID } from "./file";
//
//   const modelResponseCategoryByID = Convert.toModelResponseCategoryByID(json);

export interface ModelResponseCategoryByID {
    data: DetailCategory;
    meta: Meta;
}

export interface DetailCategory {
    id:          number;
    documentId:  string;
    name:        string;
    description: null;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    locale:      null;
}

export interface Meta {
}

// Converts JSON strings to/from your types
export class ConvertModelResponseCategoryByID {
    public static toModelResponseCategoryByID(json: string): ModelResponseCategoryByID {
        return JSON.parse(json);
    }

    public static modelResponseCategoryByIDToJson(value: ModelResponseCategoryByID): string {
        return JSON.stringify(value);
    }
}
