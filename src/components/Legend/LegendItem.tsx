import React from "react";

function LegendItem({
	child,
	name,
}: {
	child: React.ReactChild;
	name: string;
}) {
	return (
		<div className="legend-item">
			{child}
			<p className="legend-item-name">{name}</p>
		</div>
	);
}

export default React.memo(LegendItem);
