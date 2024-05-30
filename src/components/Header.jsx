import React from "react";
import { OpenMenuIcon } from "./icons/sidenavbar-icons";
import "./index.css";

const Header = () => {
  return (
    <div
      className="header"
      //   className={isSidebarExpanded ? "d-none" : "w-100 text-center"}
      style={{ cursor: "pointer" }}
      //   onClick={() => setIsSidebarExpanded((p) => !p)}
    >
      <OpenMenuIcon />
    </div>
  );
};

export default Header;
