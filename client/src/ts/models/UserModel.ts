import { handleAxiosRequest } from "helpers";
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
  private async getUsers(): Promise<User[]> {
    return handleAxiosRequest(() => Api.get("users"));
  }

  public async getUser(): Promise<User | undefined> {
    try {
      const data = await this.getUsers();
      const currUser = data.find(
        (user: User) => user.username === this.currUsername
      );
      if (currUser) return Promise.resolve(currUser);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getPlaylists(): Promise<Playlists> {
    return handleAxiosRequest(() => Api.get(`users/playlists`));
  }
  public async getSongLikes(): Promise<Song[]> {
    return handleAxiosRequest(() => Api.get(`users/likes`));
  }

  public async getUserFull(): Promise<UserFull> {
    try {
      const [userBase, playlists, songLikes] = await Promise.all([
        this.getUser(),
        this.getPlaylists(),
        this.getSongLikes(),
      ]);
      if (!userBase) {
        throw new Error("User not found");
      }
      return { ...userBase, playlists, songLikes };
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const userApi = new UserModel();
