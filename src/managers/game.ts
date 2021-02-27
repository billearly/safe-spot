import { Tile } from "../types";

export const instantiateSafeBoard = (rows: number, columns: number): Tile[][] => {
  const board: Tile[][] = [];

  for (var row = 0; row < rows; row++) {
    // Insert new row
    board.push([]);

    for (var column = 0; column < columns; column++) {
      board[row][column] = {
        isSafe: true,
        isRevealed: false,
        displayNum: 0
      }
    }
  }

  return board;
}

export const addBombsToBoard = (board: Tile[][], row: number, column: number, numBombs: number): Tile[][] => {
  //hacky deep copy
  let updatedBoard: Tile[][] = JSON.parse(JSON.stringify(board));

  const maxRow = updatedBoard.length;
  const maxColumn = updatedBoard[0].length;

  //for (var i = 0; i < numBombs; i++) {
  while (numBombs > 0) {
    const bombRow = Math.floor(Math.random() * maxRow);
    const bombColumn = Math.floor(Math.random() * maxColumn);

    // if the spot isn't already a bomb
    // and its not the clicked spot or any of its neighbors
    if (updatedBoard[bombRow][bombColumn].isSafe && Math.abs(bombRow - row) > 1 && Math.abs(bombColumn - column) > 1) {
      updatedBoard[bombRow][bombColumn].isSafe = false;
      //numBombs--; // this usually bites me in the ass
      numBombs -= 1;
    }
    else {
      // try again
      continue;
    }
  }

  return updatedBoard;
}

export const updateTileAndNeighbors = (board: Tile[][], row: number, column: number): Tile[][] => {
  // First off, does this tile exist
  if (row < 0 || column < 0 || row >= board.length || column >= board[0].length) {
    return board;
  }

  // Don't do anything if this has already been revealed
  if (board[row][column].isRevealed) {
    return board;
  }

  // does this belong in here? end game is ill defined right now
  if (!board[row][column].isSafe) {
    console.log('you clicked on a bomb');
    return board;
  }

  //hacky deep copy
  let updatedBoard: Tile[][] = JSON.parse(JSON.stringify(board));

  const clickedTile = updatedBoard[row][column];
  clickedTile.isRevealed = true;
  clickedTile.displayNum = calculateDisplayNum(board, row, column);

  // update the board for each neighbor if this is a 0
  if (clickedTile.displayNum == 0) {
    updatedBoard = updateTileAndNeighbors(updatedBoard, row - 1, column);
    updatedBoard = updateTileAndNeighbors(updatedBoard, row - 1, column + 1);
    updatedBoard = updateTileAndNeighbors(updatedBoard, row - 1, column - 1);
    updatedBoard = updateTileAndNeighbors(updatedBoard, row + 1, column);
    updatedBoard = updateTileAndNeighbors(updatedBoard, row + 1, column + 1);
    updatedBoard = updateTileAndNeighbors(updatedBoard, row + 1, column - 1);
    updatedBoard = updateTileAndNeighbors(updatedBoard, row, column + 1);
    updatedBoard = updateTileAndNeighbors(updatedBoard, row, column - 1);
  }

  return updatedBoard;
}

const calculateDisplayNum = (board: Tile[][], row: number, column: number): number => {
  // Is this tile a bomb
  if (!board[row][column].isSafe) {
    return -1;
  }

  // Check all directions
  return isNeighborBomb(board, row - 1, column) + //N
    isNeighborBomb(board, row - 1, column + 1) + // NE
    isNeighborBomb(board, row, column + 1) + // E
    isNeighborBomb(board, row + 1, column + 1) + //SE
    isNeighborBomb(board, row + 1, column) + //S
    isNeighborBomb(board, row + 1, column - 1) + //SW
    isNeighborBomb(board, row, column - 1) + //W
    isNeighborBomb(board, row - 1, column - 1); //NW
}

const isNeighborBomb = (board: Tile[][], neighborRow: number, neighborColumn: number): number => {
  const neighborExists = neighborRow > 0 &&
    neighborRow < board.length &&
    neighborColumn > 0 &&
    neighborColumn < board[0].length;

  if (!neighborExists) {
    return 0;
  }

  return board[neighborRow][neighborColumn].isSafe ? 0 : 1;
}
