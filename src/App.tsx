import React from "react";
import { useSelector } from "react-redux";
import Grid from "./components/Grid/Grid";
import Nav from "./components/Navigation/Nav";
import { RootState } from "./redux/store";
import Notification from "./components/Notification/Notification";
import Legend from "./components/Legend/Legend";

function App() {
	const notifications = useSelector(
		(state: RootState) => state.notification.notifications
	);

	return (
		<>
			<Nav />
			<Grid />
			<Legend />

			<div id="notifications">
				{notifications.slice(0, 4).map(n => (
					<Notification key={n.id} message={n.message} id={n.id} />
				))}
			</div>
		</>
	);
}

export default App;
