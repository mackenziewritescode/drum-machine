# Beat Machine

Check it out [here](https://www.sunkenworld.com/drum-machine). If you want to run it locally: clone the repository, run `npm install` and then `npm run start`.

This little drum machine is a personal project made using React and styled with SCSS. This particular project was written using legacy React with Class Components and without React Hooks. This was done simply as an exercise to familiarize myself with the older React conventions, so that I could properly interpret older code and better understand the evolution of the library.

The app is composed of nine pads that can be activated by either clicking on them or pressing their corresponding keys, a background track player that plays independent, looping tracks, and a volume slider that adjusts the volume of both the pads and the background tracks.

This project has quite a few components, but only one of them controls the state: the main DrumMachine component. This stores all of the saved data in one place and keeps everything organized and bug-free. The DrumMachine component passes its state through props to all of its children components.

Let's have a look at the drum pads, which is made up of a PadWrap component and contains nine Pad components; one for each drum pad. PadWrap uses an array containing the audio and properties of each pad (PadArr) and maps them to individual Pad components, which are then returned. It also passes the event handler from DrumMachine:
```
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
```
Now each Pad component returns the 'letter' and 'name' properties and display them in paragraph elements, and then passes the 'id' property to an arrow function that handles mouse clicks:
```
<div
  className="pad"
  id={item.id}
  onMouseDown={() => this.handleClick(item.id)}
>
```
which runs a handleClick function:
```
handleClick(id) {
  this.props.handlePad(id);
}
```
... which runs the handlePad function defined in the DrumMachine component:
```
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
```
Now that we're back in the main component, we have a lot of freedom with what we can do with this data. This is particularly useful because this one function handles not only the clicking of the pad buttons, but also the key strokes associated with each pad! Here we apply the global volume property to the sound file and play it back, as well as save the current pad to state so we can keep track of the last played pad.

***

That's just a quick look at one of the many things going on in this deceptively simple project. There's also event listeners for keys associated with pads, a TrackPlayer component that uses componentDidUpdate() to control the background audio track, a window for displaying the current pad using the state property activePad, and a volume slider sets a state property volumeVal. If you want to see how everything works, have a look at `src/components/` and `src/styles/`.

Please check out my portfolio at https://www.sunkenworld.com/ if you want to see more of my work. Thanks for reading!
