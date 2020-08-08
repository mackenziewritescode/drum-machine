import React, { Component } from "react";
import "./App.css";
import padsArr from "./padsArr";
import tracksArr from "./tracksArr";

class Volume extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="volume">
        <h3>Volume</h3>
        <p>---i'm a volume slider---</p>
      </div>
    );
  }
}

class PadDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //var activePadName = padsArr.filter(
    //   (pad) => pad.id === this.props.activePad
    // )[0].name;
    return (
      <div id="padDisplay">
        <h3>Current Pad</h3>
        {/* <p>{activePadName}</p> */}
      </div>
    );
  }
}

class Track extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.item.name}</div>;
  }
}

class TrackWrap extends Component {
  constructor(props) {
    super(props);
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
      />
    ));
    return (
      <div id="trackWrap">
        <h3>Background Track</h3>
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

  handleClick(e) {
    this.props.handlePad(e.target.id);
    console.log(e.target.id);
  }

  render() {
    const item = this.props.item;

    const padClass =
      this.props.item.id === this.props.activePad ? "padActive" : "pad";

    return (
      <div className={padClass} id={item.id} onClick={this.handleClick}>
        <p className="letter">{item.letter}</p>
        <p>{item.name}</p>
      </div>
    );
  }
}

class PadWrap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const pads = padsArr.map((item) => (
      <Pad
        item={item}
        key={item.index}
        id={item.id}
        letter={item.letter}
        name={item.name}
        audio={item.audio}
        activePad={this.props.activePad}
        handlePad={this.props.handlePad}
      />
    ));

    return <div id="padWrap">{pads}</div>;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePad: "pad0",
      activeTrack: "track0",
      volumeVal: 100,
    };
    this.handlePad = this.handlePad.bind(this);
  }

  handlePad(id) {
    this.setState({ activePad: id });
  }

  render() {
    return (
      <div id="wrapper">
        <div id="drumMachine">
          <PadWrap
            activePad={this.state.activePad}
            handlePad={this.handlePad}
          />
          <div id="controlWrap">
            <h2 id="title">Drum Machine</h2>
            <TrackWrap activeTrack={this.state.activeTrack} />
            <PadDisplay activePad={this.state.activePad} />
            <Volume volumeVal={this.state.volumeVal} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
