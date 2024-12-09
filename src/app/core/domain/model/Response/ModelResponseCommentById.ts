// To parse this data:
//
//   import { Convert, ModelResponseCommentByID } from "./file";
//
//   const modelResponseCommentByID = Convert.toModelResponseCommentByID(json);

export interface ModelResponseCommentByID {
    data: DataComment;
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
}

// Converts JSON strings to/from your types
export class ConvertModelResponseCommentByID {
    public static toModelResponseCommentByID(json: string): ModelResponseCommentByID {
        return JSON.parse(json);
    }

    public static modelResponseCommentByIDToJson(value: ModelResponseCommentByID): string {
        return JSON.stringify(value);
    }
}
