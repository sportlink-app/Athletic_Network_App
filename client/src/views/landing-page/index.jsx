import Header from "./Header";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Discover from "./Discover";
import Footer from "../../components/static/Footer";
import { FloatButton } from "antd";
import Newsletter from "./Newsletter";
import Sports from "./Sports";

function LandingPage() {
  return (
    <>
      <Header />
      <Discover />
      <Sports />
      <Testimonials />
      <Features />
      <Newsletter />
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default LandingPage;
