import { AxiosError } from "axios";
import { Note } from "components/notes";
import { Like } from "components/songs";
import { Component, Presenter } from "core";
import { checkLike, wait } from "helpers";
import { SongActions } from "models";
import { EventBus, CustomEvents, router } from "services";
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
      songId: this.songId,
      isLiked: this.isSongLiked,
      onLikeClick: this.onLikeClick.bind(this),
      onLikeCustom: this.onLikeCustom.bind(this),
    }).mount(this.likeContainer, "append");
  }

  private async onLikeClick(component: Like) {
    const { songApi, userApi } = this.models;
    const songId = component.options.songId;
    const isLiked = component.options.isLiked;
    try {
      const result = isLiked
        ? await songApi.handleSongsAction(SongActions.UNLIKE, songId)
        : await songApi.handleSongsAction(SongActions.LIKE, songId);
      const currentLocation = router.getCurrentLocation();
      if (currentLocation.url === "songs/favourites") {
        const rerenderEvent = CustomEvents.get("rerenderTrackList")({
          listType: "favourites",
          id: null,
        });
        EventBus.dispatchEvent(rerenderEvent);
      }
      if (isSong(result)) {
        const songLikeEvent = CustomEvents.get("songLike")({
          songId: songId,
          isLiked: checkLike(result, userApi.currUsername),
        });
        EventBus.dispatchEvent(songLikeEvent);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const note = new Note({
          message: err.response?.data.message,
          type: "warning",
        });
        note.show();
        wait(4000).then(() => {
          note.close();
        });
      }
    }
  }
  //synchronization between likes in playlist and in player
  private onLikeCustom(e: CustomEventInit, component: Component) {
    const { songId, isLiked } = e.detail;
    if (component.options.songId === songId) {
      component.options = {
        ...component.options,
        isLiked,
      };
    }
  }
}
