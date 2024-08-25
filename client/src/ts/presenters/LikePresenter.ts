import { Like } from "components/songs";
import { Component, Presenter } from "core";
import { checkLike } from "helpers";
import { SongActions } from "models";
import { CustomEvents, router } from "services";
import { isSong, Models } from "types";

type LikePresenterModels = Pick<Models, "userApi" | "songApi">;

export class LikePresenter extends Presenter {
  constructor(
    private models: LikePresenterModels,
    private likeContainer: HTMLElement,
    private isSongLiked: boolean,
    private songId: number
  ) {
    super();
  }
  init() {
    new Like({
      isLiked: this.isSongLiked,
      onLike: this.likeHandler.bind(this),
    }).mount(this.likeContainer, "append");
  }

  private async likeHandler(component: Component) {
    const { songApi, userApi } = this.models;
    const isLiked = component.options.isLiked;
    const result = isLiked
      ? await songApi.handleSongsAction(SongActions.UNLIKE, this.songId)
      : await songApi.handleSongsAction(SongActions.LIKE, this.songId);

    const currentLocation = router.getCurrentLocation();
    if (isLiked && currentLocation.url === "songs/favourites") {
      const rerenderEvent = CustomEvents.get("rerenderTrackList")({
        listType: "favourites",
        id: null,
      });
      window.dispatchEvent(rerenderEvent);
    } else if (isSong(result)) {
      component.options = {
        ...component.options,
        isLiked: checkLike(result, userApi.currUsername),
      };
    }
  }
}
