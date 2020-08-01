import React, { Component } from "react";
import "./App.css";
import Pad from "./Pad";
import padsArr from "./padsArr";

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.handlePad = this.handlePad.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey, false);
  }

  handleKey(event) {
    console.log(event.key);
    for (let i = 0; i < padsArr.length; i++) {
      if (event.key === padsArr[i].letter) {
        let track = new Audio(padsArr[i].audio);
        track.play();
      }
    }
  }

  handlePad(id) {
    let track = new Audio(padsArr[id].audio);
    track.play();
  }

  render() {
    const pads = padsArr.map((item) => (
      <Pad
        key={item.id}
        item={item}
        letter={item.letter}
        keyCode={item.keyCode}
        name={item.name}
        handlePad={this.handlePad}
      />
    ));

    return (
      <div id="wrapper" onKeyPress={this.handleKeyInput}>
        <div id="drum-machine">
          <div id="pad-wrap">{pads}</div>
          <div id="display">{this.state.padName}</div>
        </div>
      </div>
    );
  }
}

export default App;

/*
class App extends Component {
  constructor() {
    super();
    this.state = {
      padName: "------",
      clap: new Audio(Pad1),
    };
    this.handlePad = this.handlePad.bind(this);
  }

  handlePad(event) {
    this.setState({ padName: event.target.id });
    let track = new Audio(Pad1);
    track.play();
  }
*/
