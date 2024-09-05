import { ImageService } from "services";
import { Playlist } from "types";
import { getRandomPlaylistCover, getWordEndigs } from "helpers";
import { PlaylistOptions } from "components/playlists";

export const formPlaylistViewData = async (
  playlist: Playlist
): Promise<PlaylistOptions> => {
  const result = await ImageService.instance.invokeUrl(
    playlist.songs[0]?.image
  );
  const cover = result ? result : getRandomPlaylistCover(8);
  const songsCount = playlist.songs.length;
  const songsCountStr = songsCount
    ? `${songsCount} ` + getWordEndigs(songsCount, ["трек", "трека", "треков"])
    : "Нет треков";
  return {
    id: playlist.id,
    cover,
    name: playlist.name,
    songsCountStr,
  };
};
