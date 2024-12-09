// To parse this data:
//
//   import { Convert, ModelResponseModal } from "./file";
//
//   const modelResponseModal = Convert.toModelResponseModal(json);

export interface ModelResponseLogin {
    jwt:  string;
    user: User;
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

// Converts JSON strings to/from your types
export class ConvertModelResponseLogin {
    public static toModelResponseLogin(json: string): ModelResponseLogin {
        return JSON.parse(json);
    }

    public static ModelResponseLoginToJson(value: ModelResponseLogin): string {
        return JSON.stringify(value);
    }
}
