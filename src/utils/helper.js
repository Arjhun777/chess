import {
  CHESS_BOARD_SIZE_X,
  DEFAULT_POSITION,
  CHESS_PIECE_DESCRIPTION,
  CHESS_BOARD_SIZE_Y,
} from "../constants/global";
import { store } from '../index';
import { pawnPosition } from "./possiblePositionUtils";

export const createBoard = () => {
  const defaultBoard = new Array(CHESS_BOARD_SIZE_X)
    .fill(null)
    .map(() => [...new Array(CHESS_BOARD_SIZE_Y)]);
  const tiles = ["BLACK", "WHITE"];

  new Array(CHESS_BOARD_SIZE_X)
    .fill(CHESS_BOARD_SIZE_X)
    .forEach((dataX, indexX) => {
      // Set Pieces in default position
      const piece = DEFAULT_POSITION[indexX];
      //   DARK piece default configure and position
      defaultBoard[0][indexX] = {
        ...defaultBoard[0][indexX],
        piece: {
          side: "BLACK",
          ...CHESS_PIECE_DESCRIPTION[piece]
        },
      };
      defaultBoard[1][indexX] = {
        ...defaultBoard[1][indexX],
        piece: {
          side: "BLACK",
          ...CHESS_PIECE_DESCRIPTION["PAWN"]
        },
      };
      //   WHITE piece default configure and position
      defaultBoard[defaultBoard.length - 2][indexX] = {
        ...defaultBoard[defaultBoard.length - 2][indexX],
        piece: {
          side: "WHITE",
          ...CHESS_PIECE_DESCRIPTION["PAWN"]
        },
      };
      defaultBoard[defaultBoard.length - 1][CHESS_BOARD_SIZE_X - 1 - indexX] = {
        ...defaultBoard[defaultBoard.length - 1][
          CHESS_BOARD_SIZE_X - 1 - indexX
        ],
        piece: {
          side: "WHITE",
          ...CHESS_PIECE_DESCRIPTION[piece]
        },
      };
      // To fill each tile details
      new Array(CHESS_BOARD_SIZE_Y)
        .fill(CHESS_BOARD_SIZE_Y)
        .forEach((dataY, indexY) => {
          const tileIndex = (indexX + indexY) % 2;
          const tile = tiles[tileIndex];
          defaultBoard[indexX][indexY] = {
            ...defaultBoard[indexX][indexY],
            tile,
          };
        });
    });
  return defaultBoard;
};


export const getPossiblePlacesToMove = (mainBoard, x, y, column) => {
  if (mainBoard[x][y]?.piece) {
    const currentPlayer = store.getState().board.currentPlayer;
    const { name, side } = mainBoard[x][y].piece;
    if (side === currentPlayer) {
      if (name === 'PAWN') {
        return pawnPossiblePosition(mainBoard, x, y, column);
      } else if (name === 'ROOK') {
        return rookPossiblePosition(mainBoard, x, y, column);
      } else if (name === 'BISHOP') {
        return bishopPossiblePosition(mainBoard, x, y, column);
      } else if (name === 'KING') {
        return kingPossiblePosition(mainBoard, x, y, column);
      }
    }
  }
}

const pawnPossiblePosition = (mainBoard, x, y, column) => {
  const pawnPositions = [];
  if (column.piece.side === 'WHITE') {
    // to check if the pawn in initial position to make two moves possible
    if (x === 6 && !mainBoard[x-2]?.[y]?.piece)
      pawnPositions.push({ x: x - 2, y: y });
    // to check if the White pawn has some black piece on left to strike possible
    if (mainBoard[x-1][y-1]?.piece?.side === 'BLACK')
      pawnPositions.push({ x: x - 1, y: y - 1 });
    // to check if the White pawn has some black piece on right to strike possible
    if (mainBoard[x-1][y+1]?.piece?.side === 'BLACK')  
      pawnPositions.push({ x: x - 1, y: y + 1 });
    // posible to move forward only if no piece is available
    if (!mainBoard[x-1][y]?.piece)
      pawnPositions.push({ x: x - 1, y: y });
  } else if (column.piece.side === 'BLACK') {
    // same condition as white only direction changes
    if (x === 1 && !mainBoard[x+2][y]?.piece)
      pawnPositions.push({ x: x + 2, y: y });
    if (mainBoard[x+1][y+1]?.piece?.side === 'WHITE')
      pawnPositions.push({ x: x + 1, y: y + 1 });
    if (mainBoard[x+1][y-1]?.piece?.side === 'WHITE')  
      pawnPositions.push({ x: x + 1, y: y - 1 });
    if (!mainBoard[x+1][y]?.piece)
      pawnPositions.push({ x: x + 1, y: y });
  }
  return pawnPositions;
}

