import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      padName: "------",
    };
    this.handlePad = this.handlePad.bind(this);
  }

  handlePad(event) {
    this.setState({ padName: event.target.id }); // FIX THIS
  }

  render() {
    return (
      <div id="wrapper">
        <div id="drum-machine">
          <div id="pad-wrap">
            <div className="pad" id="Pad 1" onMouseDown={this.handlePad}>
              <p className="letter">Q</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-2">
              <p className="letter">W</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-3">
              <p className="letter">E</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-4">
              <p className="letter">A</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-5">
              <p className="letter">S</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-6">
              <p className="letter">D</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-7">
              <p className="letter">Z</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-8">
              <p className="letter">X</p>
              <p>clap</p>
            </div>
            <div className="pad" id="pad-9">
              <p className="letter">C</p>
              <p>clap</p>
            </div>
          </div>
          <div id="display">{this.state.padName}</div>
        </div>
      </div>
    );
  }
}

export default App;
