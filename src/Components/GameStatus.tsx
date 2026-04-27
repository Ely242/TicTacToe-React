import type { Player } from "../utils/gameLogic.ts";

type GameStatusProps = {
	currentPlayer: Player;
	winner: Player | null;
	isDraw: boolean;
};

export default function GameStatus({ currentPlayer, winner, isDraw, ...rest }: GameStatusProps) {
	let status: string;
    let statusClass: string;

	if (winner) {
		status = `Player ${winner} wins!`;
        statusClass = "winner";
	} 
    else if (isDraw) {
		status = "It's a draw!";
        statusClass = "draw";
	} 
    else {
		status = `Player ${currentPlayer}'s turn`;
        statusClass = "current-player";
	}

	return <div className={`game-status ${statusClass}`} {...rest}>{status}</div>;
}