import PropTypes from "prop-types";
import MainButton from "../../components/Button";

function NavbarLinks(props) {
  return (
    <ul
      className={`flex gap-10 md:gap-4 items-center flex-col md:flex-row ${props.className}`}
    >
      {props.links.map((link) => (
        <li key={link}>
          <MainButton
            text={link}
            href={props.scroll ? `#${link}` : `/${link}`}
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
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  scroll: PropTypes.bool,
  className: PropTypes.string,
};

export default NavbarLinks;
