# Streaming Service

SPA for music streaming. The client interacts with a REST API via JWT authorization, supports routing, playlists, likes, and a built-in player.

## Tech Stack

| Category | Technology |
|-----------|-----------|
| Language | TypeScript 5.5 (ES2017) |
| Bundler | Webpack 5 (dev server + production) |
| Styles | SCSS (sass-loader + MiniCssExtractPlugin) |
| Routing | Navigo 8 (hashless) |
| HTTP | Axios 1 (with JWT interceptor) |
| Audio | Howler 2 |
| Lint/format | ESLint 9 + Prettier 3 |

## Architecture

### Pattern: modified MVP

The project uses a three-layer organization with clear separation of concerns:

```
src/ts/
├── core/          # Base abstractions (Component, Presenter, Model)
├── models/        # Data layer: API interaction
├── presenters/    # Presenters: coordination between models and components
├── components/    # UI components: templates + event handlers
├── services/      # Services: router, player, ImageService, EventBus
├── storages/      # In-memory stores (singletons)
├── helpers/       # Utilities and type guards
```

### Core abstractions (`src/ts/core/`)

- **Component** (`Component.ts`): abstract UI block with template-based rendering. Manages handler lifecycle via `setHandlers`/`unsetHandlers`. Supports `mount(selector, method)` with insert methods `append | prepend | before | after`. DOM node is recreated on `options` change.
- **Presenter** (`Presenter.ts`): minimal contract `init()` + `destroy()`.
- **Model** (`Model.ts`): axios wrapper with unified `handleAxiosRequest<T>` error handling.

### Event-driven connectivity

For loose coupling between presenters, `EventTarget` + `Map` of custom event factories is used (`src/ts/services/CustomEvents.ts`). Events:
- `playSong` — start track playback
- `songPlayback` — progress ticks (every second)
- `songLike` — likes synchronization
- `onFilter` — list filtering
- `rerenderTrackList` — forced tracklist re-render

### Stores (singletons)

- **DataStore** (`src/ts/storages/DataStore.ts`): caches playlists and songs in memory. Populated once during `LayoutPresenter` initialization.
- **PlayerStore** (`src/ts/storages/PlayerStore.ts`): holds the current track, queue (`actualPlaylist`), listening history (capped at 5 entries), and shuffle/repeat/mute flags. Acts as the source of truth for player state.
- **ImageService** (`src/ts/services/ImageService.ts`): converts base64 images to blob URLs with SHA-256 hash caching. Clears all URLs on `beforeunload` to prevent leaks.

## Key Implementations

### Authorization and API (`src/ts/services/Api.ts`)

Axios instance with `baseURL` pointing to an external Render deployment. Request interceptor:
- skips `Authorization` header for `/auth/login` and `/auth/register`;
- reads token from `localStorage` (`PlayServiceAuth`) for all other endpoints;
- rejects the request if no token is present.

Models (`src/ts/models/`):
- **AuthModel** — `login`, `signup`, returns `{ token, username }`;
- **UserModel** — fetch playlists, likes, and users;
- **SongModel** — CRUD + like/unlike via `SongActions` enum;
- **PlaylistsModel** — create, rename, delete, and manage songs inside playlists.

### Routing and initialization (`src/ts/main.ts`)

The entry point executes the following sequence:
1. Authorization (hardcoded `User`/`User` for demo);
2. Initialize `HeaderPresenter`, `LayoutPresenter`, `FooterPresenter`;
3. Configure Navigo routes (`/songs/:listType`, `/playlists`, `/error`);
4. Initial navigation to `/songs/all`.

`main.ts:35` — catch-all route redirects to `/songs/all`.

### Audio player (`src/ts/services/PlayerService.ts`)

Howler wrapper:
- `playSong` unloads the previous `Howl` instance and creates a new one with `html5: true`;
- `dispatchPlaybackData` dispatches a `songPlayback` event with `{ progress, duration }` every 1000ms;
- `volume` / `mute` / `goTo` (seek) — thin wrappers;
- `destroy` stops everything and clears the instance.

