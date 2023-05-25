const { Deepgram } = require("@deepgram/sdk");

const fetchTranscript = async (audioFile) => {
  // Initialize the Deepgram SDK
  const deepgram = new Deepgram(process.env.DG_SECRET_KEY);

  source = {
    buffer: audioFile.buffer,
    mimetype: audioFile.mimetype,
  };

  // Send the audio to Deepgram and get the response
  try {
    const response = await deepgram.transcription.preRecorded(source, {
      punctuate: true,
      model: "nova",
    })
    return response.results.channels[0].alternatives[0].transcript;
  } catch(err) {
    console.log(err);
    return err
  }
}

module.exports = { fetchTranscript };

