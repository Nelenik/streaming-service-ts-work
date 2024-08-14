import { Header, Profile, Search } from "components/header";
import { Presenter } from "core";
import { UserModel } from "models";

export interface HeaderPresenterModels {
  userApi: UserModel;
}

export class HeaderPresenter extends Presenter {
  constructor(private models: HeaderPresenterModels) {
    super();
  }
  async init() {
    const { userApi } = this.models;
    const { username } = await userApi.getUser();
    new Header().mount("#app", "append");
    new Search().mount(".header", "append");
    new Profile({ username }).mount(".header", "append");
  }
}
