import "./notificationStyles.css";
import { ImNotification } from "react-icons/im";
import React from "react";

function Notification({ message, id }: { message: string; id: string }) {
	return (
		<div className="notification" id={id}>
			<ImNotification
				size={40}
				color="#14213d"
				style={{ marginRight: "10px" }}
			/>
			<p className="notification-message">{message}</p>
		</div>
	);
}

export default React.memo(Notification);
