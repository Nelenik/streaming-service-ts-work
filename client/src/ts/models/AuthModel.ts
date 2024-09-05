import { Model } from "core";
import Api from "services";
import { Login, Signup } from "types";

interface AuthRes {
  token: string;
  username: string;
}

class AuthModel extends Model {
  async login(loginData: Login): Promise<AuthRes> {
    try {
      const { data } = await Api.post("auth/login", loginData);
      return {
        username: loginData.username,
        token: data.access_token,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async signup(signupData: Signup): Promise<AuthRes> {
    try {
      const { data } = await Api.post("auth/register", signupData);
      return {
        username: signupData.username,
        token: data.access_token,
      };
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

export const authApi = new AuthModel();
