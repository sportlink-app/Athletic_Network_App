import { Avatar } from "antd";
import Container from "../../components/static/Container";
import Star from "../../components/static/Star";
import Tags from "../../components/static/Tags";
import Text from "../../components/static/Text";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Testimonials({
  titleAnimation,
  listAnimationVariables,
  itemAnimationVariables,
}) {
  const reviewsList = [
    {
      review:
        "Finding a football team is now a breeze! The app connects me with local players and makes weekend matches enjoyable.",
      name: "Seifeddine Aaza",
      src: "https://api.dicebear.com/9.x/micah/svg?seed=seifeddine%20aaza&hair=fonze&backgroundColor=d9f7be&mouth=smile&facialHairProbability=0",
      sports: ["Football"],
    },
    {
      review:
        "This app made finding tennis partners easy! I can join and create teams, and the community is super supportive.",
      name: "Salma Khaled",
      src: "https://api.dicebear.com/9.x/micah/svg?seed=salma%20khaled&hair=full&backgroundColor=f4ffb8&mouth=smirk&facialHairProbability=0",
      sports: ["Tennis"],
    },
    {
      review:
        "Finding a football team is now a breeze! The app connects me with local players and makes weekend matches enjoyable.",
      name: "Mohamed Mahla",
      src: "https://api.dicebear.com/9.x/micah/svg?seed=Mohamed%20Mahla&hair=fonze&backgroundColor=fff1b8&mouth=smile&facialHairProbability=0",
      sports: ["Basketball"],
    },
  ];

  const reviews = (
    <motion.ul
      initial="hidden"
      whileInView="show"
      variants={listAnimationVariables}
      viewport={{ once: true }}
      className="mx-auto grid items-start grid-cols-1 gap-8 lg:gap-10 lg:mx-0 lg:grid-cols-3 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none"
    >
      {reviewsList.map((review, index) => {
        const rotationDegree = index % 2 === 0 ? -2 : 2;

        return (
          <motion.li
            key={index}
            variants={itemAnimationVariables(rotationDegree)}
            className="flex flex-col items-start justify-between bg-white p-4 sm:p-6 rounded-2xl border-gray-200 border-[1px]"
          >
            <div className="relative flex items-center gap-x-4 text-left">
              <Avatar src={review.src} size={54} />

              <div className="text-base leading-6">
                <p className="font-semibold text-gray-900 capitalize">
                  {review.name}
                </p>
                <Tags
                  list={review.sports}
                  className="py-[.1rem] px-[.6rem] text-xs"
                />
              </div>
            </div>
            <div className="group relative">
              <p className="mt-5 text-left text-base leading-6 text-gray-600">
                {review.review}
              </p>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );

  return (
    <Container>
      <Star
        type="outlined"
        color="#00e0b5"
        className=" absolute top-0 lg:top-12 left-1/4 w-6 rotate-12"
      />
      <div
        id="testimonials"
        className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14"
      >
        <motion.div
          initial={titleAnimation.initial}
          whileInView={titleAnimation.whileInView}
          transition={titleAnimation.transition}
          viewport={{ once: true }}
        >
          <Text text="insights from our athletes" />
        </motion.div>
        {reviews}
      </div>
    </Container>
  );
}

Testimonials.propTypes = {
  titleAnimation: PropTypes.object.isRequired,
  listAnimationVariables: PropTypes.object.isRequired,
  itemAnimationVariables: PropTypes.func.isRequired,
};
