import { deleted, get, post, put } from "@/app/core/api/api";
import { EnumItemStorage } from "@/app/enumiration/EnumItemStorage";
import {
  ConvertGetModelResponseArticels,
  GetModelResponseArticels,
} from "../../model/Response/GetModelResponseArticels";
import { ConvertGetModeResponsDetail, GetModeResponsDetail } from "../../model/Response/GetModelResponseDetail";
import { ConvertGetModeResponsCategoryList, GetModeResponsCategoryList } from "../../model/Response/GetModeResponsCategoryList";
import { ConvertModelResponseCategoryByID, DetailCategory, ModelResponseCategoryByID } from "../../model/Response/ModelResponseCategoryById";

class CategoryRepository {
  constructor() {}


  async getCategory():Promise< GetModeResponsCategoryList |null> {
    const res  = await get({
        path:`/api/categories`,
        isNeedToken: false,
    })
    if (res !== null) {
        return ConvertGetModeResponsCategoryList.toGetModeResponsCategoryList(res)
    }
    return null

  }



  async getDeatilCategory(props: {
    id: string;
  }): Promise<ModelResponseCategoryByID | null> {
    const res = await get({
      path: `/api/categories/${props.id}`,
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertModelResponseCategoryByID.toModelResponseCategoryByID(res);
    }
    return null;
  }


  async createCategory(
    nama: string
  ): Promise<ModelResponseCategoryByID | null> {
    const res = await post({
      path: `/api/categories/`,
      reqBody: {
        data:{
            name:nama
        }
      },
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertModelResponseCategoryByID.toModelResponseCategoryByID(
        res
      );
    }
    return null;
  }


  async editCategory(
    params:{
        documentId: string,
        name: string
    }

  ): Promise<ModelResponseCategoryByID | null> {
    const res = await put({
      path: `/api/categories/${params.documentId}`,
      reqBody: {
        data:{
            name:params.name
        }
      },
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertModelResponseCategoryByID.toModelResponseCategoryByID(
        res
      );
    }
    return null;
  }


  async deleteCategory(params: {
    documentId: string;
  }): Promise<ModelResponseCategoryByID | null> {
    const res = await deleted({
      path: `/api/categories/${params.documentId}`,
      reqBody:{},
      isNeedToken: true,
    });
    if (res !== null) {
      return res
    }

    return null;
  }
}

export default new CategoryRepository();
