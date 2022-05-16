import { FilterState, FilterActions } from "./filterTypes";

const initialState: FilterState = {
	algorithm: "None",
	speed: 0,
	size: { width: 50, height: 25 },
};

const filterReducer = (
	state = initialState,
	action: FilterActions
): FilterState => {
	switch (action.type) {
		case "CHANGE_ALG":
			return {
				...state,
				algorithm: action.payload,
			};
		case "CHANGE_SPEED":
			return {
				...state,
				speed: action.payload,
			};
		case "CHANGE_SIZE":
			return {
				...state,
				size: action.payload,
			};
		default:
			return state;
	}
};

export default filterReducer;