const rookPossiblePosition = (mainBoard, x, y, column) => {
  const rookPositions = [];
  const trackDone = [];
  if (column.piece.side === 'WHITE') {
    for (let index = 0; index < CHESS_BOARD_SIZE_X; index++) {
      const i = index + 1;
      if (mainBoard[x+i]?.[y]?.piece?.side === 'WHITE') trackDone.push('x+');
      if (mainBoard[x-i]?.[y]?.piece?.side === 'WHITE') trackDone.push('x-');
      if (mainBoard[x]?.[y+i]?.piece?.side === 'WHITE') trackDone.push('y+');
      if (mainBoard[x]?.[y-i]?.piece?.side === 'WHITE') trackDone.push('y-');
      if (x + i < CHESS_BOARD_SIZE_X && !trackDone.includes('x+'))
        rookPositions.push({ x: x + i, y: y });
      if (x - i >= 0 && !trackDone.includes('x-'))
        rookPositions.push({ x: x - i, y: y });
      if (y + i < CHESS_BOARD_SIZE_Y && !trackDone.includes('y+'))
        rookPositions.push({ x: x, y: y + i });
      if (y - i >= 0 && !trackDone.includes('y-'))
        rookPositions.push({ x: x, y: y - i });
      if (mainBoard[x+i]?.[y]?.piece?.side === 'BLACK') trackDone.push('x+');
      if (mainBoard[x-i]?.[y]?.piece?.side === 'BLACK') trackDone.push('x-');
      if (mainBoard[x]?.[y+i]?.piece?.side === 'BLACK') trackDone.push('y+');
      if (mainBoard[x]?.[y-i]?.piece?.side === 'BLACK') trackDone.push('y-');
    }
  } else if (column.piece.side === 'BLACK') {
    for (let index = 0; index < CHESS_BOARD_SIZE_X; index++) {
      const i = index + 1;
      if (mainBoard[x+i]?.[y]?.piece?.side === 'BLACK') trackDone.push('x+');
      if (mainBoard[x-i]?.[y]?.piece?.side === 'BLACK') trackDone.push('x-');
      if (mainBoard[x]?.[y+i]?.piece?.side === 'BLACK') trackDone.push('y+');
      if (mainBoard[x]?.[y-i]?.piece?.side === 'BLACK') trackDone.push('y-');
      if (x + i < CHESS_BOARD_SIZE_X && !trackDone.includes('x+'))
        rookPositions.push({ x: x + i, y: y });
      if (x - i >= 0 && !trackDone.includes('x-'))
        rookPositions.push({ x: x - i, y: y });
      if (y + i < CHESS_BOARD_SIZE_Y && !trackDone.includes('y+'))
        rookPositions.push({ x: x, y: y + i });
      if (y - i >= 0 && !trackDone.includes('y-'))
        rookPositions.push({ x: x, y: y - i });
      if (mainBoard[x+i]?.[y]?.piece?.side === 'WHITE') trackDone.push('x+');
      if (mainBoard[x-i]?.[y]?.piece?.side === 'WHITE') trackDone.push('x-');
      if (mainBoard[x]?.[y+i]?.piece?.side === 'WHITE') trackDone.push('y+');
      if (mainBoard[x]?.[y-i]?.piece?.side === 'WHITE') trackDone.push('y-');
    }
  }
  return rookPositions;
}

