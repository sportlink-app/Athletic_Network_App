import NavbarToggle from "./toggle/NavbarToggle";
import NavbarLinks from "./NavbarLinks";
import { UserOutlined } from "@ant-design/icons";
import MainButton from "../Button";
import mainStore from "../../store/mainStore";

function Navbar() {
  const { isNavbarOpen, closeNavbar } = mainStore();
  const mobileCustom = (
    <div
      className={`${
        isNavbarOpen ? "h-[calc(100vh-72px)] duration-500" : "h-0 duration-200"
      } absolute top-full bg-gradient-to-r from-cyan to-green left-0 w-full flex flex-col gap-14 items-center md:hidden overflow-hidden`}
    >
      <NavbarLinks
        links={["discover", "testimonials", "features", "pricing"]}
        className="mt-20"
      />
      <MainButton
        href="/auth"
        text="account"
        type="primary"
        shape="round"
        bgColor="light"
        icon={<UserOutlined />}
        className="md:hidden"
      />
    </div>
  );
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-cyan to-green">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5" onClick={closeNavbar}>
            <img className="h-9 w-auto" src="/logo.svg" alt="Logo" />
          </a>
        </div>
        <NavbarLinks
          links={["discover", "testimonials", "features", "newsletter"]}
          className="hidden md:flex"
        />
        <NavbarToggle />
        <MainButton
          href="/auth"
          text="account"
          type="primary"
          shape="round"
          bgColor="light"
          icon={<UserOutlined />}
          className="hidden md:block"
        />
      </nav>
      {mobileCustom}
    </header>
  );
}

export default Navbar;
