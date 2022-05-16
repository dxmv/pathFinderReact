import React from "react";
import { AiFillGithub } from "react-icons/ai";

function Links() {
	return (
		<div id="links">
			<a href="https://github.com/dxmv" target="_blank" rel="noreferrer">
				<AiFillGithub size={24} color={"#ffffff"} />
			</a>
		</div>
	);
}

export default React.memo(Links);
