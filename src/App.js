import { useState, useEffect } from "react";
import "./styles.css";
import Square from "./Square";
import { Patterns } from "./Patterns";

const App = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [Winner, setWinner] = useState("");
  useEffect(() => {
    const checkWin = () => {
      Patterns.forEach((currPattern) => {
        const firstPlayer = board[currPattern[0]];
        let foundWinningPattern = true;
        if (firstPlayer === "") return;
        currPattern.forEach((idx) => {
          if (board[idx] !== firstPlayer) {
            foundWinningPattern = false;
          }
        });
        if (foundWinningPattern) {
          if (player !== "") {
            setResult({ winner: player, state: "won" });
          } else {
            setResult({ winner: firstPlayer, state: "won" });
          }
        }
      });
    };

    const checkIfTie = () => {
      let filled = true;
      board.forEach((square) => {
        if (square === "") {
          filled = false;
        }
      });
      if (filled) {
        setResult({ winner: "No One", state: "Tie" });
      }
    };
    checkWin();
    checkIfTie();

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      setWinner("The Winner is: " + result.winner);
      setPlayer("");
    }
  }, [result]);

  const chooseSquare = (square) => {
    if (board[square] === "")
      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setWinner("");
  };
  return (
    <div>
      <h1 className="heading">Tic Tac Toe</h1>

      <h3 className="winner">{Winner}</h3>
      <div className="flexbox">
        <button className="reset" onClick={restartGame}>
          {" "}
          Restart{" "}
        </button>
      </div>

      <div className="App">
        <div className="board">
          <div className="row">
            <Square
              val={board[0]}
              chooseSquare={() => {
                chooseSquare(0);
              }}
            />
            <Square
              val={board[1]}
              chooseSquare={() => {
                chooseSquare(1);
              }}
            />
            <Square
              val={board[2]}
              chooseSquare={() => {
                chooseSquare(2);
              }}
            />
          </div>
          <div className="row">
            <Square
              val={board[3]}
              chooseSquare={() => {
                chooseSquare(3);
              }}
            />
            <Square
              val={board[4]}
              chooseSquare={() => {
                chooseSquare(4);
              }}
            />
            <Square
              val={board[5]}
              chooseSquare={() => {
                chooseSquare(5);
              }}
            />
          </div>
          <div className="row">
            <Square
              val={board[6]}
              chooseSquare={() => {
                chooseSquare(6);
              }}
            />
            <Square
              val={board[7]}
              chooseSquare={() => {
                chooseSquare(7);
              }}
            />
            <Square
              val={board[8]}
              chooseSquare={() => {
                chooseSquare(8);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
