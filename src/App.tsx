import "./App.css";
import { useRef, useState } from "react";
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
	const [soundEnabled, setSoundEnabled] = useState(true);
	const audioContextRef = useRef<AudioContext | null>(null);
	const draw = isDraw(board);
	const gameStateClass = winner ? "state-win" : draw ? "state-draw" : "state-playing";

	function getAudioContext(): AudioContext | null {
		if (!soundEnabled) return null;

		if (!audioContextRef.current) {
			const AudioContextClass =
				window.AudioContext ||
				(window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

			if (!AudioContextClass) return null;
			audioContextRef.current = new AudioContextClass();
		}

		if (audioContextRef.current.state === "suspended") {
			void audioContextRef.current.resume();
		}

		return audioContextRef.current;
	}

	function playTone(
		frequency: number,
		duration: number,
		type: OscillatorType = "sine",
		volume = 0.05,
		delay = 0,
	) {
		const ctx = getAudioContext();
		if (!ctx) return;

		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		const start = ctx.currentTime + delay;
		const end = start + duration;

		osc.type = type;
		osc.frequency.setValueAtTime(frequency, start);

		gain.gain.setValueAtTime(0.0001, start);
		gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
		gain.gain.exponentialRampToValueAtTime(0.0001, end);

		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start(start);
		osc.stop(end + 0.01);
	}

	function playMoveSound(player: Player) {
		if (player === "X") {
			playTone(520, 0.08, "triangle", 0.035);
			playTone(700, 0.07, "triangle", 0.03, 0.06);
			return;
		}

		playTone(380, 0.09, "sine", 0.03);
		playTone(300, 0.1, "sine", 0.026, 0.05);
	}

	function playWinSound(player: Player) {
		if (player === "X") {
			playTone(523.25, 0.11, "triangle", 0.04);
			playTone(659.25, 0.11, "triangle", 0.04, 0.1);
			playTone(783.99, 0.16, "triangle", 0.05, 0.2);
			return;
		}

		playTone(392, 0.11, "sine", 0.035);
		playTone(523.25, 0.11, "sine", 0.035, 0.1);
		playTone(659.25, 0.16, "sine", 0.045, 0.2);
	}

	function playDrawSound() {
		playTone(440, 0.1, "square", 0.018);
		playTone(392, 0.1, "square", 0.016, 0.1);
		playTone(349.23, 0.15, "square", 0.014, 0.2);
	}

	function playResetSound() {
		playTone(640, 0.06, "triangle", 0.02);
		playTone(480, 0.06, "triangle", 0.02, 0.05);
	}

	function handleSquareClick(index: number) {
		if (board[index] || winner) {
			// Ignore clicks on occupied squares or if there's already a winner
			return;
		}

		const newBoard = [...board];
		newBoard[index] = currentPlayer;
		setBoard(newBoard);
		playMoveSound(currentPlayer);

		const newWinner = calculateWinner(newBoard);
		if (newWinner) {
			setWinner(newWinner);
			playWinSound(newWinner);
			return;
		}

		if (isDraw(newBoard)) {
			playDrawSound();
			return;
		}

		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
	}

	return (
		<div className={`game-shell ${gameStateClass}`}>
			<h1 className="game-title">Tic Tac Toe</h1>
			<button
				type="button"
				className="sound-toggle"
				onClick={() => {
					setSoundEnabled((prev) => !prev);
				}}
			>
				{soundEnabled ? "Sound: On" : "Sound: Off"}
			</button>
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
					playResetSound();
				}}
			>
				Reset
			</ResetButton>
		</div>
	);
}

export default App;
