import "../styles/SideNavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userGetProfile } from "../pages/menu/MyAccount/apis/UserProfileAPIs";
import { toast } from "react-toastify";
import { getError } from "../Utils/error";
import { setUser } from "../features/userSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    getProfile(token);
  }, []);

  const getProfile = async () => {
    try {
      const response = await userGetProfile(token);
      if (response.success) {
        dispatch(setUser(response));
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

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

      <hr style={{ borderBottom: "1px solid var(--primary-color)" }} />

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
              <div
                className={
                  isSidebarExpanded
                    ? "d-flex align-items-center gap-2"
                    : "d-none"
                }
              >
                <img
                  src={
                    user &&
                    user?.profile_url &&
                    user?.profile_url ==
                      "https://tse4.mm.bing.net/th?id=OIP.eXWcaYbEtO2uuexHM8sAwwHaHa&pid=Api&P=0&h=180"
                      ? "https://tse4.mm.bing.net/th?id=OIP.eXWcaYbEtO2uuexHM8sAwwHaHa&pid=Api&P=0&h=180"
                      : `https://creative-story.s3.amazonaws.com${user?.profile_url}`
                  }
                  alt="profile"
                  height={40}
                  className="d-block user_profile"
                />
                <div>
                  <p className="profile-name">
                    {user && user.first_name} {user && user.last_name}
                  </p>
                  <p className="profile-email text-center text-10 font-medium text-truncate">
                    {user && user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className={
                  isSidebarExpanded ? "logout_btn" : "w-100 logout_btn"
                }
              >
                <LogoutIcon />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
