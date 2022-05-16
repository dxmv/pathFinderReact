import { IAddNotification, IRemoveNotification } from "./notificationTypes";

export const ADD_NOTIFICATION = (
	id: string,
	message: string
): IAddNotification => {
	return {
		type: "ADD_NOTI",
		payload: {
			id: id,
			message,
		},
	};
};

export const REMOVE_NOTIFICATION = (id: string): IRemoveNotification => {
	return {
		type: "REMOVE_NOTI",
		payload: id,
	};
};
