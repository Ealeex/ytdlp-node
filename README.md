# ytdlp-node

Wraps the YT-DLP script for Node.js projects. This package provides a simple way to use the yt-dlp executable from Node.js or by calling the included binary directly.

## Features
- Bundles the `yt-dlp.exe` binary for Windows
- TypeScript support for programmatic usage

## Installation

```
npm install @ealeex/ytdlp-node
```

## Usage

### Using the Bundled Binary
After installing, you can find the `yt-dlp.exe` binary in the `bin` directory of the package. You can execute it directly:

```
./node_modules/@ealeex/ytdlp-node/bin/yt-dlp.exe [options] <url>
```

Or copy it to a location in your PATH for easier access.

### Programmatic Usage
You can spawn the binary from Node.js:

```js
import { spawn } from 'child_process';
const child = spawn('./node_modules/@ealeex/ytdlp-node/bin/yt-dlp.exe', ['<url>', '--option']);
child.stdout.pipe(process.stdout);
```

## Project Structure
- `bin/yt-dlp.exe`: Bundled yt-dlp binary
- `src/index.ts`: TypeScript entry point
- `dist/`: Compiled output

## Build

```
npm run build
```

## License
MIT
