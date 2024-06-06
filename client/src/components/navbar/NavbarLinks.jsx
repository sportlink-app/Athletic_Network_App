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
            href={`/${link}`}
            type="text"
            shape="round"
            className="text-lg md:text-base"
          />
        </li>
      ))}
    </ul>
  );
}

export default NavbarLinks;
