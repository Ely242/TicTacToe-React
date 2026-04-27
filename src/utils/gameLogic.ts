export type Player = "X" | "O";
export type SquareValue = Player | null;

const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function isDraw(board: SquareValue[]): boolean {
	return board.every((square) => square !== null);
}

export function calculateWinner(board: SquareValue[]): Player | null {
	for (let i = 0; i < lines.length; i += 1) {
		const [a, b, c] = lines[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}
	return null;
}