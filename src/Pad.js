import React from "react";

function Pad(props) {
  return (
    <div
      id={props.item.id}
      className={props.padClass}
      onMouseDown={() => props.handlePad(props.item.index)}
    >
      <p className="letter">{props.item.letter}</p>
      <p>{props.item.name}</p>
    </div>
  );
}

export default Pad;
