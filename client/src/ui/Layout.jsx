import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow mt-16 flex">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
