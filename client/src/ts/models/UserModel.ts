import Api from "services";
import { Playlists, Song, User, UserFull } from "types";
class UserModel {
  currUsername: string;

  constructor() {
    const { username } = JSON.parse(
      localStorage.getItem("PlayServiceAuth") || "{}"
    );
    this.currUsername = username;
  }
  public async getUser(): Promise<User> {
    try {
      const { data } = await Api.get("users");
      return data.find((user: User) => user.username === this.currUsername);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public async getPlaylists(): Promise<Playlists> {
    try {
      const { data } = await Api.get(`users/playlists`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public async getSongLikes(): Promise<Song[]> {
    try {
      const { data } = await Api.get(`users/likes`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUserFull(): Promise<UserFull> {
    try {
      const [userBase, playlists, songLikes] = await Promise.all([
        this.getUser(),
        this.getPlaylists(),
        this.getSongLikes(),
      ]);
      return { ...userBase, playlists, songLikes };
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const userApi = new UserModel();
