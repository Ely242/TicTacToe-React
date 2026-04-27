import type { SquareValue } from "../utils/gameLogic.ts";

type SquareProps = {
	value: SquareValue;
	onClick: () => void;
};

export default function Square({ value, onClick  }: SquareProps) {
    let squareClass = "square";
    if (value === "X") {
        squareClass += " x-square";
    }
    else if (value === "O") {
        squareClass += " o-square";
    }
	return <button onClick={onClick} className={squareClass}>{value}</button>;
}