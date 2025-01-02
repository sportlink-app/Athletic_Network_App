import PropTypes from "prop-types";
import Container from "../../components/static/Container";
import Tags from "../../components/static/Tags";
import Text from "../../components/static/Text";
import { motion } from "framer-motion";

const DURATION = 30000;
const ROWS = 4;
const TAGS_PER_ROW = 10;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  return (
    <div
      className="loop-slider"
      style={{
        "--duration": `${duration}ms`,
        "--direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  );
};

// Add prop validation for InfiniteLoopSlider
InfiniteLoopSlider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures that children are required and are valid React nodes
  duration: PropTypes.number.isRequired, // Ensures duration is a required number
  reverse: PropTypes.bool, // Ensures reverse is an optional boolean
};

export default function Sports({ titleAnimation, containerAnimation }) {
  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Baseball",
    "Swimming",
    "Volleyball",
    "Cricket",
    "Rugby",
    "Table Tennis",
    "Golf",
    "Handball",
    "Hockey",
    "Boxing",
    "Cycling",
    "Wrestling",
    "Gymnastics",
    "Surf",
    "Skiing",
    "Surfing",
    "Snowboarding",
    "Skateboarding",
    "Darts",
    "Fencing",
    "Bowling",
    "Archery",
    "Rowing",
    "Kickball",
    "Lacrosse",
    "Squash",
    "Polo",
    "BMX Racing",
    "Water Polo",
  ];

  return (
    <Container className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14">
      <motion.div
        initial={titleAnimation.initial}
        whileInView={titleAnimation.whileInView}
        transition={titleAnimation.transition}
        viewport={{ once: true }}
      >
        <Text type="title" text="dive into a world of sports" />
      </motion.div>
      <motion.div
        initial={containerAnimation.initial}
        whileInView={containerAnimation.whileInView}
        transition={containerAnimation.transition}
        viewport={{ once: true }}
        className="w-[50rem] xl:w-[60rem] max-w-[90vw] flex flex-col flex-shrink-0 gap-y-4 overflow-hidden mx-auto relative after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-r after:from-light-green after:via-transparent after:to-light-green after:opacity-100"
      >
        {[...new Array(ROWS)].map((_, i) => (
          <InfiniteLoopSlider
            key={i}
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={i % 2}
          >
            <Tags
              list={shuffle(sports).slice(0, TAGS_PER_ROW)} // Directly use the shuffled sports array
              className="px-4 py-1 text-base"
            />
          </InfiniteLoopSlider>
        ))}
      </motion.div>
    </Container>
  );
}

Sports.propTypes = {
  titleAnimation: PropTypes.object.isRequired,
  containerAnimation: PropTypes.object.isRequired,
};
