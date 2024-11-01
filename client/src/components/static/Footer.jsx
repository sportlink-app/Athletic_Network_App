import Container from "./Container";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const socialLinks = [
    {
      href: "https://github.com/seifaaza",
      icon: (
        <svg
          id="Layer_1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          fill="#ffffff"
        >
          <g>
            <path d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7C480,134.8,379.7,32,256,32z" />
          </g>
        </svg>
      ),
      label: "Github",
    },
    {
      href: "https://www.linkedin.com/in/seifeddine-aaza-6813b0248/",
      icon: (
        <svg
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
          }}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          height="26px"
          fill="#ffffff"
        >
          <path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm-80.037,399.871l0,-199.921l-66.464,0l0,199.921l66.464,0Zm239.62,0l0,-114.646c0,-61.409 -32.787,-89.976 -76.509,-89.976c-35.255,0 -51.047,19.389 -59.889,33.007l0,-28.306l-66.447,0c0.881,18.757 0,199.921 0,199.921l66.446,0l0,-111.65c0,-5.976 0.43,-11.95 2.191,-16.221c4.795,-11.935 15.737,-24.299 34.095,-24.299c24.034,0 33.663,18.34 33.663,45.204l0,106.966l66.45,0Zm-272.403,-296.321c-22.74,0 -37.597,14.95 -37.597,34.545c0,19.182 14.405,34.544 36.717,34.544l0.429,0c23.175,0 37.6,-15.362 37.6,-34.544c-0.43,-19.595 -14.424,-34.545 -37.149,-34.545Z" />
        </svg>
      ),
      label: "LinkedIn",
    },
    {
      href: "mailto:seifeddine.aaza@gmail.com",
      icon: (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 23.09 23.09"
          height="26px"
          fill="#ffffff"
        >
          <path
            d="M12,.45A11.55,11.55,0,1,0,23.54,12,11.55,11.55,0,0,0,12,.45ZM20,17A1.09,1.09,0,0,1,18.91,18H16.36V11.87L12,15.14,7.65,11.87V18H5.1A1.09,1.09,0,0,1,4,17V7.68a1.47,1.47,0,0,1,.37-1.13,1.59,1.59,0,0,1,2.24-.22l1,.81L12,10.4l4.35-3.23,1-.8A1.61,1.61,0,0,1,20,7.68Z"
            transform="translate(-0.46 -0.45)"
          />
        </svg>
      ),
      label: "Gmail",
    },
  ];

  return (
    <Container className="relative lg:mt-16 !pt-12 lg:!pt-24 bg-gradient-to-r from-cyan to-green flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-16 xl:gap-24">
      <div className="flex gap-4 items-center">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-white text-xl"
          >
            {link.icon}
          </a>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 order-first lg:order-none">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="text-white text-base lg:text-lg font-semibold">
          by Seifeddine AAZA
        </span>
      </div>

      <h3 className="text-white text-sm font-medium">
        &copy; {year} all rights reserved
      </h3>
    </Container>
  );
}

export default Footer;
