import { INotification } from "../../types";

export interface INotificationState {
	notifications: INotification[];
}

export interface IAddNotification {
	type: "ADD_NOTI";
	payload: INotification;
}

export interface IRemoveNotification {
	type: "REMOVE_NOTI";
	payload: string;
}

export type Actions = IAddNotification | IRemoveNotification;
