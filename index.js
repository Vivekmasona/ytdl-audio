const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url; // YouTube video ka URL ya video ID

  try {
    const info = await ytdl.getBasicInfo(videoUrl);
    const title = info.videoDetails.title;

    ytdl(videoUrl, { filter: 'audioonly' })
      .pipe(fs.createWriteStream(`${title}.mp3`))
      .on('finish', () => {
        console.log('Audio download complete!');
        res.send('Audio download complete!');
      })
      .on('error', (err) => {
        console.error('Error downloading audio:', err);
        res.status(500).send('Error downloading audio');
      });
  } catch (err) {
    console.error('Error fetching video information:', err);
    res.status(500).send('Error fetching video information');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
