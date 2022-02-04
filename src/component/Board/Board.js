import React, { useEffect, useState } from "react";
import { updateBoard, updatePlayer } from "../../redux/action/board";
import { useSelector } from "react-redux";
import { createBoard } from "../../utils/helper";
import "./Board.scss";
// import assets
import blackPawn from "../../assets/images/dark_pawn.png";
import whitePawn from "../../assets/images/white_pawn.png";
import blackKing from "../../assets/images/dark_king.png";
import whiteKing from "../../assets/images/white_king.png";
import blackQueen from "../../assets/images/dark_queen.png";
import whiteQueen from "../../assets/images/white_queen.png";
import blackRook from "../../assets/images/dark_rook.png";
import whiteRook from "../../assets/images/white_rook.png";
import blackBishop from "../../assets/images/dark_bishop.png";
import whiteBishop from "../../assets/images/white_bishop.png";
import blackKnight from "../../assets/images/dark_knight.png";
import whiteKnight from "../../assets/images/white_knight.png";

const getPiece = {
  BLACK_PAWN: blackPawn,
  WHITE_PAWN: whitePawn,
  BLACK_KING: blackKing,
  WHITE_KING: whiteKing,
  BLACK_QUEEN: blackQueen,
  WHITE_QUEEN: whiteQueen,
  BLACK_ROOK: blackRook,
  WHITE_ROOK: whiteRook,
  BLACK_BISHOP: blackBishop,
  WHITE_BISHOP: whiteBishop,
  BLACK_KNIGHT: blackKnight,
  WHITE_KNIGHT: whiteKnight,
};

const Board = () => {
  const [selectedTile, setSelectedTile] = useState({
    x: null,
    y: null,
		side: null,
  });
  const { mainBoard, currentPlayer } = useSelector((state) => {
    return {
      mainBoard: state.board.mainBoard,
      currentPlayer: state.board.currentPlayer,
    };
  });

  useEffect(() => {
    const boardWithPiece = createBoard();
    console.log(boardWithPiece);
    updateBoard(boardWithPiece);
  }, []);

	const checkIfNotSamePosition = (x, y) => (selectedTile.x !== x || selectedTile.y !== y);
	const checkIfNotSameSide = (x, y) => mainBoard[x][y]?.piece?.side !== mainBoard[selectedTile.x]?.[selectedTile.y]?.piece?.side;
	const checkIfTileHasPiece = () => mainBoard?.[selectedTile.x]?.[selectedTile.y]?.piece;
	const checkIsCorrectPlayer = () => currentPlayer === selectedTile.side;

	// x and y are new position to move the piece
  const handleTileClick = (x, y, column) => {
    if (checkIfNotSamePosition(x, y) && checkIfNotSameSide(x, y) && checkIfTileHasPiece() && checkIsCorrectPlayer()) {
      changePieceToNewPosition(x, y);
      removePieceFromCurrentPosition();
      updateBoard(mainBoard);
      setSelectedTile({ ...selectedTile, x: null, y: null, side: column.piece?.side });
			changePlayer();
    } else {
        setSelectedTile({ ...selectedTile, x, y, side: column.piece?.side });
    }
  };

	const changePlayer = () => {
		if (currentPlayer === 'WHITE') updatePlayer('BLACK');
		else updatePlayer('WHITE');
	}

  const changePieceToNewPosition = (x, y) => {
    const { piece } = mainBoard[selectedTile.x][selectedTile.y];
    const newTileData = { piece: { ...piece } };
    mainBoard[x][y] = { ...mainBoard[x][y], ...newTileData };
  }

	const removePieceFromCurrentPosition = () => {
		mainBoard[selectedTile.x][selectedTile.y].piece = null;
	}

  return (
    <div className="chess-board-wrapper">
      <div className="board-container">
        {/* Chess board container */}
        {mainBoard.length
          ? mainBoard.map((row, rIndex) => {
              // Chess Row
              return (
                <div className="row-wrap">
                  {row.map((column, cIndex) => {
                    // Chess Each Tile
                    return (
                      <div
                        className={`column-wrap ${column.tile} ${
                          rIndex === selectedTile.x && cIndex === selectedTile.y
                            ? "selected-tile"
                            : ""
                        }`}
                        onClick={() => handleTileClick(rIndex, cIndex, column)}
                      >
                        {column?.piece ? (
                          <img
                            className="piece-image"
                            src={
                              getPiece[`${column.piece?.side}_${column.piece?.name}`]
                            }
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Board;
