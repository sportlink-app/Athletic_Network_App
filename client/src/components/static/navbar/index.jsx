import PropTypes from "prop-types";
import NavbarToggle from "./toggle/NavbarToggle";
import NavbarLinks from "./NavbarLinks";
import mainStore from "../../../store/mainStore";

function Navbar({ startBtn, items, endBtn }) {
  const { isNavbarOpen } = mainStore();

  const mobileCustom = (
    <div
      className={`${
        isNavbarOpen ? "h-screen duration-500" : "h-0 duration-200"
      } absolute top-full bg-gradient-to-r from-cyan to-green left-0 w-full flex flex-col gap-14 items-center md:hidden overflow-hidden `}
    >
      <NavbarLinks links={items} className="mt-20" />
      <span className=" md:hidden">{endBtn}</span>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-cyan to-green">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-5 p-[.6rem] lg:px-8"
        aria-label="Global"
      >
        <div className="flex">{startBtn}</div>
        <NavbarLinks links={items} className="hidden md:flex" />
        <NavbarToggle />
        <span className="hidden md:block">{endBtn}</span>
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
