import React from "react";
import "./selectstyles.css";

export default function CustomSelect({
	values,
	defaultValue,
	currentValue,
	handleChange,
}: {
	values: string[];
	defaultValue: string;
	currentValue: string;
	handleChange: (val: string) => void;
}) {
	return (
		<select value={currentValue} onChange={e => handleChange(e.target.value)}>
			{values.map(val => (
				<option value={val} hidden={val === "None"} key={val}>
					{val}
				</option>
			))}
		</select>
	);
}
