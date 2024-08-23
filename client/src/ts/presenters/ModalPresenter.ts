import { AxiosError } from "axios";
import { AddSongModal, BaseModal, RemoveSongModal } from "components/modals";
import { Component, Presenter } from "core";
import { formPlaylistViewData, wait } from "helpers";
import { PlaylistActions } from "models";
import { Modal } from "services";
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
    console.log("modal presenter initialized");
  }
  async init() {
    let content: Component;
    switch (this.type) {
      case "add": {
        const playlists = await this.models.userApi.getPlaylists();
        const playlistsToRender = await Promise.all(
          playlists.map(async (el) => await formPlaylistViewData(el))
        );

        content = new AddSongModal({
          playlistsToRender,
          onAdd: this.onAdd(this.songId),
        });
        break;
      }
      case "remove": {
        content = new RemoveSongModal();
        break;
      }
    }
    const modal = new BaseModal({ content });
    Modal.instance.open(modal);
    console.log(Modal.instance.openedComponent);
    wait(0).then(() => {
      modal.element?.classList.add("show");
    });
  }

  onAdd(songId: number) {
    const { playlistApi } = this.models;
    return async (playlistId: number) => {
      try {
        await playlistApi.handlePlaylistsAction(PlaylistActions.ADD_SONG, {
          playlistId,
          songId,
        });
        this.modal?.close();
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        }
      }
    };
  }
}
