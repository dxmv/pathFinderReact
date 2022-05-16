import React from "react";
import Links from "./Links";
import Main from "./Main";
import "./navstyle.css";

export default function Nav() {
	return (
		<nav className="entrance">
			<h1 id="header">Path Finder</h1>
			<Main />
			<Links />
		</nav>
	);
}
