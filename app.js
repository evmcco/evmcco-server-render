const express = require("express");
const multer = require("multer");
const { fetchTranscript } = require("./deepgram.js");

const upload = multer();
const app = express();
const port = process.env.PORT || 3001;
app.use(upload.single('audio'));

app.get("/gus", (req, res) => res.send("Hello Gus GET!"));

app.post("/gus", async (req, res) => {
  try {
    const audioFile = req.file;
    if (!audioFile) {
      return res.status(400).send('No audio file provided.');
    }

    // Use the path, originalname, and mimetype to send the file in the API request to Deepgram
    const transcriptResponse = await fetchTranscript(audioFile);
    // Return the transcript or do something else with it
    res.send(transcriptResponse);
  } catch (err) {
    console.error('Failed to fetch recording summary', err);
    res.status(500).send('Internal server error.');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



