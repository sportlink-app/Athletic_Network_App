import Header from "./Header";
import Features from "./Features";
import Reviews from "./Reviews";
import Discover from "./Discover";
import Newsletter from "./NewsLetter";
import Footer from "../../components/Footer";

import { FloatButton } from "antd";

function LandingPage() {
  return (
    <>
      <Header />
      <Discover />
      <Reviews />
      <Features />
      <Newsletter />
      <Footer />
      <FloatButton.BackTop />
    </>
  );
}

export default LandingPage;
