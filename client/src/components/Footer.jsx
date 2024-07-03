import Container from "./Container";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <Container className=" mt-10 md:mt-12 xl:mt-14 bg-gradient-to-r from-cyan to-green flex justify-center items-center gap-8 ">
      <img
        loading="lazy"
        src="/images/footer-bg.jpg"
        alt="Sport Partners"
        className="absolute w-full object-center object-cover opacity-10 grayscale z-0"
      />
      <img src="/logo.svg" alt="" className="h-8 w-8" />
      <h3 className="text-white text-lg"> &copy; {year} all rights reserved</h3>
    </Container>
  );
}

export default Footer;
