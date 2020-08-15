"use strict";

var startEx = false;
const encoding = "LINEAR16";
const sampleRateHertz = 16000;
const languageCode = "en-US";

export function microphoneStream(encoding, sampleRateHertz, languageCode) {
    // [START micStreamRecognize]

    // Node-Record-lpcm16
    const recorder = require("node-record-lpcm16");

    // Imports the Google Cloud client library
    const speech = require("@google-cloud/speech");

    const config = {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode
    };

    const request = {
        config,
        interimResults: true //Get interim results from stream
    };

    // Creates a client
    const client = new speech.SpeechClient();

    function startExercises() {
        startEx = true;
        process.stdout.write(`\nExercises should start`);
    }

    function stopExercises() {
        startEx = false;
        process.stdout.write(`\nExercises should stop`);
    }

    // Create a recognize stream
    const recognizeStream = client
        .streamingRecognize(request)
        .on("error", console.error)
        .on("data", data =>
            process.stdout.write(
                !startEx
                    ? data.results[0] && data.results[0].alternatives[0]
                        ? data.results[0].alternatives[0].transcript.includes(
                              "begin exercis"
                          )
                            ? startExercises()
                            : `\n\nYOU DIDNT SAY START\n as you said: ${data.results[0].alternatives[0].transcript}`
                        : `\n\nReached transcription time limit, press Ctrl+C\n`
                    : data.results[0] && data.results[0].alternatives[0]
                    ? data.results[0].alternatives[0].transcript.includes(
                          "finish exercis"
                      )
                        ? stopExercises()
                        : `\n\nYOU DIDNT SAY STOP\n as you said: ${data.results[0].alternatives[0].transcript}`
                    : `\n\nReached transcription time limit, press Ctrl+C\n`
            )
        );

    recorder
        .record({
            sampleRateHertz: sampleRateHertz,
            threshold: 0, //silence threshold
            recordProgram: "rec", // Try also "arecord" or "sox"
            silence: "5.0" //seconds of silence before ending
        })
        .stream()
        .on("error", console.error)
        .pipe(recognizeStream);

    console.log("Listening, press Ctrl+C to stop.");
    // [END micStreamRecognize]
}

require(`yargs`)
    .demand(1)
    .command(
        `micStreamRecognize`,
        `Streams audio input from microphone, translates to text`,
        {},
        opts =>
            microphoneStream(
                opts.encoding,
                opts.sampleRateHertz,
                opts.languageCode
            )
    )
    .options({
        encoding: {
            alias: "e",
            default: "LINEAR16",
            global: true,
            requiresArg: true,
            type: "string"
        },
        sampleRateHertz: {
            alias: "r",
            default: 16000,
            global: true,
            requiresArg: true,
            type: "number"
        },
        languageCode: {
            alias: "l",
            default: "en-US",
            global: true,
            requiresArg: true,
            type: "string"
        }
    })
    .example(`node $0 micStreamRecognize`)
    .wrap(120)
    .recommendCommands()
    .epilogue(`For more information, see https://cloud.google.com/speech/docs`)
    .help()
    .strict().argv;
