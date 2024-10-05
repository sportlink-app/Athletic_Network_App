import Header from "./Header";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Discover from "./Discover";
import Newsletter from "./Newsletter";
import Footer from "../../components/static/Footer";
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
