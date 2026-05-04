import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/general/Navbar";
import Footer from "./components/general/Footer";
import WarningBanner from "./components/general/WarningBanner";

function Layout({ children }) {

  return (
    <>
      <WarningBanner />
      <Navbar />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;