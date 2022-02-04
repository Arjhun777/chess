import React from "react";
import { useSelector } from "react-redux";
import Board from "../Board/Board";
import "./Home.scss";

const Home = () => {
  const { currentPlayer } = useSelector((state) => {
    return {
      currentPlayer: state.board.currentPlayer,
    };
  });
  return (
    <div className="home-container">
      <div className="player-status">
        Current Player to play - <span className="player-side">{currentPlayer}</span>
      </div>
      <Board />
    </div>
  );
};

export default Home;
