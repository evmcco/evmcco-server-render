const { Deepgram } = require("@deepgram/sdk");

const fetchTranscript = async (audioFile) => {
  // Initialize the Deepgram SDK
  const deepgram = new Deepgram(process.env.DG_SECRET_KEY);

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

