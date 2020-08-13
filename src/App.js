import React, { Component } from "react"
import "./App.css"
import padsArr from "./padsArr"
import tracksArr from "./tracksArr"

class Volume extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="volume">
        <h3>Volume</h3>
        <p>---||---</p>
      </div>
    )
  }
}

class PadDisplay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // returns the name of the active pad if state.activePad is not empty
    const activePadName =
      this.props.activePad === ""
        ? "------"
        : padsArr.filter((pad) => pad.id === this.props.activePad)[0].name

    return (
      <div id="padDisplay">
        <h3>Most Recent Pad</h3>
        <p id="padDisplayWindow">{activePadName}</p>
      </div>
    )
  }
}

class Track extends Component {
  constructor(props) {
    super(props)
    this.handleTrackClick = this.handleTrackClick.bind(this)
  }

  handleTrackClick(id) {
    this.props.handleTrack(id)
    console.log(id)
  }

  render() {
    const item = this.props.item

    return (
      <div className="track" onClick={() => this.handleTrackClick(item.id)}>
        <div className="trackToggle" />
        <p className="trackName">{this.props.item.name}</p>
      </div>
    )
  }
}

class TrackPlayer extends Component {
  constructor(props) {
    super(props)
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
    ))
    return (
      <div id="trackPlayer">
        <h3 id="trackTitle">Background Track</h3>
        {tracks}
      </div>
    )
  }
}

class Pad extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    this.props.handlePad(id)
    console.log(id)
  }

  render() {
    const item = this.props.item

    return (
      <div
        className="pad"
        id={item.id}
        onMouseDown={() => this.handleClick(item.id)}
      >
        <p className="letter">{item.letter}</p>
        <p>{item.name}</p>
      </div>
    )
  }
}

class PadWrap extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const pads = padsArr.map((item) => (
      <Pad
        item={item}
        key={item.id}
        id={item.id}
        letter={item.letter}
        name={item.name}
        handlePad={this.props.handlePad}
      />
    ))

    return <div id="padWrap">{pads}</div>
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      activePad: "",
      activeTrack: "track0",
      playing: false,
      volumeVal: 100,
    }
    this.handlePad = this.handlePad.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.animatePad = this.animatePad.bind(this)
    this.handleTrack = this.handleTrack.bind(this)
  }

  // when a key is pressed, run handleKey()
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey, false)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey, false)
  }

  // if the key pressed corresponds to a pad, set state and activate pad
  handleKey(event) {
    console.log(event.key)
    for (let i = 0; i < padsArr.length; i++) {
      if (event.key === padsArr[i].letter) {
        let track = new Audio(padsArr[i].audio)
        track.play()
        this.setState({ activePad: padsArr[i].id })
        this.animatePad(this.state.activePad)
      }
    }
  }

  // if a pad is clicked, set state and activate pad
  handlePad(id) {
    this.setState({ activePad: id })
    this.animatePad(id)
    for (let i = 0; i < padsArr.length; i++) {
      if (padsArr[i].id === id) {
        let track = new Audio(padsArr[i].audio)
        track.play()
      }
    }
  }

  // change the color of the pad when activated. Duration specifies fade length.
  animatePad(id) {
    document
      .getElementById(id)
      .animate([{ background: "orangered" }, { background: "white" }], {
        duration: 400,
        iterations: 1,
      })
  }

  handleTrack(id) {
    this.setState({ activeTrack: id })
  }

  // styleTrack(id) {
  //   document.getElementById(id).setAttribute("style", "background:yellow;");
  // }

  componentDidUpdate(prevState) {
    if (this.state.activeTrack !== prevState.activeTrack) {
      let track = ""
      switch (this.state.activeTrack) {
        case "track0":
          break
        case "track1":
          track = tracksArr[1].audio
          break
        case "track2":
          track = tracksArr[2].audio
          break
        case "track3":
          track = tracksArr[3].audio
          break
        default:
          break
      }
      if (track) {
        this.player.src = track
        this.player.play()
      }
    }
  }

  render() {
    return (
      <div id="wrapper">
        <div id="drumMachine">
          <PadWrap handlePad={this.handlePad} />
          <div id="controlWrap">
            <h2 id="title">Drum Machine</h2>
            <TrackPlayer
              activeTrack={this.state.activeTrack}
              handleTrack={this.handleTrack}
              playing={this.state.playing}
            />
            <PadDisplay activePad={this.state.activePad} />
            <Volume volumeVal={this.state.volumeVal} />
            <audio ref={(ref) => (this.player = ref)} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
