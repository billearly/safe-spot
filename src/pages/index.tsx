import React, { useState } from "react"
import { GameTile, TileGrid } from "../components";
import {
  instantiateSafeBoard,
  addBombsToBoard,
  updateTileAndNeighbors,
  calculateDisplayNums
} from "../managers";
import { Tile } from "../types";
import "./index.scss";

const Home = () => {
  const initialBoard = instantiateSafeBoard(5, 5);

  const [board, setBoard] = useState(initialBoard);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const handleClick = (row: number, column: number) => {
    //hacky deep copy
    let updatedBoard: Tile[][] = JSON.parse(JSON.stringify(board));

    if (isFirstClick) {
      updatedBoard = addBombsToBoard(updatedBoard, row, column, 5);
      updatedBoard = calculateDisplayNums(updatedBoard);

      setIsFirstClick(false);
    }

    updatedBoard = updateTileAndNeighbors(updatedBoard, row, column);
    setBoard(updatedBoard);
  }

  const renderTiles = () => {
    let tiles = [];

    for (var row = 0; row < board.length; row++) {
      for (var column = 0; column < board[row].length; column++) {
        tiles.push(
          <GameTile
            key={`${row}-${column}`}
            row={row}
            column={column}
            isRevealed={board[row][column].isRevealed}
            displayNum={board[row][column].displayNum}
            handleClick={handleClick}
          />
        );
      }
    }

    return tiles;
  }

  return (
    <TileGrid>
      {renderTiles()}
    </TileGrid>
  );
}

export default Home;