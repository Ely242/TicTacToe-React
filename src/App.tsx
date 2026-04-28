import "./App.css";
import { useState } from "react";
import Board from "./Components/Board.tsx";
import GameStatus from "./Components/GameStatus.tsx";
import {
	calculateWinner,
	isDraw,
	type Player,
	type SquareValue,
} from "./utils/gameLogic.ts";
import ResetButton from "./Components/ResetButton.tsx";

function App() {
	const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
	const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
	const [winner, setWinner] = useState<Player | null>(null);
	const draw = isDraw(board);
	const gameStateClass = winner ? "state-win" : draw ? "state-draw" : "state-playing";

	function handleSquareClick(index: number) {
		if (board[index] || winner) {
			// Ignore clicks on occupied squares or if there's already a winner
			return;
		}

		const newBoard = [...board];
		newBoard[index] = currentPlayer;
		setBoard(newBoard);

		const newWinner = calculateWinner(newBoard);
		if (newWinner) {
			setWinner(newWinner);
			return;
		}

		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
	}

	return (
		<div className={`game-shell ${gameStateClass}`}>
			<h1 id="game-title">Tic Tac Toe</h1>
			<Board
				board={board}
				onSquareClick={handleSquareClick}
			/>
			<GameStatus
				currentPlayer={currentPlayer}
				winner={winner}
				isDraw={draw}
			/>
			<ResetButton
				onReset={() => {
					// we reset the board, player, and winner states
					setBoard(Array(9).fill(null));
					setCurrentPlayer("X");
					setWinner(null);
				}}
			>
				Reset
			</ResetButton>
		</div>
	);
}

export default App;
