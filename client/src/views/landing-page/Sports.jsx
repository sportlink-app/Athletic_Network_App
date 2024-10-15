import PropTypes from "prop-types"; // Import PropTypes
import Container from "../../components/static/Container";
import Tags from "../../components/static/Tags";
import useSports from "../../components/dynamic/SportsNames";
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

const Sports = () => {
  const sports = useSports(); // Fetch sports data

  return (
    <Container className=" bg-white mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.7, delay: 0.05 }}
        viewport={{ once: true }}
      >
        <Text type="title" text="dive into a world of sports" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.9, delay: 0.15 }}
        viewport={{ once: true }}
        className="w-[50rem] xl:w-[60rem] max-w-[90vw] flex flex-col flex-shrink-0 gap-y-4 overflow-hidden mx-auto relative after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-r after:from-white after:via-transparent after:to-white after:opacity-100"
      >
        {[...new Array(ROWS)].map((_, i) => (
          <InfiniteLoopSlider
            key={i}
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={i % 2}
          >
            <Tags
              list={shuffle(sports.map((sport) => sport.name)).slice(
                0,
                TAGS_PER_ROW
              )}
              className="px-4 py-1 text-base"
            />{" "}
          </InfiniteLoopSlider>
        ))}
      </motion.div>
    </Container>
  );
};

export default Sports;
