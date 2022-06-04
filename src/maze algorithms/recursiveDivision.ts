import gridActions from "../redux/gridReducer/gridActions";
import { INode } from "../types";

type Orientation = "Vertical" | "Horizontal";

const recursiveDivision = (grid: INode[][], dispatch: any) => {
	mainDivision(grid, "Vertical", 0, 0, grid[0].length, grid.length);
	dispatch(gridActions.newGrid(grid));
};

const mainDivision = (
	grid: INode[][],
	orientation: Orientation,
	x: number,
	y: number,
	width: number,
	height: number
) => {
	try {
		if (width <= 3 || height <= 3) {
			return;
		}
		if (orientation === "Vertical") {
			let j = Math.floor(width / 2);
			// let noWall = Math.floor(Math.random() * (height - 1));

			// Drawing the wall
			for (let i = 0 + x; i < height; i++) {
				grid[i + x][j + y].isWall = true;
			}
			// Going right
			mainDivision(grid, getOrientation(j, height), x, y + j, j, height);

			// Going left
			mainDivision(grid, getOrientation(j, height), x, y, j, height);
		} else {
			let i = Math.floor(height / 2);
			// let noWall = Math.floor(Math.random() * (width - 1));
			for (let j = 0 + y; j < width; j++) {
				grid[i + x][j + y].isWall = true;
			}
			// Going down
			mainDivision(grid, getOrientation(width, i), i + x, y, width, i);
			//Going up
			mainDivision(grid, getOrientation(width, i), x, y, width, i);
		}
	} catch (e) {
		console.log(e);
	}
};

const getOrientation = (width: number, height: number): Orientation => {
	if (width >= height) {
		return "Vertical";
	}
	return "Horizontal";
};

export default recursiveDivision;
