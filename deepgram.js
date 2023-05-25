const fs = require("fs");
const { Deepgram } = require("@deepgram/sdk");

// Your Deepgram API Key
const deepgramApiKey = "9b0ad777-8e71-4dfc-ac60-fe18406d1a5e";

const fetchTranscript = async (audioFile) => {
  // Initialize the Deepgram SDK
  const deepgram = new Deepgram(deepgramApiKey);

  source = {
    buffer: audioFile.buffer,
    mimetype: audioFile.mimetype,
  };

  // Send the audio to Deepgram and get the response
  deepgram.transcription
    .preRecorded(source, {
      punctuate: true,
      model: "nova",
    })
    .then((response) => {
      // Write the response to the console
      // console.dir(response, { depth: null });

      // Write only the transcript to the console
      console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
      return response.results.channels[0].alternatives[0].transcript;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { fetchTranscript };

