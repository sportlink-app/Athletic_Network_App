import PropTypes from "prop-types";
import MainButton from "../../components/Button";
import mainStore from "../../store/mainStore";

function NavbarLinks(props) {
  const { closeNavbar } = mainStore();
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
      className={`flex gap-10 md:gap-4 items-center flex-col md:flex-row ${props.className}`}
    >
      {props.links.map((link, index) => (
        <li key={index}>
          <MainButton
            text={link.title}
            href={link.href}
            icon={link.icon}
            onClick={() => scrollToSection(link.id)}
            type="text"
            shape="round"
            className="text-lg md:text-base"
          />
        </li>
      ))}
    </ul>
  );
}

NavbarLinks.propTypes = {
  links: PropTypes.array,
  className: PropTypes.string,
};

export default NavbarLinks;
