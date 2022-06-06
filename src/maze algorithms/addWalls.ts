import { INode } from "../types";

const addWalls = (grid: INode[][]) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			grid[i][j].isWall = true;
		}
	}
};

export default addWalls;
