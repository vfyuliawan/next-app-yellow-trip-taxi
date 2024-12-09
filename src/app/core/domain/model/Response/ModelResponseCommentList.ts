// To parse this data:
//
//   import { Convert, ModelResponseCommentList } from "./file";
//
//   const modelResponseCommentList = Convert.toModelResponseCommentList(json);

export interface ModelResponseCommentList {
    data: DataComment[];
    meta: Meta;
}

export interface DataComment {
    id:          number;
    documentId:  string;
    content:     string;
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
export class ConvertModelResponseCommentList {
    public static toModelResponseCommentList(json: string): ModelResponseCommentList {
        return JSON.parse(json);
    }

    public static modelResponseCommentListToJson(value: ModelResponseCommentList): string {
        return JSON.stringify(value);
    }
}
