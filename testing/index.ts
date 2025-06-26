import YTDLP from "../dist/index.js";

(async()=>{

  const fileName = await YTDLP.download({
    url: 'https://www.youtube.com/watch?v=fE_spqJTU6k',
    directory: './testing/downloads',
    format: YTDLP.Formats.MP3,
  })

  console.log(fileName);

})();