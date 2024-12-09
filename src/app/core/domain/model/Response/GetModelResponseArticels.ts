// To parse this data:
//
//   import { Convert, GetModelResponseArticels } from "./file";
//
//   const getModelResponseArticels = Convert.toGetModelResponseArticels(json);

export interface GetModelResponseArticels {
    data: ListArticles[];
    meta: Meta;
}

export interface ListArticles {
    id:              number;
    documentId:      string;
    title:           string;
    description:     string;
    cover_image_url: string;
    createdAt:       Date;
    updatedAt:       Date;
    publishedAt:     Date;
    locale:          null;
    user:            User;
    category:        Category | null;
}

export interface Category {
    id:          number;
    documentId:  string;
    name:        string;
    description: null;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    locale:      null;
}

export interface User {
    id:          number;
    documentId:  string;
    username:    string;
    email:       string;
    provider:    string;
    confirmed:   boolean;
    blocked:     boolean;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    locale:      null;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page:      number;
    pageSize:  number;
    pageCount: number;
    total:     number;
}

// Converts JSON strings to/from your types
export class ConvertGetModelResponseArticels {
    public static toGetModelResponseArticels(json: string): GetModelResponseArticels {
        return JSON.parse(json);
    }

    public static getModelResponseArticelsToJson(value: GetModelResponseArticels): string {
        return JSON.stringify(value);
    }
}
