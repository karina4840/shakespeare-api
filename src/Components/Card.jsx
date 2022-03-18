import React from "react";


function Card ({ play_name, text_entry }) {
  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card-heading">{play_name}</h2>
        <p className="card-text">{text_entry}</p>
      </div>
    </div>
  );
};

export default Card;

