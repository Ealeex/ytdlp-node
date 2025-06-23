# ytdlp-node

A Node.js wrapper for the YT-DLP executable, providing a simple TypeScript/JavaScript API to download audio and video using the bundled `yt-dlp.exe` binary.

## Features
- Programmatic access to yt-dlp from Node.js
- Supports audio, video, and DASH downloads
- Customizable output directory, format, and playlist selection
- TypeScript types included

## Installation

```
npm install @ealeex/ytdlp-node
```

## Usage

### Basic Example
```js
import YTDLP from '@ealeex/ytdlp-node';

const result = await YTDLP.download({
  url: 'https://www.youtube.com/watch?v=xxxxxxx',
  format: YTDLP.Formats.MP3,
  directory: './downloads',
  nameOverride: 'my-audio-file.mp3',
  logCommand: true
});
console.log('Downloaded to:', result);
```

### Options
- `url`: Direct video URL to download
- `search`: Search query (uses ytsearch)
- `directory`: Output directory (created if missing)
- `format`: Output format (see `YTDLP.Formats`)
- `nameOverride`: Custom output filename
- `playlistSelection`: Playlist items to download (e.g., `1,3,5-7`)
- `logCommand`: Print the yt-dlp command before running

### Formats
- `YTDLP.Formats`: All supported formats (MP3, MP4, M4A, etc.)
- `YTDLP.AudioFormats`: Audio-only formats
- `YTDLP.VideoFormats`: Video-only formats
- `YTDLP.DASHFormats`: DASH formats

### Generate Help File
```js
YTDLP.generateHelpFile('./yt-dlp-help.txt');
```

## Project Structure
- `bin/yt-dlp.exe`: Bundled yt-dlp binary
- `src/index.ts`: TypeScript API
- `dist/`: Compiled output

## Build

```
npm run build
```

## License
MIT
