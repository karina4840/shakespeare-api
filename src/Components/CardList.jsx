import React from "react";
import Card from "./Card";


function CardList({ plays }) {
  return (
    <div className="cardList-container">
      {plays.map((play, i) => {
        return (
          <Card
            key={i}
            id={plays[i]._id}
            play_name={plays[i]._source.play_name}
            text_entry={plays[i]._source.text_entry}
          />
        );
      })}
    </div>
  );
};

export default CardList;

