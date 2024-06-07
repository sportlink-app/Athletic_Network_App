import Header from "./Header";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Discover from "./Discover";
import Newsletter from "./NewsLetter";
import Footer from "../../components/Footer";

import { FloatButton } from "antd";

function LandingPage() {
  return (
    <>
      <Header />
      <Discover />
      <Testimonials />
      <Features />
      <Newsletter />
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default LandingPage;
