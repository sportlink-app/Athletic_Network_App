import Header from "./Header";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Discover from "./Discover";
import Footer from "../../components/static/Footer";
import { FloatButton } from "antd";
import Newsletter from "./Newsletter";
import Sports from "./Sports";

export default function LandingPage() {
  const titleAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { ease: "easeIn", duration: 0.7, delay: 0.05 },
  };
  const containerAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { ease: "easeIn", duration: 0.9, delay: 0.15 },
  };

  const listAnimationVariables = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  // Define the item variants
  const itemAnimationVariables = (rotationDegree) => ({
    hidden: { opacity: 0, y: 10, rotate: 0 },
    show: {
      opacity: 1,
      y: 0,
      rotate: rotationDegree,
      transition: {
        duration: 0.8,
      },
    },
  });

  return (
    <>
      <Header />
      <Discover />
      <Sports
        titleAnimation={titleAnimation}
        containerAnimation={containerAnimation}
      />
      <Testimonials
        titleAnimation={titleAnimation}
        listAnimationVariables={listAnimationVariables}
        itemAnimationVariables={itemAnimationVariables}
      />
      <Features
        titleAnimation={titleAnimation}
        listAnimationVariables={listAnimationVariables}
        itemAnimationVariables={itemAnimationVariables}
      />
      <Newsletter
        titleAnimation={titleAnimation}
        listAnimationVariables={listAnimationVariables}
        itemAnimationVariables={itemAnimationVariables}
      />
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}
