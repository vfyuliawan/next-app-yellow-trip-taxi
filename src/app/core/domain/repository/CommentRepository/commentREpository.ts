import { deleted, get, post } from "@/app/core/api/api";
import {
  ConvertModelResponseCommentList,
  ModelResponseCommentList,
} from "../../model/Response/ModelResponseCommentList";
import { ConvertModelResponseCommentByID, ModelResponseCommentByID } from "../../model/Response/ModelResponseCommentById";

class CommentRepository {
  constructor() {}

  async getComments(): Promise<ModelResponseCommentList | null> {
    const res = await get({
      path: `/api/comments`,
      isNeedToken: false,
    });
    if (res !== null) {
      return ConvertModelResponseCommentList.toModelResponseCommentList(res);
    }
    return null;
  }


  async getDeatilCommnent(props: {
    documentId: string;
  }): Promise<ModelResponseCommentByID | null> {
    const res = await get({
      path: `/api/comments/${props.documentId}`,
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertModelResponseCommentByID.toModelResponseCommentByID(res);
    }
    return null;
  }


  async createComment(
    props:{
        content:string,
        article: string
    }
  ): Promise<ModelResponseCommentByID | null> {
    const res = await post({
      path: `/api/comments/`,
      reqBody: {
        data:{
            content:props.content,
            article: props.article
        }
      },
      isNeedToken: true,
    });
    if (res !== null) {
      return ConvertModelResponseCommentByID.toModelResponseCommentByID(
        res
      );
    }
    return null;
  }


  async deleteComment(params: {
    documentId: string;
  }): Promise<String | null> {
    const res = await deleted({
      path: `/api/comments/${params.documentId}`,
      reqBody:{},
      isNeedToken: true,
    });
    if (res !== null) {
      return res
    }

    return null;
  }



}

export default new CommentRepository();
