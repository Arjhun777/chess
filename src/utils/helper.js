import {
  CHESS_BOARD_SIZE_X,
  DEFAULT_POSITION,
  CHESS_PIECE_DESCRIPTION,
  CHESS_BOARD_SIZE_Y,
} from "../constants/global";

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
