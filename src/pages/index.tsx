import React, { useState } from "react"
import { GameTile, GameGrid, Scoreboard } from "../components";
import {
  instantiateSafeBoard,
  addBombsToBoard,
  updateTileAndNeighbors,
  calculateDisplayNums,
  isBombSpot,
  getBombSpots,
  revealBombSpots
} from "../managers";
import { DateTime } from "luxon";
import { Tile } from "../types";

const rows = 10;
const columns = 15;
const bombPercentage = 18;

const Home = () => {
  const initialBoard = instantiateSafeBoard(rows, columns);
  const initialBombSpots: Tile[] = [];
  const numBombs = Math.floor(rows * columns * (bombPercentage / 100));
  const numSafeSpots = (rows * columns) - numBombs;

  const startDateTime = DateTime.now().toUTC();

  const [board, setBoard] = useState(initialBoard);
  const [bombSpots, setBombSpots] = useState(initialBombSpots);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [safeSpotsLeft, setSafeSpotsLeft] = useState(numSafeSpots);
  const [isGameOver, setIsGameOver] = useState(false);


  const handleClick = (row: number, column: number) => {
    if (isGameOver) {
      return;
    }

    //hacky deep copy
    let updatedBoard: Tile[][] = JSON.parse(JSON.stringify(board));

    if (isFirstClick) {
      updatedBoard = addBombsToBoard(updatedBoard, row, column, numBombs);
      updatedBoard = calculateDisplayNums(updatedBoard);

      setBombSpots(getBombSpots(updatedBoard));
      setIsFirstClick(false);
    }

    if (isBombSpot(updatedBoard, row, column)) {
      setIsGameOver(true);
      alert("Clicked on a bomb, game over");

      updatedBoard = revealBombSpots(updatedBoard, bombSpots);
    } else {
      updatedBoard = updateTileAndNeighbors(updatedBoard, row, column);
    }

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
            isSafe={board[row][column].isSafe}
            displayNum={board[row][column].displayNum}
            handleClick={handleClick}
          />
        );
      }
    }

    return tiles;
  }

  return (
    <>
      <GameGrid
        rows={rows}
        columns={columns}
      >
        {renderTiles()}
      </GameGrid>

      {!isGameOver &&
        <Scoreboard
          startDatetime={startDateTime}
          spotsLeft={safeSpotsLeft}
        />
      }
    </>
  );
}

export default Home;