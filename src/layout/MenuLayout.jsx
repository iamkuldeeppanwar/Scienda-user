import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Stack from "react-bootstrap/Stack";

import SideNavbar from "../components/SideNavBar";
import { useSelector } from "react-redux";

const MenuLayout = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Stack
      className="align-items-start position-relative"
      direction="horizontal"
    >
      <section className="sticky-top">
        <SideNavbar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </section>
      <section
        className="w-100 page-outlet"
        style={{
          backgroundColor: isSidebarExpanded ? "#F3F4F6" : "#FCFCFD",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </section>
    </Stack>
  );
};

export default MenuLayout;
