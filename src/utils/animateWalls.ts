import { INode } from "../types";
import addClass from "./addClass";

const animateWalls = (grid: INode[][], speed: number): void => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j].isWall) {
				setTimeout(() => {
					addClass(`${grid[i][j].row} ${grid[i][j].col}`, "wall");
				}, speed * (i === 0 ? 1 : i) * (j === 0 ? 1 : j));
			}
		}
	}
};

export default animateWalls;
