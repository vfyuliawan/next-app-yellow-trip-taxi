import { get, post } from "@/app/core/api/api";
import { GetModelRequestLogin } from "../../model/Request/GetModelRequestLogin";
import {
  ConvertModelResponseLogin,
  ModelResponseLogin,
} from "../../model/Response/GetModelResponseLogin";
import { ConvertModelResponseGetMe, ModelResponseGetMe } from "../../model/Response/ModelResponseGetme";

class LoginRepository {
  constructor() {}

  async submitLogin(
    props: GetModelRequestLogin
  ): Promise<ModelResponseLogin | null> {
    const res = await post({
      path: "/api/auth/local",
      reqBody: props,
      isNeedToken: false,
    });
    if (res != null) {
      const result = ConvertModelResponseLogin.toModelResponseLogin(res);
      return result;
    }
    return null;
  }


  async checkLogin(
  ): Promise<ModelResponseGetMe | null> {
    const res = await get({
      path: "/api/users/me",
      isNeedToken: true,
    });
    if (res != null) {
      const result = ConvertModelResponseGetMe.toModelResponseGetMe(res);
      return result;
    }
    return null;
  }
}



export default new LoginRepository();