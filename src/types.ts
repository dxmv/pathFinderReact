export interface INode {
	isStart: boolean;
	isFinish: boolean;
	isPath: boolean;
	isChecked: boolean;
	isWall: boolean;

	col: number;
	row: number;
}

export interface INotification {
	id: string;
	message: string;
}
