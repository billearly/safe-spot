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
  const maxRow = board.length;
  const maxColumn = board[0].length;

  while (numBombs > 0) {
    const bombRow = Math.floor(Math.random() * maxRow);
    const bombColumn = Math.floor(Math.random() * maxColumn);

    // if the spot isn't already a bomb
    // and its not the clicked spot or any of its neighbors
    if (board[bombRow][bombColumn].isSafe && (Math.abs(bombRow - row) > 1 || Math.abs(bombColumn - column) > 1)) {
      board[bombRow][bombColumn].isSafe = false;
      numBombs -= 1;
    }
    else {
      // try again
      continue;
    }
  }

  return board;
}

export const calculateDisplayNums = (board: Tile[][]): Tile[][] => {
  for (var row = 0; row < board.length; row++) {
    for (var column = 0; column < board[0].length; column++) {
      board[row][column].displayNum = calculateDisplayNum(board, row, column);
    }
  }

  return board;
}

export const updateTileAndNeighbors = (board: Tile[][], row: number, column: number): Tile[][] => {
  // First off, does this tile exist
  if (row < 0 || column < 0 || row >= board.length || column >= board[0].length) {
    return board;
  }

  const clickedTile = board[row][column];

  // Don't do anything if this spot has already been revealed
  if (clickedTile.isRevealed) {
    return board;
  }

  // does this belong in here? end game is ill defined right now
  if (!board[row][column].isSafe) {
    alert('you clicked on a bomb');
    return board;
  }

  clickedTile.isRevealed = true;

  // update the board for each neighbor if this is a 0
  if (clickedTile.displayNum == 0) {
    board = updateTileAndNeighbors(board, row - 1, column);
    board = updateTileAndNeighbors(board, row - 1, column + 1);
    board = updateTileAndNeighbors(board, row - 1, column - 1);
    board = updateTileAndNeighbors(board, row + 1, column);
    board = updateTileAndNeighbors(board, row + 1, column + 1);
    board = updateTileAndNeighbors(board, row + 1, column - 1);
    board = updateTileAndNeighbors(board, row, column + 1);
    board = updateTileAndNeighbors(board, row, column - 1);
  }

  return board;
}

const calculateDisplayNum = (board: Tile[][], row: number, column: number): number => {
  // Is this tile a bomb
  if (!board[row][column].isSafe) {
    return -1;
  }

  // Check all directions
  return getNeighborBombCount(board, row - 1, column) + //N
    getNeighborBombCount(board, row - 1, column + 1) + // NE
    getNeighborBombCount(board, row, column + 1) + // E
    getNeighborBombCount(board, row + 1, column + 1) + //SE
    getNeighborBombCount(board, row + 1, column) + //S
    getNeighborBombCount(board, row + 1, column - 1) + //SW
    getNeighborBombCount(board, row, column - 1) + //W
    getNeighborBombCount(board, row - 1, column - 1); //NW
}

const getNeighborBombCount = (board: Tile[][], neighborRow: number, neighborColumn: number): number => {
  const neighborExists = neighborRow >= 0 &&
    neighborRow < board.length &&
    neighborColumn >= 0 &&
    neighborColumn < board[0].length;

  if (!neighborExists) {
    return 0;
  }

  return board[neighborRow][neighborColumn].isSafe ? 0 : 1;
}
