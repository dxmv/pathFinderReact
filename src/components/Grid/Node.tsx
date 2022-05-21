import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import gridActions from "../../redux/gridReducer/gridActions";
import { RootState } from "../../redux/store";
import { INode } from "../../types";

function Node({
	node,
	id,
	draw,
	setDraw,
}: {
	node: INode;
	id: string;
	draw: boolean;
	setDraw: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dispatch = useDispatch();
	const grid = useSelector((state: RootState) => state.grid.board);
	const currentRef = useRef<HTMLDivElement>(null);

	const drawWall = useCallback(() => {
		if (currentRef.current) {
			if (currentRef.current.classList.contains("wall")) {
				currentRef.current.classList.remove("wall");
			} else {
				currentRef.current.classList.add("wall");
			}
		}
	}, []);

	const handleMouseDown = useCallback(async () => {
		await setDraw(true);
		node.isWall = !node.isWall;
		drawWall();
	}, [setDraw, node, drawWall]);

	const handleMouseOver = useCallback(async () => {
		if (draw) {
			node.isWall = !node.isWall;
			drawWall();
		}
	}, [node, draw, drawWall]);

	const handleMouseUp = useCallback(async () => {
		await setDraw(false);
		await dispatch(gridActions.newGrid(grid));
	}, [setDraw, dispatch, grid]);

	return (
		<div
			className={`node ${
				node.isPath
					? "path"
					: node.isChecked
					? "checked"
					: node.isWall
					? "wall"
					: ""
			}`}
			id={id}
			onMouseDown={handleMouseDown}
			onMouseOver={handleMouseOver}
			onMouseUp={handleMouseUp}
			ref={currentRef}
		></div>
	);
}

export default React.memo(Node);
