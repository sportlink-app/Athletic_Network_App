import Container from "./Container";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <Container className="bg-gradient-to-r from-cyan to-green flex justify-center items-center gap-8">
      <img src="/logo.svg" alt="" className="h-8 w-8" />
      <h3 className="text-white text-lg"> &copy; {year} all rights reserved</h3>
    </Container>
  );
}

export default Footer;
