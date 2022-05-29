import {
	IAlgorithmAction,
	Algorithms,
	Speed,
	ISpeedAction,
	IGridAction,
	GridSize,
	IMazeAction,
	Mazes,
} from "./filterTypes";

const CHANGE_ALG = (algorithm: unknown): IAlgorithmAction => {
	return {
		type: "CHANGE_ALG",
		payload: algorithm as Algorithms,
	};
};

const CHANGE_SPEED = (speed: unknown): ISpeedAction => {
	speed = speed as Speed;
	return {
		type: "CHANGE_SPEED",
		payload: speed === "Slow" ? 50 : speed === "Normal" ? 25 : 10,
	};
};

const CHANGE_SIZE = (size: unknown): IGridAction => {
	size = size as GridSize;
	return {
		type: "CHANGE_SIZE",
		payload:
			size === "Large"
				? { width: 60, height: 30 }
				: size === "Medium"
				? { width: 50, height: 25 }
				: { width: 30, height: 15 },
	};
};

const CHANGE_MAZE = (maze: unknown): IMazeAction => {
	let payload = maze as Mazes;
	return {
		type: "CHANGE_MAZE",
		payload: payload,
	};
};

export { CHANGE_ALG, CHANGE_SPEED, CHANGE_SIZE, CHANGE_MAZE };
