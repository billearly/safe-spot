import React from "react";
import classnames from "classnames";
import "./GameTile.scss";

type GameTileProps = {
  row: number;
  column: number;
  isRevealed: boolean;
  displayNum: number;
  handleClick: (row: number, column: number) => void;
}

export const GameTile = ({
  row,
  column,
  isRevealed,
  displayNum,
  handleClick
}: GameTileProps) => {
  const classes = classnames("game-tile", {
    "game-tile--clicked": isRevealed,
  });

  const onClick = () => {
    handleClick(row, column);
  }

  return (
    <div>
      <button
        className={classes}
        onClick={onClick}
      >
        {isRevealed &&
          <p>{displayNum}</p>
        }
      </button>
    </div>
  )
}