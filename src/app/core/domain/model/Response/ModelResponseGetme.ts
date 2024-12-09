// To parse this data:
//
//   import { Convert, ModelResponseGetMe } from "./file";
//
//   const modelResponseGetMe = Convert.toModelResponseGetMe(json);

export interface ModelResponseGetMe {
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

// Converts JSON strings to/from your types
export class ConvertModelResponseGetMe {
    public static toModelResponseGetMe(json: string): ModelResponseGetMe {
        return JSON.parse(json);
    }

    public static modelResponseGetMeToJson(value: ModelResponseGetMe): string {
        return JSON.stringify(value);
    }
}
