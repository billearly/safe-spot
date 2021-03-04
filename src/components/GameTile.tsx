import React, { useState } from "react";
import classnames from "classnames";
import "./GameTile.scss";

type GameTileProps = {
  row: number;
  column: number;
  isRevealed: boolean;
  isSafe: boolean;
  displayNum: number;
  handleClick: (row: number, column: number) => void;
}

export const GameTile = ({
  row,
  column,
  isRevealed,
  isSafe,
  displayNum,
  handleClick
}: GameTileProps) => {
  const [isSuspect, setIsSuspect] = useState(false);

  const classes = classnames("game-tile", {
    "game-tile--clicked": isRevealed,
    "game-tile--suspect": !isRevealed && isSuspect,
    "game-tile--bomb": isRevealed && !isSafe
  });

  const onClick = () => {
    if (!isSuspect) {
      handleClick(row, column);
    }
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleSuspicion();
    return false;
  }

  const toggleSuspicion = () => {
    setIsSuspect(!isSuspect);
  }

  const getText = (): string => {
    if (!isRevealed && isSuspect) {
      return "😲";
    }

    if (isRevealed && !isSafe) {
      return "💣";
    }

    if (isRevealed) {
      return `${displayNum}`;
    }
  }

  return (
    <div>
      <button
        className={classes}
        onClick={onClick}
        onContextMenu={handleContextMenu}
      >
        <p>{getText()}</p>
      </button>
    </div>
  )
}