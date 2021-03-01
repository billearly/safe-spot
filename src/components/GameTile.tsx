import React, { useState } from "react";
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
  const [isSuspect, setIsSuspect] = useState(false);

  const classes = classnames("game-tile", {
    "game-tile--clicked": isRevealed,
    "game-tile--suspect": !isRevealed && isSuspect
  });

  const onClick = () => {
    handleClick(row, column);
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleSuspicion();
    return false;
  }

  const toggleSuspicion = () => {
    setIsSuspect(!isSuspect);
  }

  return (
    <div>
      <button
        className={classes}
        onClick={onClick}
        onContextMenu={handleContextMenu}
      >
        {isRevealed &&
          <p>{displayNum}</p>
        }

        {!isRevealed && isSuspect &&
          <p>😲</p>
        }
      </button>
    </div>
  )
}