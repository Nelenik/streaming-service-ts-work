export class Song {
  [key: string]: unknown;
  constructor(
    public id: number,
    public name: string,
    public filename: string,
    public path: string,
    public image: string,
    public duration: number,
    public createdAt: string,
    public album: { name: string },
    public artist: { name: string }
  ) {}
}

export const songsList: Song[] = [
  new Song(
    1,
    "World's Smallest Violin",
    "AJR World's Smallest Violin.mp3",
    "/songs/AJR World's Smallest Violin.mp3",
    "tracks(1).jpg",
    180740,
    "2024-07-16 22:10:26",
    { name: "Favourite Worst Nightmare" },
    { name: "Nirvana" }
  ),
  new Song(
    2,
    "505",
    "Arctic Monkeys 505.mp3",
    "/songs/Arctic Monkeys 505.mp3",
    "tracks(2).jpg",
    253560,
    "2024-07-16 22:10:26",
    { name: "Favourite Worst Nightmare" },
    { name: "Nirvana" }
  ),
  new Song(
    3,
    "World's Smallest Violin",
    "AJR World's Smallest Violin.mp3",
    "/songs/AJR World's Smallest Violin.mp3",
    "tracks(3).jpg",
    180740,
    "2024-07-16 22:10:26",
    { name: "Favourite Worst Nightmare" },
    { name: "Nirvana" }
  ),
  new Song(
    4,
    "505",
    "Arctic Monkeys 505.mp3",
    "/songs/Arctic Monkeys 505.mp3",
    "tracks(4).jpg",
    253560,
    "2024-07-16 22:10:26",
    { name: "Favourite Worst Nightmare" },
    { name: "Nirvana" }
  ),
  new Song(
    5,
    "World's Smallest Violin",
    "AJR World's Smallest Violin.mp3",
    "/songs/AJR World's Smallest Violin.mp3",
    "tracks(5).jpg",
    180740,
    "2024-07-16 22:10:26",
    { name: "Favourite Worst Nightmare" },
    { name: "Nirvana" }
  ),
  new Song(
    6,
    "505",
    "Arctic Monkeys 505.mp3",
    "/songs/Arctic Monkeys 505.mp3",
    "tracks(6).jpg",
    253560,
    "2024-07-16 22:10:26",
    { name: "Favourite Worst Nightmare" },
    { name: "Nirvana" }
  ),
];
