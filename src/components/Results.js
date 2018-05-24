import React from "react";

import Emoji from './Emoji';
import Thinker from "./Thinker";
import { findEmoji, isPositive } from "../utils/emojis";

const Results = ({ crypto, isFetching, isTyping }) => {
  const { name, symbol, quotes } = crypto;
  const percent = quotes.USD.percent_change_24h;

  return (
    <div className="results">
      <div className="results__header">
        { isFetching || isTyping ? (
          <Thinker /> 
        ) : ( 
          <Emoji emoji={findEmoji(percent)} /> 
        )}
      </div>
      <h2>{name} ({symbol})</h2>
      <h5 className="results__text">
        Price:{" "}
        <span className={`price ${isPositive(percent) ? "positive" : "negative"}`}>
          ${quotes.USD.price}
        </span>, Change 24hr:{" "}
        <span className={`percent ${isPositive(percent) ? "positive" : "negative"}`}>
          {percent}%
        </span>
      </h5>
    </div>
  );
};

export default Results;
