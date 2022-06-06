import gridActions from "../redux/gridReducer/gridActions";
import { INode } from "../types";

type Orientation = "Vertical" | "Horizontal";

const recursiveDivision = (grid: INode[][], dispatch: any) => {
	mainDivision(grid, "Vertical");
	dispatch(gridActions.newGrid(grid));
};

const mainDivision = (grid: INode[][], orientation: Orientation) => {
	try {
		if (grid[0].length <= 3 || grid.length <= 3) {
			return;
		}
		if (orientation === "Vertical") {
			let j = Math.floor(grid[0].length / 2);
			// let noWall = Math.floor(Math.random() * (height - 1));

			// Drawing the wall
			for (let i = grid[0][0].row; i < grid.length; i++) {
				grid[i][j].isWall = true;
			}
			// Going right
			const right: INode[][] = [];
			for (let i = grid[0][0].row; i < grid.length; i++) {
				right.push([]);
				for (let k = j; k < grid[0].length; k++) {
					right[i].push(grid[i][k]);
				}
			}
			mainDivision(right, getOrientation(j, grid.length));

			// Going left
			const left: INode[][] = [];
			for (let i = grid[0][0].row; i < grid.length; i++) {
				left.push([]);
				for (let k = 0; k < j; k++) {
					left[i].push(grid[i][k]);
				}
			}
			mainDivision(left, getOrientation(j, grid.length));
		} else {
			let i = Math.floor(grid.length / 2);
			for (let j = grid[0][0].col; j < grid[0].length; j++) {
				grid[i][j].isWall = true;
			}
			// Going up
			const up: INode[][] = [];
			for (let k = 0; k < i; k++) {
				up.push([]);
				for (let j = 0; j < grid[k].length; j++) {
					up[k].push(grid[k][j]);
				}
			}
			mainDivision(up, getOrientation(grid[0].length, i));
			//Going up
			const down: INode[][] = [];
			for (let k = i + 1, helper = 0; k < grid.length; k++, helper++) {
				down.push([]);
				for (let j = 0; j < grid[k].length; j++) {
					down[helper].push(grid[k][j]);
				}
			}
			mainDivision(down, getOrientation(grid[0].length, i));
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
