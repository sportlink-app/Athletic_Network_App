import PropTypes from "prop-types";
import mainStore from "../../../store/mainStore";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";

function NavbarLinks({ links, className }) {
  // Destructuring closeNavbar from the global store to trigger navbar closure
  const { closeNavbar } = mainStore();

  // Using the useLocation hook from react-router-dom to get the current route's location
  const location = useLocation();

  // Scroll function to smoothly scroll to the section with the given ID
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId); // Getting the element by ID
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Smooth scrolling effect
        block: "center", // Scroll to center of the element
      });
    }
    closeNavbar(); // Close the navbar after scrolling
  };

  return (
    <ul
      className={`flex gap-10 md:gap-4 items-center flex-col md:flex-row ${className}`}
    >
      {/* Mapping through the links to render each link as a button */}
      {links.map((link, index) => {
        // Checking if the current path starts with the link's href to set active state
        const isActive = location.pathname.startsWith(link.href);

        return (
          <li key={index}>
            {/* Link to navigate to the provided href */}
            <Link to={link.href || "/"}>
              {/* Button to scroll to a section if link has an id, otherwise it will navigate normally */}
              <Button
                onClick={() => scrollToSection(link.id)} // Trigger scrolling if an ID is provided
                type="primary"
                shape="round"
                size="large"
                icon={link.icon} // Display the icon for the link
                className={`${
                  isActive ? "!bg-black/5" : "!bg-transparent" // Apply active class if the link matches the current route
                } hover:!bg-white/20 duration-300 capitalize`}
              >
                {link.title} {/* Display the link's title */}
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// Defining prop types for validation
NavbarLinks.propTypes = {
  links: PropTypes.array, // Array of link objects with href, id, icon, and title
  className: PropTypes.string, // Optional additional className for styling
};

export default NavbarLinks;
