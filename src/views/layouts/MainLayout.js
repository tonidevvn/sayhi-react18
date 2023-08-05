import React from "react";
import BsNavbar from "../BsNavbar";
import Logo from "../../components/Logo";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="App">
      <header className="App-header">
        <BsNavbar />
      </header>
      <div className="App-body">
        <Outlet />
      </div>
      <div className="App-footer">
        <Logo />
      </div>
    </div>
  );
}

export default MainLayout;
