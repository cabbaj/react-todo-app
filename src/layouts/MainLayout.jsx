import Footer from "../components/Footer";
import NavBar from "../components/NavBar.jsx";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <div className="px-4 md:px-6 pt-12 pb-24 w-full xl:w-[45%] space-y-6">
          {/* Outlet is components between <Route></Route> in App.jsx */}
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer /> 
    </>
  );
};

export default MainLayout;
