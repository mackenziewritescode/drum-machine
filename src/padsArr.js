import clapAudio from "./audio/Clap.wav";
import hiHat1Audio from "./audio/Hi-Hat 1.wav";
import hiHat2Audio from "./audio/Hi-Hat 2.wav";
import tom1Audio from "./audio/Tom 1.wav";
import tom2Audio from "./audio/Tom 2.wav";
import tom3Audio from "./audio/Tom 3.wav";
import kickAudio from "./audio/Kick.wav";
import snareAudio from "./audio/Snare.wav";
import fxAudio from "./audio/FX.wav";

const padsArr = [
  {
    index: 0,
    id: "pad0",
    letter: "q",
    name: "Clap",
    audio: clapAudio,
  },
  {
    index: 1,
    id: "pad1",
    letter: "w",
    name: "Hi-Hat 1",
    audio: hiHat1Audio,
  },
  {
    index: 2,
    id: "pad2",
    letter: "e",
    name: "Hi-Hat 2",
    audio: hiHat2Audio,
  },
  {
    index: 3,
    id: "pad3",
    letter: "a",
    name: "Tom 1",
    audio: tom1Audio,
  },
  {
    index: 4,
    id: "pad4",
    letter: "s",
    name: "Tom 2",
    audio: tom2Audio,
  },
  {
    index: 5,
    id: "pad5",
    letter: "d",
    name: "Tom 3",
    audio: tom3Audio,
  },
  {
    index: 6,
    id: "pad6",
    letter: "z",
    name: "Kick",
    audio: kickAudio,
  },
  {
    index: 7,
    id: "pad7",
    letter: "x",
    name: "Snare",
    audio: snareAudio,
  },
  {
    index: 8,
    id: "pad8",
    letter: "c",
    name: "FX",
    audio: fxAudio,
  },
];

export default padsArr;
