import React from "react";
import { useDrag } from "react-dnd";

import dragTypes from "../../utils/dragTypes";

export default function Start() {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: dragTypes.START,
		item: { id: "player" },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div className="node player" ref={drag}>
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="21.875px"
				height="21.875px"
				viewBox="0 0 21.875 21.875"
				enable-background="new 0 0 21.875 21.875"
			>
				<g id="Layer_4"></g>
				<g id="Layer_2">
					<g>
						<rect
							x="3.778"
							y="11.427"
							transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 28.6357 16.3531)"
							fill="#420863"
							width="14.306"
							height="5.361"
						/>

						<rect
							x="3.792"
							y="5.088"
							transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 13.1915 20.9994)"
							fill="#420863"
							width="14.305"
							height="5.361"
						/>
					</g>
				</g>
			</svg>
		</div>
	);
}
