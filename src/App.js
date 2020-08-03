import React, { Component } from "react";
import "./App.css";
import Pad from "./Pad";
import padsArr from "./padsArr";

class App extends Component {
  constructor() {
    super();
    this.state = {
      padClass: "pad",
    };
    this.handlePad = this.handlePad.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handlePadClass = this.handlePadClass.bind(this);
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
        //this.setState({ padClass: "padActive" });
        //setTimeout(this.handlePadClass, 200);
        console.log(padsArr[i].id);
        padsArr[i].id = "padActive";
      }
    }
  }

  handlePadClass() {
    this.setState({ padClass: "pad" });
  }

  handlePad(index) {
    let track = new Audio(padsArr[index].audio);
    track.play();
  }

  render() {
    const pads = padsArr.map((item) => (
      <Pad
        item={item}
        key={item.index}
        id={item.id}
        letter={item.letter}
        name={item.name}
        handlePad={this.handlePad}
        padClass={this.state.padClass}
      />
    ));

    return (
      <div id="wrapper">
        <div id="drum-machine">
          <div id="pad-wrap">{pads}</div>
          <div id="display">{this.state.padName}</div>
        </div>
      </div>
    );
  }
}

export default App;
