import { Outlet } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";

export const AdminLayout = () => {
	return (
		<>
			<AdminHeader />

			<main
				style={{
					padding: "2rem",
				}}
			>
				<Outlet />
			</main>
		</>
	);
};