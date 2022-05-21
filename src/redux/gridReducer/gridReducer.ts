import { INode } from "../../types";
import { ActionType, IGridState } from "./gridTypes";

const START_ROW = 0,
	START_COL = 0;
const END_ROW = 1,
	END_COL = 0;

const initialState: IGridState = {
	board: [],
	startCoords: {
		startCol: START_COL,
		startRow: START_ROW,
	},
	endCoords: {
		endCol: END_COL,
		endRow: END_ROW,
	},
};

const gridReducer = (state = initialState, action: ActionType): IGridState => {
	let arr: INode[][];
	switch (action.type) {
		case "CHANGE_POS":
			if (action.payload.nodeType === "start") {
				return {
					...state,
					startCoords: {
						startCol: action.payload.col,
						startRow: action.payload.row,
					},
				};
			}
			return {
				...state,
				endCoords: {
					endCol: action.payload.col,
					endRow: action.payload.row,
				},
			};
		case "RESET_GRID":
			arr = [...state.board];
			for (let i = 0; i < arr.length; i++) {
				for (let j = 0; j < arr[i].length; j++) {
					arr[i][j].isPath = false;
				}
			}
			return {
				...state,
				board: [...arr],
			};
		case "INIT_GRID":
			arr = [];
			for (let i = 0; i < action.payload.height; i++) {
				let currentRow: INode[] = [];
				for (let j = 0; j < action.payload.width; j++) {
					currentRow.push({
						isStart: i === START_ROW && j === START_COL,
						isFinish: i === END_ROW && j === END_COL,
						isPath: false,
						col: j,
						row: i,
						isChecked: false,
						isWall: false,
					});
				}
				arr.push(currentRow);
			}
			return { ...state, board: arr };
		case "NEW_GRID":
			return { ...state, board: action.payload };
		default:
			return { ...state };
	}
};

export default gridReducer;
