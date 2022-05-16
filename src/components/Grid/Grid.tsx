import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { INode } from "../../types";
import Node from "./Node";
import "../../style.css";
import Square from "./Square";
import Start from "./Start";
import End from "./End";

const GRID_ID = "grid";

export default function Grid() {
	const grid: INode[][] = useSelector((state: RootState) => state.grid.board);
	const size = useSelector((state: RootState) => state.filter.size);

	const nodeSize = useCallback((): { width: number; height: number } => {
		const el = document.getElementById(GRID_ID);
		if (el) {
			return {
				width: el.clientWidth / size.width,
				height: 750 / size.height,
			};
		}
		return { width: 0, height: 0 };
	}, [size]);

	return (
		<>
			<div id="grid">
				{grid.map((e, i) => (
					<div className="row" key={i}>
						{e.map((el, j) => (
							<Square
								x={i}
								y={j}
								key={`${i} ${j}`}
								size={nodeSize()}
								rightBorder={grid[0].length - 1 === j}
								bottomBorder={i === grid.length - 1}
							>
								{grid[i][j].isStart ? (
									<Start />
								) : grid[i][j].isFinish ? (
									<End />
								) : (
									<Node id={`${i} ${j}`} node={grid[i][j]} />
								)}
							</Square>
						))}
					</div>
				))}
			</div>
		</>
	);
}
