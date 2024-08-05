import { Header, Profile, Search } from "components/header";
import { Presenter } from "core";

export class HeaderPresenter extends Presenter {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.component = new Header();
    new Search();
    new Profile();
  }
}
