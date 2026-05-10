import type { SquareValue } from "../utils/gameLogic.ts";

type SquareProps = {
	index: number;
	value: SquareValue;
};

export default function Square({ index, value }: SquareProps) {
	const squareClass = `square ${value === "X" ? "x-square" : value === "O" ? "o-square" : ""}`;
	return (
		<button type="button" data-index={index} className={squareClass}>
			{value}
		</button>
	);
}
