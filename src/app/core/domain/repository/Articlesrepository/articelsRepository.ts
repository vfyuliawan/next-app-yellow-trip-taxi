import { deleted, get, post, put } from "@/app/core/api/api";
import { EnumItemStorage } from "@/app/enumiration/EnumItemStorage";
import {
  ConvertGetModelResponseArticels,
  GetModelResponseArticels,
} from "../../model/Response/GetModelResponseArticels";
import {
  ConvertGetModeResponsDetail,
  DetailArticel,
  GetModeResponsDetail,
} from "../../model/Response/GetModelResponseDetail";
import { DataArticelSubmit } from "../../model/Request/PostModelRequestCreateArticle";
import {
  ConvertModelResponseCreateArticle,
  ModelResponseCreateArticle,
} from "../../model/Response/PostModelResponseCreateArticle";

class ArticleRepository {
  constructor() {}

  async getArticlesUser(props: {
    page: number;
    pageSize: number;
    category: number;
    title: string;
  }): Promise<GetModelResponseArticels | null> {
    const userId = localStorage.getItem(EnumItemStorage.userId);
    const res = await get({
      path: `/api/articles?pagination[page]=${
        props.page
      }&pagination[pageSize]=${props.pageSize}${
        props.title.length !== 0
          ? `&filters[title][$containsi]=${props.title}`
          : ``
      }&populate[user]=*${
        props.category == 0
          ? "&populate[category]=*"
          : `&populate[category]=${props.category}`
      }`,
      isNeedToken: false,
    });

    if (res !== null) {
      return ConvertGetModelResponseArticels.toGetModelResponseArticels(res);
    }
    return null;
  }

  async getDeatilArticle(props: {
    id: string;
  }): Promise<GetModeResponsDetail | null> {
    const res = await get({
      path: `/api/articles/${props.id}`,
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertGetModeResponsDetail.toGetModeResponsDetail(res);
    }
    return null;
  }

  async createArticle(
    data: DetailArticel
  ): Promise<ModelResponseCreateArticle | null> {
    const res = await post({
      path: `/api/articles/`,
      reqBody: {
        data,
      },
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertModelResponseCreateArticle.toModelResponseCreateArticle(
        res
      );
    }
    return null;
  }

  async editArticel(params: {
    data: DetailArticel;
    id: string;
  }): Promise<ModelResponseCreateArticle | null> {
    console.log(params.data);

    const reqBody = {
      data: {
        title: params.data.title,
        descr: params.data.description,
        cover_image_url: params.data.cover_image_url,
        category: params.data.category,
      },
    };

    const res = await put({
      path: `/api/articles/${params.id}`,
      reqBody: reqBody,
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertModelResponseCreateArticle.toModelResponseCreateArticle(
        res
      );
    }

    return null;
  }


  async deleteArticel(params: {
    id: string;
  }): Promise<ModelResponseCreateArticle | null> {
    const res = await deleted({
      path: `/api/articles/${params.id}`,
      reqBody:{},
      isNeedToken: true,
    });
    if (res !== null) {
      return res
    }

    return null;
  }
}

export default new ArticleRepository();
