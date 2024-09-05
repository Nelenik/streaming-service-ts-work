import { AxiosError } from "axios";
import { AddSongModal, BaseModal, RemoveSongModal } from "components/modals";
import { Note } from "components/notes";
import { Presenter } from "core";
import { formPlaylistViewData, wait } from "helpers";
import { PlaylistActions } from "models";
import { CustomEvents, EventBus } from "services";
import { DataStore } from "storages";
import { ModalType, Models } from "types";

type ModalPresenterModels = Pick<Models, "playlistApi" | "userApi">;

export class ModalPresenter extends Presenter {
  private modal: BaseModal | null = null;
  constructor(
    private type: ModalType,
    private songId: number,
    private models: ModalPresenterModels
  ) {
    super();
  }
  async init(): Promise<void> {
    switch (this.type) {
      case "add": {
        const playlists = DataStore.instance.getPlaylists();
        const playlistsToRender = await Promise.all(
          playlists.map(async (el) => await formPlaylistViewData(el))
        );

        this.modal = new AddSongModal({
          showingCssClass: "show",
          playlistsToRender,
          onAdd: this.onModalAction(this.songId, PlaylistActions.ADD_SONG),
        });
        break;
      }
      case "remove": {
        this.modal = new RemoveSongModal({
          showingCssClass: "show",
          onRemove: this.onModalAction(
            this.songId,
            PlaylistActions.REMOVE_SONG
          ),
        });
        break;
      }
    }
    this.modal.open();
  }

  onModalAction(
    songId: number,
    action: PlaylistActions
  ): (playlistId: number) => Promise<void> {
    const { playlistApi } = this.models;
    return async (playlistId: number) => {
      try {
        await playlistApi.handlePlaylistsAction(action, {
          playlistId,
          songId,
        });
        DataStore.instance.storePlaylists(
          await this.models.userApi.getPlaylists()
        );
      } catch (err) {
        if (err instanceof AxiosError) {
          new Note({
            message: err.response?.data.message,
            type: "warning",
          })
            .show()
            .autoClose(4000);
        }
      } finally {
        this.modal?.close();
        wait(500).then(() => {
          if (action === "REMOVE_SONG") {
            const rerenderEvent = CustomEvents.get("rerenderTrackList")({
              listType: "playlist",
              id: playlistId,
            });
            EventBus.dispatchEvent(rerenderEvent);
          }
        });
      }
    };
  }
}
