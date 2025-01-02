import PropTypes from "prop-types";
import NavbarToggle from "./NavbarToggle";
import NavbarLinks from "./NavbarLinks";
import mainStore from "../../../store/mainStore";
function Navbar({ startBtn, items, endBtn }) {
  // Destructuring the `isNavbarOpen` state from the global store to control the navbar open/close behavior
  const { isNavbarOpen } = mainStore();

  // Defining the mobile version of the navbar, which toggles visibility based on `isNavbarOpen`
  const mobileCustom = (
    <div
      className={`${
        isNavbarOpen ? "h-screen duration-500" : "h-0 duration-200" // Controls the height of the mobile navbar based on its open/close state
      } absolute top-full bg-gradient-to-r from-cyan to-green left-0 w-full flex flex-col gap-14 items-center md:hidden overflow-hidden `}
    >
      {/* Rendering the navigation links inside the mobile navbar */}
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
        {/* Rendering the start button (e.g., logo or other element on the left) */}
        <div className="flex">{startBtn}</div>

        {/* Rendering the navigation links for larger screens */}
        <NavbarLinks links={items} className="hidden md:flex" />

        {/* Rendering the navbar toggle button for mobile */}
        <NavbarToggle />

        {/* Rendering the end button (e.g., user profile or cart) for larger screens */}
        <span className="hidden md:block">{endBtn}</span>
      </nav>

      {/* Mobile-specific navbar rendering */}
      {mobileCustom}
    </header>
  );
}

// Defining prop types for validation
Navbar.propTypes = {
  items: PropTypes.array, // Array of items to be displayed in the navbar
  startBtn: PropTypes.object, // The start button (could be logo or other element)
  endBtn: PropTypes.object, // The end button (e.g., profile, cart)
  navScroll: PropTypes.bool, // Optional flag for enabling/disabling scroll-based navbar behavior
};

export default Navbar;
