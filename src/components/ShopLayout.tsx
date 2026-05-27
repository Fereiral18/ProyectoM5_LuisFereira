import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const ShopLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};