import React from "react";

function Pad(props) {
  return (
    <div
      className="pad"
      id={props.item.id}
      onMouseDown={() => props.handlePad(props.item.index)}
    >
      <p className="letter">{props.item.letter}</p>
      <p>{props.item.name}</p>
    </div>
  );
}

export default Pad;

/*
onMouseDown={this.handlePad}
*/
