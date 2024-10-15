import ProfileAvatar from "../../components/dynamic/Avatar";
import Container from "../../components/static/Container";
import Star from "../../components/static/Star";
import Tags from "../../components/static/Tags";
import Text from "../../components/static/Text";
import { motion } from "framer-motion";

function Testimonials() {
  const reviewsList = [
    {
      review:
        "Finding a football team is now a breeze! The app connects me with local players and makes weekend matches enjoyable.",
      name: "Seifeddine Aaza",
      gender: "male",
      sports: ["Football"],
    },
    {
      review:
        "This app made finding tennis partners easy! I can join and create teams, and the community is super supportive.",
      name: "Salma Khaled",
      gender: "female",
      sports: ["Tennis"],
    },
    {
      review:
        "Finding a football team is now a breeze! The app connects me with local players and makes weekend matches enjoyable.",
      name: "Mohamed Mahla",
      gender: "male",
      sports: ["Basketball"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Optional: Delay between children
      },
    },
  };

  const itemVariants = (index, rotationDegree) => ({
    hidden: { opacity: 0, y: 10, rotate: 0 },
    show: {
      opacity: 1,
      y: 0,
      rotate: rotationDegree,
      transition: {
        duration: 0.8,
        delay: index === 0 ? 0.15 : index === 1 ? 0.45 : 0.75,
      },
    },
  });

  const reviews = (
    <motion.ul
      initial="hidden"
      whileInView="show"
      variants={containerVariants}
      viewport={{ once: true }}
      className="mx-auto grid items-start grid-cols-1 gap-8 lg:gap-10 lg:mx-0 lg:grid-cols-3 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none"
    >
      {reviewsList.map((review, index) => {
        const rotationDegree = index % 2 === 0 ? -2 : 2;

        return (
          <motion.li
            key={index}
            variants={itemVariants(index, rotationDegree)}
            className="flex flex-col items-start justify-between bg-white p-4 sm:p-6 rounded-2xl border-gray-200 border-[1px]"
          >
            <div className="relative flex items-center gap-x-4 text-left">
              <ProfileAvatar
                username={review.name}
                gender={review.gender}
                size={54}
              />
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
    <Container className="bg-gradient-to-b from-white to-light-green">
      <Star
        type="outlined"
        color="#00e0b5"
        className=" absolute top-0 lg:top-12 left-1/4 w-6 rotate-12"
      />
      <div
        id="testimonials"
        className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14"
      >
        {/* Fade-in animation for title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.7, delay: 0.05 }}
          viewport={{ once: true }}
        >
          <Text text="insights from our athletes" />
        </motion.div>

        {/* Animated list of reviews */}
        {reviews}
      </div>
    </Container>
  );
}

export default Testimonials;
