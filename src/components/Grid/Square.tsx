import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { INode } from "../../types";
import dragTypes from "../../utils/dragTypes";
import player from "../../utils/movePlayer";

export default function Square({
	children,
	x,
	y,
	size,
	rightBorder,
	bottomBorder,
}: {
	children: React.ReactChild;
	x: number;
	y: number;
	size: {
		width: number;
		height: number;
	};
	rightBorder: boolean;
	bottomBorder: boolean;
}) {
	const startCoords = useSelector((state: RootState) => state.grid.startCoords);
	const endCoords = useSelector((state: RootState) => state.grid.endCoords);
	const grid: INode[][] = useSelector((state: RootState) => state.grid).board;
	const dispatch = useDispatch();
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [dragTypes.START, dragTypes.END],
			drop: (item: any) => {
				if (item.id === "player") {
					player.movePlayer(
						x,
						y,
						startCoords.startRow,
						startCoords.startCol,
						grid,
						dispatch,
						"start"
					);
				} else if (item.id === "end") {
					player.movePlayer(
						x,
						y,
						endCoords.endRow,
						endCoords.endCol,
						grid,
						dispatch,
						"finish"
					);
				}
			},
			collect: monitor => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[grid]
	);

	return (
		<div
			ref={drop}
			style={{
				width: size.width,
				height: size.height,
				borderRight: rightBorder ? "1px solid black" : "",
				borderBottom: bottomBorder ? "1px solid black" : "",
				backgroundColor: isOver ? "yellow" : "",
			}}
		>
			{children}
		</div>
	);
}
