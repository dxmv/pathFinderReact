import { INotificationState, Actions } from "./notificationTypes";

const initialState: INotificationState = {
	notifications: [],
};

const notificationReducer = (
	state = initialState,
	action: Actions
): INotificationState => {
	let arr, index;
	switch (action.type) {
		case "ADD_NOTI":
			arr = [...state.notifications];
			arr.push(action.payload);
			return {
				...state,
				notifications: arr,
			};
		case "REMOVE_NOTI":
			arr = [...state.notifications];
			index = arr.findIndex(el => el.id === action.payload);
			arr.splice(index, 1);
			return {
				...state,
				notifications: arr,
			};
		default:
			return state;
	}
};

export default notificationReducer;
