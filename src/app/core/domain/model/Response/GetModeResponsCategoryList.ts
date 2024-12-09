// To parse this data:
//
//   import { Convert, GetModeResponsCategoryList } from "./file";
//
//   const getModeResponsCategoryList = Convert.toGetModeResponsCategoryList(json);

export interface GetModeResponsCategoryList {
    data: CategoryList[];
    meta: Meta;
}

export interface CategoryList {
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
    pagination: Pagination;
}

export interface Pagination {
    page:      number;
    pageSize:  number;
    pageCount: number;
    total:     number;
}

// Converts JSON strings to/from your types
export class ConvertGetModeResponsCategoryList {
    public static toGetModeResponsCategoryList(json: string): GetModeResponsCategoryList {
        return JSON.parse(json);
    }

    public static getModeResponsCategoryListToJson(value: GetModeResponsCategoryList): string {
        return JSON.stringify(value);
    }
}
