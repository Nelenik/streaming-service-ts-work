import { AxiosError } from "axios";
import { AddSongModal, BaseModal, RemoveSongModal } from "components/modals";
import { Note } from "components/notes";
import { Component, Presenter } from "core";
import { formPlaylistViewData, wait } from "helpers";
import { PlaylistActions } from "models";
import { CustomEvents, EventBus, Modal } from "services";
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
  async init() {
    let content: Component;
    switch (this.type) {
      case "add": {
        const playlists = DataStore.instance.getPlaylists();
        const playlistsToRender = await Promise.all(
          playlists.map(async (el) => await formPlaylistViewData(el))
        );

        content = new AddSongModal({
          playlistsToRender,
          onAdd: this.onModalAction(this.songId, PlaylistActions.ADD_SONG),
        });
        break;
      }
      case "remove": {
        content = new RemoveSongModal({
          onRemove: this.onModalAction(
            this.songId,
            PlaylistActions.REMOVE_SONG
          ),
        });
        break;
      }
    }
    this.modal = new BaseModal({ content });
    Modal.instance.open(this.modal);
    wait(0).then(() => {
      this.modal?.element?.classList.add("show");
    });
  }

  onModalAction(songId: number, action: PlaylistActions) {
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
          const note = new Note({
            message: err.response?.data.message,
            type: "warning",
          });
          note.show();
          wait(4000).then(() => {
            note.close();
          });
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
