import React from "react";
import { INode } from "../../types";

function Node({ node, id }: { node: INode; id: string }) {
	return (
		<div
			className={`node ${
				node.isPath ? "path" : node.isChecked ? "checked" : ""
			}`}
			id={id}
		></div>
	);
}

export default React.memo(Node);