const bishopPossiblePosition = (mainBoard, x, y, column) => {
  const bishopPositions = [];
  const trackDone = [];
  if (column.piece.side === 'WHITE') {
    for (let index = 0; index < CHESS_BOARD_SIZE_X; index++) {
      const i = index + 1;
      if (mainBoard[x+i]?.[y+i]?.piece?.side === 'WHITE') trackDone.push('UP_RIGHT');
      if (mainBoard[x-i]?.[y-i]?.piece?.side === 'WHITE') trackDone.push('UP_LEFT');
      if (mainBoard[x-i]?.[y+i]?.piece?.side === 'WHITE') trackDone.push('DOWN_RIGHT');
      if (mainBoard[x+i]?.[y-i]?.piece?.side === 'WHITE') trackDone.push('DOWN_LEFT');
      if (x + i < CHESS_BOARD_SIZE_X && y + i < CHESS_BOARD_SIZE_Y && !trackDone.includes('UP_RIGHT'))
        bishopPositions.push({ x: x + i, y: y + i });
      if (x - i >= 0 && y - i >= 0 && !trackDone.includes('UP_LEFT'))
        bishopPositions.push({ x: x - i, y: y - i });
      if (y + i < CHESS_BOARD_SIZE_Y && x - i >= 0 && !trackDone.includes('DOWN_RIGHT'))
        bishopPositions.push({ x: x - i, y: y + i });
      if (y - i >= 0 && x + i < CHESS_BOARD_SIZE_X && !trackDone.includes('DOWN_LEFT'))
        bishopPositions.push({ x: x + i, y: y - i });
      if (mainBoard[x+i]?.[y+i]?.piece?.side === 'BLACK') trackDone.push('UP_RIGHT');
      if (mainBoard[x-i]?.[y-i]?.piece?.side === 'BLACK') trackDone.push('UP_LEFT');
      if (mainBoard[x-i]?.[y+i]?.piece?.side === 'BLACK') trackDone.push('DOWN_RIGHT');
      if (mainBoard[x+i]?.[y-i]?.piece?.side === 'BLACK') trackDone.push('DOWN_LEFT');
    }
  } else if (column.piece.side === 'BLACK') {
    for (let index = 0; index < CHESS_BOARD_SIZE_X; index++) {
      const i = index + 1;
      if (mainBoard[x+i]?.[y+i]?.piece?.side === 'BLACK') trackDone.push('UP_RIGHT');
      if (mainBoard[x-i]?.[y-i]?.piece?.side === 'BLACK') trackDone.push('UP_LEFT');
      if (mainBoard[x-i]?.[y+i]?.piece?.side === 'BLACK') trackDone.push('DOWN_RIGHT');
      if (mainBoard[x+i]?.[y-i]?.piece?.side === 'BLACK') trackDone.push('DOWN_LEFT');
      if (x + i < CHESS_BOARD_SIZE_X && y + i < CHESS_BOARD_SIZE_Y && !trackDone.includes('UP_RIGHT'))
        bishopPositions.push({ x: x + i, y: y + i });
      if (x - i >= 0 && y - i >= 0 && !trackDone.includes('UP_LEFT'))
        bishopPositions.push({ x: x - i, y: y - i });
      if (y + i < CHESS_BOARD_SIZE_Y && x - i >= 0 && !trackDone.includes('DOWN_RIGHT'))
        bishopPositions.push({ x: x - i, y: y + i });
      if (y - i >= 0 && x + i < CHESS_BOARD_SIZE_X && !trackDone.includes('DOWN_LEFT'))
        bishopPositions.push({ x: x + i, y: y - i });
      if (mainBoard[x+i]?.[y+i]?.piece?.side === 'WHITE') trackDone.push('UP_RIGHT');
      if (mainBoard[x-i]?.[y-i]?.piece?.side === 'WHITE') trackDone.push('UP_LEFT');
      if (mainBoard[x-i]?.[y+i]?.piece?.side === 'WHITE') trackDone.push('DOWN_RIGHT');
      if (mainBoard[x+i]?.[y-i]?.piece?.side === 'WHITE') trackDone.push('DOWN_LEFT');
    }
  }
  return bishopPositions;
}

const kingPossiblePosition = (mainBoard, x, y, column) => {
  const kingPositions = [];

}