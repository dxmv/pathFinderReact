import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
	IAlgorithmAction,
	IGridAction,
	ISpeedAction,
} from "../../redux/filterReducer/filterTypes";
import CustomSelect from "./CustomSelect";

export default function CustomSelectManager({
	defaultVal,
	values,
	reduxAction,
}: {
	defaultVal: string;
	values: string[];
	reduxAction:
		| ((algorithm: unknown) => IAlgorithmAction)
		| ((speed: unknown) => ISpeedAction)
		| ((size: unknown) => IGridAction);
}) {
	const [current, setCurrent] = useState(defaultVal);
	const dispatch = useDispatch();

	const handleChange = useCallback(
		(val: unknown): void => {
			setCurrent(val as string);
			dispatch(reduxAction(val));
		},
		[dispatch, reduxAction]
	);

	return (
		<CustomSelect
			defaultValue={defaultVal}
			values={values}
			currentValue={current}
			handleChange={handleChange}
		/>
	);
}
