import { handleAxiosRequest } from "helpers";
import Api from "services";
import { PlaylistName, Playlist, Song } from "types";

enum PlaylistActions {
  ADD_NEW = "ADD_NEW",
  RENAME = "RENAME",
  DELETE = "DELETE",
  FETCH_ONE = "FETCH_ONE",
  FETCH_SONGS = "FETCH_SONGS",
  ADD_SONG = "ADD_SONG",
  REMOVE_SONG = "REMOVE_SONG",
}

interface PlaylistActionsOpts {
  body?: PlaylistName;
  playlistId?: number;
  songId?: number;
}

export class PlaylistModel {
  private async addNewPlaylist(body: PlaylistName): Promise<Playlist> {
    return handleAxiosRequest(() => Api.post("playlists", body));
  }
  private async renamePlaylist(
    body: PlaylistName,
    playlistId: number
  ): Promise<Playlist> {
    return handleAxiosRequest(() => Api.post(`playlists/${playlistId}`, body));
  }
  private async deletePlaylist(playlistId: number): Promise<Playlist> {
    return handleAxiosRequest(() => Api.delete(`playlists/${playlistId}`));
  }
  private async fetchOnePlaylist(playlistId: number): Promise<Playlist> {
    return handleAxiosRequest(() => Api.get(`playlists/${playlistId}`));
  }

  private async fetchPlaylistSongs(playlistId: number): Promise<Song[]> {
    return handleAxiosRequest(() => Api.get(`playlists/${playlistId}/songs`));
  }

  private async addSong(playlistId: number, songId: number): Promise<Playlist> {
    return handleAxiosRequest(() =>
      Api.post(`playlists/${playlistId}/add/${songId}`)
    );
  }
  private async removeSong(
    playlistId: number,
    songId: number
  ): Promise<Playlist> {
    return handleAxiosRequest(() =>
      Api.post(`playlists/${playlistId}/remove/${songId}`)
    );
  }
  public handlePlaylistsAction(
    action: PlaylistActions,
    options: PlaylistActionsOpts
  ): Promise<Playlist | Song[]> {
    const { body, playlistId, songId } = options;
    switch (action) {
      case PlaylistActions.ADD_NEW: {
        if (body) return this.addNewPlaylist(body);
        break;
      }
      case PlaylistActions.RENAME: {
        if (body && playlistId) return this.renamePlaylist(body, playlistId);
        break;
      }
      case PlaylistActions.DELETE: {
        if (playlistId) return this.deletePlaylist(playlistId);
        break;
      }
      case PlaylistActions.FETCH_ONE: {
        if (playlistId) return this.fetchOnePlaylist(playlistId);
        break;
      }
      case PlaylistActions.FETCH_SONGS: {
        if (playlistId) return this.fetchPlaylistSongs(playlistId);
        break;
      }
      case PlaylistActions.ADD_SONG: {
        if (playlistId && songId) return this.addSong(playlistId, songId);
        break;
      }
      case PlaylistActions.REMOVE_SONG: {
        if (playlistId && songId) return this.removeSong(playlistId, songId);
        break;
      }
    }
    return Promise.reject(
      new Error("PlaylistsModel: Invalid action or missing parameters")
    );
  }
}

export const playlistApi = new PlaylistModel();
