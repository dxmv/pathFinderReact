import { combineReducers, createStore } from "redux";
import gridReducer from "./gridReducer/gridReducer";
import filterReducer from "./filterReducer/filterReducer";
import notificationReducer from "./notificationsReducer/notificationReducer";
const reducers = combineReducers({
	grid: gridReducer,
	filter: filterReducer,
	notification: notificationReducer,
});
const store = createStore(reducers);
export default store;
export type RootState = ReturnType<typeof store.getState>;
