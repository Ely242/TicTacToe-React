import type { SquareValue } from "../utils/gameLogic.ts";
import Square from "./Square.tsx";
import type { MouseEvent } from "react";

type BoardProps = {
	board: SquareValue[];
	onSquareClick: (index: number) => void;
};

export default function Board({ board, onSquareClick }: BoardProps) {
	function handleBoardClick(event: MouseEvent<HTMLDivElement>) {
		const target = event.target as HTMLElement;
		const button = target.closest("button[data-index]");
		if (!button) return;

		const indexAttr = button.getAttribute("data-index");
		if (indexAttr === null) return;

		const index = Number(indexAttr);
		if (Number.isNaN(index)) return;

		onSquareClick(index);
	}

	return (
		<div className="board" onClick={handleBoardClick}>
			{board.map((value, index) => (
				<Square key={index} index={index} value={value} />
			))}
		</div>
	);
}