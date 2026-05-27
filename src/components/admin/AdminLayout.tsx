import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminHeader";

import "./style.css";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
};