`FooterPresenter` listens to `playSong` and `songPlayback`, synchronizing UI: play/pause icons, progress bar, volume, and shuffle/repeat modes.

### Frontend routing (`src/ts/services/Router.ts`)

Navigo wrapper with `hash: false` and root `/`. In dev mode, `webpack-dev-server` uses `historyApiFallback: true`.

### Images (`src/ts/services/ImageService.ts`)

- Accepts a base64 string;
- Hashes it via Web Crypto API (`SHA-256`);
- Caches `URL.createObjectURL(blob)` in a `Map<hash, blobUrl>`;
- `clearAllUrls` is called on `beforeunload` to prevent memory leaks.

### Type guards (`src/types/guards.ts`)

Strict runtime type checks for safe API response handling:
- `isSongList`, `isSong`, `isPlaylist`, `isPlaylists`, `isListType`, `isPrevOrNext`.

Used in `main.ts` and presenters when destructuring `match.params` and filtering data.

### Webpack configuration (`client/webpack.config.cjs`)

- Entry: `src/ts/main.ts`;
- Dev server: `localhost`, live reload, `historyApiFallback: true`;
- Loader chain: `ts-loader` → TypeScript, `sass-loader` → SCSS, `html-loader` → HTML templates;
- Module aliases mirror `tsconfig.json` paths for resolution without a bundler;
- In production, `MiniCssExtractPlugin` is added, filenames include `[contenthash]`;
- Assets: fonts → `assets/fonts/`, images → `assets/img/`.

## Project Structure

```
streaming_service/
└── client/
    ├── src/
    │   ├── index.html
    │   ├── styles/style.scss
    │   ├── img/                        # Covers, icons, fonts
    │   ├── mocks/                      # Demo data (not used in production)
    │   ├── types/                      # TypeScript interfaces and guards
    │   └── ts/
    │       ├── main.ts                 # Entry point, auth, routes
    │       ├── core/                   # Component, Presenter, Model
    │       ├── models/                 # AuthModel, UserModel, SongModel, PlaylistsModel
    │       ├── presenters/             # Header, Layout, SongsList, Playlist, Footer, Modal, Like
    │       ├── components/             # header/, footer/, songs/, playlists/, layout/, aside/, modals/, notes/
    │       ├── services/               # Api.ts, Router.ts, PlayerService.ts, ImageService.ts, CustomEvents.ts
    │       ├── storages/               # DataStore, PlayerStore
    │       └── helpers/                # Utilities, type guards, formatting
    ├── package.json
    ├── tsconfig.json
    ├── webpack.config.cjs
    └── create-redirects.js             # Post-build script
```

## Getting Started

```bash
cd client
npm install
npm run serve        # dev server on localhost
npm run build:dev    # dev build
npm run build:prod   # production build with create-redirects.js
```

## API Endpoints

Base URL: `https://streaming-service-api-pg.onrender.com/api`

| Method | Endpoint | Purpose |
|-------|----------|------------|
| POST | `/auth/login` | Login, returns JWT |
| POST | `/auth/register` | Registration |
| GET | `/users` | List of users |
| GET | `/users/playlists` | User playlists |
| GET | `/users/likes` | User likes |
| GET | `/songs` | All tracks |
| GET | `/songs/{id}` | Track by ID |
| POST | `/songs/{id}/like` | Like |
| POST | `/songs/{id}/unlike` | Unlike |
| POST | `/playlists` | Create playlist |
| POST | `/playlists/{id}` | Rename |
| DELETE | `/playlists/{id}` | Delete |
| GET | `/playlists/{id}/songs` | Playlist tracks |
| POST | `/playlists/{id}/add/{songId}` | Add track |
| POST | `/playlists/{id}/remove/{songId}` | Remove track |
