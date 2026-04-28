import type { SquareValue } from "../utils/gameLogic.ts";
import "../index.css";

type SquareProps = {
	value: SquareValue;
	onClick: () => void;
};

export default function Square({ value, onClick }: SquareProps) {
	const squareClass = `square ${value === "X" ? "x-square" : value === "O" ? "o-square" : ""}`;
	return (
		<button onClick={onClick} className={squareClass}>
			{value}
		</button>
	);
}
