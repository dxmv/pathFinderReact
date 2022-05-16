export type Algorithms = "Dijkstra's" | "BFS" | "DFS" | "None";
export type Speed = "Slow" | "Normal" | "Fast" | "None";
export type SpeedNumber = 50 | 25 | 10 | 0;
export type GridSize = "Small" | "Medium" | "Large";

export type Size = {
	width: number;
	height: number;
};

export interface FilterState {
	algorithm: Algorithms;
	speed: SpeedNumber;
	size: Size;
}

export type FilterActions = IAlgorithmAction | ISpeedAction | IGridAction;

export interface IAlgorithmAction {
	type: "CHANGE_ALG";
	payload: Algorithms;
}

export interface ISpeedAction {
	type: "CHANGE_SPEED";
	payload: SpeedNumber;
}

export interface IGridAction {
	type: "CHANGE_SIZE";
	payload: Size;
}
