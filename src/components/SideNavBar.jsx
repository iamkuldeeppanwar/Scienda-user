import "../styles/SideNavBar.css";

import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

import {
  DashboardIcon,
  MembershipIcon,
  MyAccountIcon,
  ProficiencyPercentageIcon,
  RechargeIcon,
  ReportsIcon,
  SpecialityModulesIcon,
  TestsIcon,
  TicketsIcon,
  LogoutIcon,
  BookLogo42,
  OpenMenuIcon,
} from "./icons/sidenavbar-icons";
import { useSelector } from "react-redux";

const menuBarOptions1 = [
  {
    url: "/menu",
    text: "Dashboard",
    icon: <DashboardIcon />,
    activeIcon: <DashboardIcon fillColor="white" />,
  },
  {
    url: "/menu/tests",
    text: "Tests",
    icon: <TestsIcon />,
    activeIcon: <TestsIcon fillColor="white" />,
  },
  {
    url: "/menu/recharge",
    text: "Recharge",
    icon: <RechargeIcon />,
    activeIcon: <RechargeIcon fillColor="white" />,
  },
  {
    url: "/menu/proficiency-percentage",
    text: "Proficiency Percentage",
    icon: <ProficiencyPercentageIcon />,
    activeIcon: <ProficiencyPercentageIcon fillColor="white" />,
  },
  {
    url: "/menu/speciality-modules",
    text: "Speciality Modules",
    icon: <SpecialityModulesIcon />,
    activeIcon: <SpecialityModulesIcon fillColor="white" />,
  },
  {
    url: "/menu/reports",
    text: "Reports",
    icon: <ReportsIcon />,
    activeIcon: <ReportsIcon fillColor="white" />,
  },
  {
    url: "/menu/membership",
    text: "Membership",
    icon: <MembershipIcon />,
    activeIcon: <MembershipIcon fillColor="white" />,
  },
  {
    url: "/menu/my-account",
    text: "My Account",
    icon: <MyAccountIcon />,
    activeIcon: <MyAccountIcon fillColor="white" />,
  },
];

const menuBarOptions2 = [
  {
    url: "/menu/tickets",
    text: "Tickets",
    icon: <TicketsIcon />,
    activeIcon: <TicketsIcon fillColor="white" />,
  },
];

export default function SideNavbar({
  isSidebarExpanded,
  setIsSidebarExpanded,
}) {
  const { user } = useSelector((state) => state.user);
  //   console.log("side", user);
  const location = useLocation();
  const pathname = location.pathname;

  // console.log("sidebar render");

  const isActiveLink = (url) => {
    if (url === "/menu") {
      if (pathname === "/menu" || pathname === "/menu/") {
        return true;
      }
      return false;
    }
    return pathname.includes(url);
  };

  const cls = `has-treeview ${
    isSidebarExpanded ? "menu-item" : "menu-item menu-item-NX"
  }`;

  return (
    <div
      className={
        isSidebarExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="w-100 d-flex flex-row justify-content-between align-items-center px-4">
        <div className={!isSidebarExpanded ? "d-none" : undefined}>
          <BookLogo42 />
        </div>
        <div
          className={!isSidebarExpanded ? "d-none" : undefined}
          style={{ cursor: "pointer" }}
          onClick={() => setIsSidebarExpanded((p) => !p)}
        >
          <RxCross2 style={{ color: "var(--primary-color)" }} size={25} />
        </div>
        <div
          className={isSidebarExpanded ? "d-none" : "w-100 text-center"}
          style={{ cursor: "pointer" }}
          onClick={() => setIsSidebarExpanded((p) => !p)}
        >
          <OpenMenuIcon />
        </div>
      </div>

      <hr />

      <div className="sidebar">
        <nav className="h-100 d-flex flex-column justify-content-between">
          <ul
            className="nav-pills nav-sidebar"
            data-widget="treeview"
            role="menu"
          >
            {menuBarOptions1.map(({ activeIcon, icon, text, url }) => (
              <li
                key={url}
                className={`${cls} ${
                  isActiveLink(url) ? "active-item" : undefined
                }`}
              >
                <Link to={url} className="nav-link">
                  {isActiveLink(url) && activeIcon}
                  {!isActiveLink(url) && icon}
                  <p className="ms-2">{text}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <ul
              className="nav-pills nav-sidebar"
              data-widget="treeview"
              role="menu"
            >
              {menuBarOptions2.map(({ activeIcon, icon, text, url }) => (
                <li
                  key={url}
                  className={`${cls} ${
                    isActiveLink(url) ? "active-item" : undefined
                  }`}
                >
                  <Link to={url} className="nav-link">
                    {isActiveLink(url) && activeIcon}
                    {!isActiveLink(url) && icon}
                    <p className="ms-2">{text}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="w-100" />
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div className={isSidebarExpanded ? "d-flex gap-2" : "d-none"}>
                <img
                  src={user && user.profile_url}
                  alt="profile"
                  height={40}
                  className="d-block user_profile"
                />
                <div>
                  <p className="profile-name">
                    {user && user.first_name} {user && user.last_name}
                  </p>
                  <p className="profile-email">{user && user.email}</p>
                </div>
              </div>

              <Link to="/" className={isSidebarExpanded ? "" : "w-100"}>
                <LogoutIcon />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
