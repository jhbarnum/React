import React from "react";
import "./FriendCard.css";




const FriendCard = props => (
  // <div className="card" onClick={() => props.handleIncrement(props.id)}>
  <div className="card" onClick={() => props.handleOnChange(props)}>
    <div className="img-container" >
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content">{props.name}</div>
    
  </div>
);

export default FriendCard;
