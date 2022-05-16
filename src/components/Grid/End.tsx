import React from "react";
import { useDrag } from "react-dnd";
import dragTypes from "../../utils/dragTypes";
import { FiTarget } from "react-icons/fi";

export default function End() {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: dragTypes.END,
		item: { id: "end" },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	return (
		<div className="node end" ref={drag}>
			<FiTarget size={32} />
		</div>
	);
}
