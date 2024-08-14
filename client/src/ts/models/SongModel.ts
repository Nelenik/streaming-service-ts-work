import { handleAxiosRequest } from "helpers";
import Api from "services";
import { Song } from "types";

enum SongActions {
  FETCH_ALL = "FETCH_ALL",
  FETCH_ONE = "FETCH_ONE",
  LIKE = "LIKE",
  UNLIKE = "UNLIKE",
}

export class SongModel {
  private async getAllSongs(): Promise<Song[]> {
    return handleAxiosRequest(() => Api.get("songs"));
  }

  private async getOneSong(songId: number): Promise<Song> {
    return handleAxiosRequest(() => Api.get(`songs/${songId}`));
  }

  private async likeSong(songId: number): Promise<Song> {
    return handleAxiosRequest(() => Api.post(`songs/${songId}/like`));
  }

  private async unlikeSong(songId: number): Promise<Song> {
    return handleAxiosRequest(() => Api.post(`songs/${songId}/unlike`));
  }

  public handleSongsAction(action: SongActions, id?: number) {
    switch (action) {
      case SongActions.FETCH_ALL: {
        return this.getAllSongs();
      }
      case SongActions.FETCH_ONE: {
        return this.getOneSong(id!);
      }
      case SongActions.LIKE: {
        return this.likeSong(id!);
      }
      case SongActions.UNLIKE: {
        return this.unlikeSong(id!);
      }
    }
  }
}

export const songApi = new SongModel();
