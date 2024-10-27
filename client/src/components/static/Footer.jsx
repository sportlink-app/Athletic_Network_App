import { Link } from "react-router-dom";
import Container from "./Container";
import {
  GoogleOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Array of social media links
  const socialLinks = [
    {
      href: "https://github.com/seifaaza",
      icon: <GithubOutlined />,
      label: "Github",
    },
    {
      href: "https://www.linkedin.com/in/seifeddine-aaza-6813b0248/",
      icon: <LinkedinOutlined />,
      label: "LinkedIn",
    },
    {
      href: "mailto:seifeddine.aaza@gmail.com",
      icon: <GoogleOutlined />,
      label: "Gmail",
    },
  ];

  return (
    <Container className="relative !pt-12 lg:!pt-24 bg-gradient-to-r from-cyan to-green flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-16 xl:gap-24">
      <div className="flex gap-4 ">
        {socialLinks.map((link, index) => (
          <Link
            to={link.href}
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-white text-xl"
          >
            {link.icon}
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 order-first lg:order-none">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="text-white text-lg lg:text-xl font-semibold">
          by Seifeddine AAZA
        </span>
      </div>

      <h3 className="text-white text-sm font-medium ">
        &copy; {year} all rights reserved
      </h3>
    </Container>
  );
}

export default Footer;
