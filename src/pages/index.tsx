import React, { useState } from "react"
import { GameTile, TileGrid } from "../components";
import { instantiateSafeBoard, updateTileAndNeighbors, addBombsToBoard } from "../managers";
import { Tile } from "../types";
import "./index.scss";

const Home = () => {
  const initialBoard = instantiateSafeBoard(6, 3);

  const [isFirstClick, setIsFirstClick] = useState(true);
  const [board, setBoard] = useState(initialBoard);

  const handleClick = (row: number, column: number) => {
    let updatedBoard: Tile[][] = board;

    if (isFirstClick) {
      console.log('first click');
      // randomly populate the board with X number of bombs, except for the current tile and all neighbors (always click a 0 first)
      // updatedBoard = addBombsToBoard(board, row, column, 2);

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