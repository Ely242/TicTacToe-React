import type { SquareValue } from "../utils/gameLogic.ts";
import Square from "./Square.tsx";

type BoardProps = {
	board: SquareValue[];
	onSquareClick: (index: number) => void;
};

export default function Board({ board, onSquareClick, ...rest }: BoardProps) {
	return (
		<div className="board" {...rest}>
			{board.map((value, index) => (
				<Square key={index} value={value} onClick={() => onSquareClick(index)} />
			))}
		</div>
	);
}