import { Link } from "react-router-dom";
import MainButton from "../../components/Button";
import Navbar from "../../components/navbar";

function MainNavbar() {
  const links = [
    { title: "discover", id: "discover" },
    { title: "testimonials", id: "testimonials" },
    { title: "features", id: "features" },
    { title: "newsletter", id: "newsletter" },
  ];

  const logo = (
    <Link to={"/"}>
      <img className="h-9 w-auto" src="/logo.svg" />
    </Link>
  );

  const account = (
    <MainButton
      href="/account"
      text="account"
      type="primary"
      shape="round"
      bgColor="light"
    />
  );
  return <Navbar startBtn={logo} items={links} endBtn={account} />;
}

export default MainNavbar;
