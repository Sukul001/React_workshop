import React from "react";
import Home from "./Home";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" bg-pink-100 h-screen">
      {/* Header */}
      <Header />
      {/* content */}
      <div>
        <Outlet/>
      </div>
      {/* Footer */}
      
    </div>
  );
};

export default Layout;
