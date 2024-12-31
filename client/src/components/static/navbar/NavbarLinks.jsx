import PropTypes from "prop-types";
import mainStore from "../../../store/mainStore";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";

function NavbarLinks({ links, className }) {
  const { closeNavbar } = mainStore();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    closeNavbar();
  };

  return (
    <ul
      className={`flex gap-10 md:gap-4 items-center flex-col md:flex-row ${className}`}
    >
      {links.map((link, index) => {
        const isActive = location.pathname.startsWith(link.href); // Check if pathname starts with link.href
        return (
          <li key={index}>
            <Link to={link.href || "/"}>
              <Button
                onClick={() => scrollToSection(link.id)}
                type="primary"
                shape="round"
                size="large"
                icon={link.icon}
                className={`${
                  isActive ? "!bg-black/5" : "!bg-transparent"
                } hover:!bg-white/20 duration-300 capitalize`}
              >
                {link.title}
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

NavbarLinks.propTypes = {
  links: PropTypes.array,
  className: PropTypes.string,
};

export default NavbarLinks;
