import { v4 } from "uuid";
import {
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
} from "../redux/notificationsReducer/notificationActions";

const NOTIFICATION_LENGTH = 2000;

const addNotification = async (dispatch: any, message: string) => {
	const id = v4();
	await dispatch(ADD_NOTIFICATION(id, message));
	await setTimeout(async () => {
		document.getElementById(id)?.classList.add("notification-end");
	}, NOTIFICATION_LENGTH);
	await setTimeout(async () => {
		await dispatch(REMOVE_NOTIFICATION(id));
	}, NOTIFICATION_LENGTH + 500);
};

export default addNotification;
