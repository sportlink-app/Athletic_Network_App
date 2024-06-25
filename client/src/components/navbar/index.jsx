import { useEffect } from "react";
import PropTypes from "prop-types";
import NavbarToggle from "./toggle/NavbarToggle";
import NavbarLinks from "./NavbarLinks";
import MainButton from "../Button";
import mainStore from "../../store/mainStore";
import useScroll from "./UseScroll";
import authStore from "../../store/authStore";
import { Link } from "react-router-dom";
import ProfileAvatar from "../Avatar";

function Navbar({ items, navScroll }) {
  const { isNavbarOpen } = mainStore();
  const { isAuthenticated } = authStore();
  const endBtn = isAuthenticated ? "logout" : "account";
  const startBtns = {
    logo: (
      <Link to={"/"}>
        <img className="h-9 w-auto" src="/logo.svg" />
      </Link>
    ),
    profile: (
      <Link to={"/profile"}>
        <ProfileAvatar
          username="seifAaza 37"
          gender="male"
          size={40}
          className="bg-white"
        />
      </Link>
    ),
  };
  const startBtn = isAuthenticated ? startBtns.profile : startBtns.logo;
  useEffect(() => {
    isNavbarOpen
      ? document.documentElement.classList.add("overflow-hidden")
      : document.documentElement.classList.remove("overflow-hidden");
  }, [isNavbarOpen]);

  const { scrollDirection } = useScroll();

  const navbarDisplay = {
    show: "visible duration-500",
    hide: "invisible -translate-y-full duration-500",
  };
  const navScrollAnim =
    scrollDirection === "down" ? navbarDisplay.show : navbarDisplay.hide;

  const mobileCustom = (
    <div
      className={`${
        isNavbarOpen ? "h-[calc(100vh-68px)] duration-500" : "h-0 duration-200"
      } absolute top-full bg-gradient-to-r from-cyan to-green left-0 w-full flex flex-col gap-14 items-center md:hidden overflow-hidden `}
    >
      <NavbarLinks links={items} className="mt-20" />
      <MainButton
        href={endBtn}
        text={endBtn}
        type="primary"
        shape="round"
        bgColor="light"
        className="md:hidden"
      />
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 bg-gradient-to-r from-cyan to-green
      ${navScroll ? navScrollAnim : ""}
    `}
    >
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-5 p-4 md:p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">{startBtn}</div>
        <NavbarLinks links={items} className="hidden md:flex" />
        <NavbarToggle />
        <MainButton
          href={endBtn}
          text={endBtn}
          type="primary"
          shape="round"
          bgColor="light"
          className="hidden md:block"
        />
      </nav>
      {mobileCustom}
    </header>
  );
}

Navbar.propTypes = {
  items: PropTypes.array,
  startBtn: PropTypes.object,
  endBtn: PropTypes.string,
  navScroll: PropTypes.bool,
};

export default Navbar;
