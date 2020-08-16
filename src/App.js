import React, { Component } from "react";
import "./App.css";
import padsArr from "./padsArr";
import tracksArr from "./tracksArr";
import { RiArrowGoBackLine } from "react-icons/ri";

class Volume extends Component {
  constructor(props) {
    super(props);
    this.volumeChange = this.volumeChange.bind(this);
  }

  volumeChange(e) {
    this.props.handleVolume(e.target.value);
  }

  render() {
    return (
      <div id="volume">
        <h3>Volume</h3>
        <input
          id="volumeSlider"
          type="range"
          min={0}
          max={100}
          value={this.props.volumeVal}
          onChange={this.volumeChange}
        />
      </div>
    );
  }
}

function PadDisplay(props) {
  // returns the name of the active pad if state.activePad is not empty
  const activePadName =
    props.activePad === ""
      ? "------"
      : padsArr.filter((pad) => pad.id === props.activePad)[0].name;

  return (
    <div id="padDisplay">
      <h3>Most Recent Pad</h3>
      <p id="padDisplayWindow">{activePadName}</p>
    </div>
  );
}

class Track extends Component {
  constructor(props) {
    super(props);
    this.handleTrackClick = this.handleTrackClick.bind(this);
  }

  handleTrackClick(id) {
    this.props.handleTrack(id);
  }

  render() {
    const item = this.props.item;
    const toggleColor =
      item.id === this.props.activeTrack ? { background: "#ceff73" } : null;

    return (
      <div className="track" onClick={() => this.handleTrackClick(item.id)}>
        <div className="trackToggle" style={toggleColor} />
        <p className="trackName">{this.props.item.name}</p>
      </div>
    );
  }
}

class TrackPlayer extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevState) {
    let player = this.props.player;
    let volumePercent = this.props.volumeVal / 100;
    // This sets the player's audio to match the state's active track
    if (this.props.activeTrack !== prevState.activeTrack) {
      let track = "";
      switch (this.props.activeTrack) {
        case "track0":
          break;
        case "track1":
          track = tracksArr[1].audio;
          break;
        case "track2":
          track = tracksArr[2].audio;
          break;
        case "track3":
          track = tracksArr[3].audio;
          break;
        default:
          break;
      }
      // this plays the track and loops it
      if (track) {
        player.src = track;
        player.volume = volumePercent;
        player.play();
        player.loop = true;
      }
    }
    // This stops the track if "None" is selected
    if (this.props.playing !== prevState.playing) {
      if (this.props.playing === false) {
        player.pause();
      }
    }
    if (this.props.volumeVal !== prevState.volumeVal) {
      player.volume = volumePercent;
    }
  }

  render() {
    const tracks = tracksArr.map((item) => (
      <Track
        item={item}
        key={item.index}
        id={item.id}
        name={item.name}
        audio={item.audio}
        activeTrack={this.props.activeTrack}
        handleTrack={this.props.handleTrack}
      />
    ));
    return (
      <div id="trackPlayer">
        <h3 id="trackTitle">Background Track</h3>
        {tracks}
      </div>
    );
  }
}

class Pad extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.handlePad(id);
  }

  render() {
    const item = this.props.item;

    return (
      <div
        className="pad"
        id={item.id}
        onMouseDown={() => this.handleClick(item.id)}
      >
        <p className="letter">{item.letter}</p>
        <p>{item.name}</p>
      </div>
    );
  }
}

function PadWrap(props) {
  const pads = padsArr.map((item) => (
    <Pad
      item={item}
      key={item.id}
      id={item.id}
      letter={item.letter}
      name={item.name}
      handlePad={props.handlePad}
    />
  ));

  return <div id="padWrap">{pads}</div>;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePad: "",
      activeTrack: "track0",
      playing: false,
      volumeVal: 100,
    };
    this.handlePad = this.handlePad.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.animatePad = this.animatePad.bind(this);
    this.handleTrack = this.handleTrack.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  // when a key is pressed, run handleKey()
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey, false);
  }

  // if the key pressed corresponds to a pad, set state and activate pad
  handleKey(event) {
    for (let i = 0; i < padsArr.length; i++) {
      if (event.key === padsArr[i].letter) {
        let track = new Audio(padsArr[i].audio);
        track.play();
        this.setState({ activePad: padsArr[i].id });
        this.animatePad(this.state.activePad);
      }
    }
  }

  // if a pad is clicked, set state and activate pad
  handlePad(id) {
    let volumePercent = this.state.volumeVal / 100;
    this.setState({ activePad: id });
    this.animatePad(id);
    for (let i = 0; i < padsArr.length; i++) {
      if (padsArr[i].id === id) {
        let padAudio = new Audio(padsArr[i].audio);
        padAudio.volume = volumePercent;
        padAudio.play();
      }
    }
  }

  // changes the color of the pad when activated. Duration specifies fade length.
  animatePad(id) {
    document
      .getElementById(id)
      .animate(
        [{ background: "#85f7ff" }, { background: "rgba(255, 255, 255, 0.5)" }],
        {
          duration: 400,
          iterations: 1,
        }
      );
  }

  // tells the state if a track is playing or not
  handleTrack(id) {
    this.setState({ activeTrack: id });
    if (id === "track0") {
      this.setState({ playing: false });
    } else {
      this.setState({ playing: true });
    }
  }

  handleVolume(value) {
    this.setState({ volumeVal: value });
  }

  render() {
    return (
      <div id="wrapper">
        <a className="portfolio" href="http://www.sunkenworld.com/about/">
          <p className="portfolio-text">
            <RiArrowGoBackLine /> Back to portfolio
          </p>
        </a>
        <div id="drumMachine">
          <PadWrap
            handlePad={this.handlePad}
            volumeVal={this.state.volumeVal}
          />
          <div id="controlWrap">
            <h2 id="title">Beat Machine</h2>
            <TrackPlayer
              activeTrack={this.state.activeTrack}
              handleTrack={this.handleTrack}
              playing={this.state.playing}
              player={this.player}
              handlePlay={this.handlePlay}
              volumeVal={this.state.volumeVal}
            />
            <PadDisplay activePad={this.state.activePad} />
            <Volume
              volumeVal={this.state.volumeVal}
              handleVolume={this.handleVolume}
            />
            <audio ref={(ref) => (this.player = ref)} />
          </div>
        </div>
        <footer id="footer">
          <p>
            This site was made by{" "}
            <a className="footer-link" href="http://www.sunkenworld.com/about/">
              Mackenzie Charlton
            </a>{" "}
            in 2020 with{" "}
            <a className="footer-link" href="https://reactjs.org">
              React
            </a>
            .
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
