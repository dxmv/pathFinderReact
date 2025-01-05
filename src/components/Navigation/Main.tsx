import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bfs from "../../algorithms/bfs";
import dijkstra from "../../algorithms/dijkstra";
import Select from "../CustomSelect/Select";
import { RootState } from "../../redux/store";
import { INode } from "../../types";
import * as filterActions from "../../redux/filterReducer/filterActions";
import addClass from "../../utils/addClass";
import gridActions from "../../redux/gridReducer/gridActions";
import dfs from "../../algorithms/dfs";
import addNotification from "../../utils/addNotification";
import { visualizeVisitedNodes } from "../../utils/visualizePaths";
import recursiveDivision from "../../maze algorithms/recursiveDivision";
import recursiveBacktracking from "../../maze algorithms/recursiveBacktracking";
import animateWalls from "../../utils/animateWalls";
import prim from "../../maze algorithms/prims";
import aStar from "../../algorithms/a-star";

export default function Main() {
	const grid: INode[][] = useSelector((state: RootState) => state.grid).board;
	const startCoords = useSelector((state: RootState) => state.grid.startCoords);
	const endCoords = useSelector((state: RootState) => state.grid.endCoords);
	const alg = useSelector((state: RootState) => state.filter.algorithm);
	const speed = useSelector((state: RootState) => state.filter.speed);
	const size = useSelector((state: RootState) => state.filter.size);
	const maze = useSelector((state: RootState) => state.filter.maze);
	const dispatch = useDispatch();

	const startAlgorithm = useCallback(async () => {
		try {
			if (alg === "None" || speed === 0) {
				throw new Error();
			} else if (alg === "Dijkstra's") {
				const { visited, path } = await dijkstra(
					{ x: startCoords.startRow, y: startCoords.startCol },
					{ x: endCoords.endRow, y: endCoords.endCol },
					grid
				);
				visualizeVisitedNodes(grid, visited, path, speed, dispatch);
			} else if (alg === "BFS") {
				const {visited,path	} = bfs(
					grid,
					startCoords.startRow,
					startCoords.startCol
				);
				visualizeVisitedNodes(grid, visited, path.reverse(), speed, dispatch);
			} else if (alg === "DFS") {
				const { visited, path } = dfs(
					grid,
					{ row: startCoords.startRow, col: startCoords.startCol },
					{ row: endCoords.endRow, col: endCoords.endCol }
				);
				visualizeVisitedNodes(grid, visited, path.reverse(), speed, dispatch);
			} else if (alg === "A*") {
				const { visited, path } = await aStar(
					{ x: startCoords.startRow, y: startCoords.startCol },
					{ x: endCoords.endRow, y: endCoords.endCol },
					grid
				);
				visualizeVisitedNodes(grid, visited, path.reverse(), speed, dispatch);
			}
		} catch (e: any) {
			addNotification(dispatch, "Select all parameters");
		}
	}, [alg, grid, speed, startCoords, endCoords]);

	useEffect(() => {
		dispatch(gridActions.initiateGrid(size.width, size.height));
	}, [size]);

	useEffect(() => {
		if (maze === "Recursive Backtracking") {
			recursiveBacktracking(Array.from(grid), dispatch);
			animateWalls(grid, speed === 0 ? 10 : speed);
			dispatch(gridActions.newGrid(grid));
		} else if (maze === "Prim's") {
			prim(Array.from(grid));
			animateWalls(grid, speed === 0 ? 10 : speed);
			dispatch(gridActions.newGrid(grid));
		}
	}, [maze]);

	return (
		<div id="filters">
			<Select
				defaultVal="No Maze"
				values={["No Maze", "Recursive Backtracking", "Prim's"]}
				reduxAction={filterActions.CHANGE_MAZE}
			/>
			<Select
				defaultVal="Speed"
				values={["Speed", "Slow", "Normal", "Fast"]}
				reduxAction={filterActions.CHANGE_SPEED}
			/>
			<button id="btn-start" onClick={startAlgorithm}>
				Visualize
			</button>
			<Select
				defaultVal="Algorithms"
				values={["Algorithms", "Dijkstra's", "BFS", "DFS", "A*"]}
				reduxAction={filterActions.CHANGE_ALG}
			/>
			<Select
				defaultVal="Medium"
				values={["Small", "Medium", "Large"]}
				reduxAction={filterActions.CHANGE_SIZE}
			/>
		</div>
	);
}
