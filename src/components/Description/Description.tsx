import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./descriptionStyles.css";

function Description() {
	const filters = useSelector((state: RootState) => state.filter);
	return (
		<div id="description">
			{filters.algorithm !== "None" && (
				<>
					Visualizing <span className="special">{filters.algorithm}</span> on a{" "}
					<span className="special">
						{filters.size.width === 50 && filters.size.height === 25
							? "medium"
							: filters.size.width === 60 && filters.size.height === 30
							? "large"
							: "small"}
					</span>{" "}
					size grid.
				</>
			)}
		</div>
	);
}

export default React.memo(Description);
