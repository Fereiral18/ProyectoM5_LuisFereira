import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminHeader";




export const AdminLayout = () => {
	return (
		<>
			<AdminSidebar/>

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