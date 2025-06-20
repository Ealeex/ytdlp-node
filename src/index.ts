import { exec } from 'child_process';
import { join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

type DownloadOptions = {
    url?: string;
    search?: string;
    directory?: string;
    format?: string;
    nameOverride?: string;
    playlistSelection?: string;
    logCommand?: boolean;
}

export default class YTDLP {

    static Formats = {MP3:'mp3',M4A:'m4a',AAC:'aac',OGG:'ogg',WAV:'wav',FLAC:'flac',MP4:'mp4',WEBM:'webm',MKV:'mkv',AVI:'avi',MOV:'mov',FLV:'flv',WMV:'wmv',MPG:'mpg',MOVIE:'movie',DASH_AUDIO:'dash-audio',DASH_VIDEO:'dash-video'};
    static AudioFormats = [ YTDLP.Formats.MP3, YTDLP.Formats.M4A, YTDLP.Formats.AAC, YTDLP.Formats.OGG, YTDLP.Formats.WAV, YTDLP.Formats.FLAC ];
    static VideoFormats = [ YTDLP.Formats.MP4, YTDLP.Formats.WEBM, YTDLP.Formats.MKV, YTDLP.Formats.AVI, YTDLP.Formats.MOV, YTDLP.Formats.FLV, YTDLP.Formats.WMV, YTDLP.Formats.MPG, YTDLP.Formats.MOVIE ];
    static DASHFormats = [ YTDLP.Formats.DASH_AUDIO, YTDLP.Formats.DASH_VIDEO ];

    static PATH_TO_EXECUTABLE = resolve(__filename, '../../bin/yt-dlp.exe');

    static generateHelpFile = (filePath: string) => exec(`${YTDLP.PATH_TO_EXECUTABLE} --help >> ${filePath}`);

    static async download(options: DownloadOptions): Promise<string> {
        return new Promise((resolve, reject) => {

            // Setup defaults
            let args: string[] = ['--print', 'after_move:filepath', '--restrict-filenames'];

            // ARGS: Source
            if (options.url) args.push(`"${options.url}"`);
            else if (options.search) args.push(`ytsearch:"${options.search}"`);

            // ARGS: Format
            if (options.format) {

                // Audio Download
                if (YTDLP.AudioFormats.includes(options.format)) {
                    args.push('--extract-audio');
                    args.push(`--audio-format ${options.format}`);
                } 
                
                // Video Download
                else if (YTDLP.VideoFormats.includes(options.format)) {
                    let ext = options.format.toLowerCase();
                    args.push(`--format bestvideo[ext=${ext}]+bestaudio/best`);
                    args.push('--merge-output-format mp4');
                } 
                
                // Dash Download
                else if (YTDLP.DASHFormats.includes(options.format)) {
                    args.push(`--format ${options.format}`);
                }

            }

            // ARGS: Directory
            if (options.directory) {
                if (!existsSync(options.directory)) mkdirSync(options.directory);
                args.push(`-o "${join(options.directory, options.nameOverride || '%(title)s.%(ext)s')}"`);
            }

            // ARGS: Playlist Selection
            if (options.playlistSelection) args.push(`--playlist-items ${options.playlistSelection}`);

            // Create Command String
            const command = `"${YTDLP.PATH_TO_EXECUTABLE}" ${args.join(' ')}`;
            if (options.logCommand) console.log(command);

            // Execute
            exec(command, (error, stdout, stderr) => {
                if (error) return reject(error);
                if (stderr && !stderr.includes('WARNING')) return reject(stderr);
                resolve(stdout.trim());
            });

        });
    }


}