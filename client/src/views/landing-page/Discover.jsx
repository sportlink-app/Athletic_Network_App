import Container from "../../components/static/Container";
import Star from "../../components/static/Star";
import { motion } from "framer-motion";

function Discover() {
  return (
    <Container className="grid place-items-center">
      <Star
        type="filled"
        color="#00E0B5"
        className="opacity-0 md:opacity-70 absolute top-1/4 left-[5%] xl:left-[10%] w-6 rotate-45"
        delay="1.5s"
      />
      <Star
        type="outlined"
        color="#00E0B5"
        className="invisible xl:visible absolute bottom-8 left-[40%] w-6 rotate-12"
        delay="3s"
      />
      <Star
        type="filled"
        color="#31E528"
        className="opacity-0 md:opacity-80 absolute top-2/4 right-[10%] w-6 -rotate-12 "
      />

      <motion.div
        initial={{ opacity: 0.5, scale: 0.95, rotate: 0 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.05 }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once: true }}
        id="discover"
        className="mx-2 bg-gradient-to-r from-cyan to-green max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[52rem] rounded-3xl shadow-xl ring-1 ring-gray-200 p-10 md:p-12 lg:p-14 xl:p-16 text-center text-white overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
            Building Teams, Connecting Players, Sharing Stories
          </h2>
          <p className="mt-6 text-lg leading-6">
            Join a community of athletes, form teams, and compete in your
            favorite sports. Find partners based on your skill level, create or
            join teams, and share your experiences. Play anytime, anywhere, and
            engage with a growing sports community.
          </p>
        </div>
      </motion.div>
    </Container>
  );
}

export default Discover;
