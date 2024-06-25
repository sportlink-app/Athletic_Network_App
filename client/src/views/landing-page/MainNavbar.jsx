import Navbar from "../../components/navbar";

function MainNavbar() {
  const links = [
    { title: "discover", id: "discover" },
    { title: "testimonials", id: "testimonials" },
    { title: "features", id: "features" },
    { title: "newsletter", id: "newsletter" },
  ];

  return <Navbar items={links} />;
}

export default MainNavbar;
