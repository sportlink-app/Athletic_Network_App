import Text from "../../components/static/Text";
import BlurShape from "../../components/static/BlurShape";
import { ArrowRightOutlined } from "@ant-design/icons";
import Star from "../../components/static/Star";
import { Link } from "react-router-dom";
import { Button, Tag } from "antd";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import PropTypes from "prop-types";
import ProfileAvatar from "../../components/dynamic/Avatar";

function AnimatedStat({ value }) {
  const count = useMotionValue(1);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, parseInt(value), {
      duration: 5,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [count, value]);

  return <motion.div>{rounded}</motion.div>;
}
AnimatedStat.propTypes = {
  value: PropTypes.number,
};

function Header() {
  const hero = (
    <>
      <div className="relative mx-auto lg:mx-0 w-full text-center">
        <h1 className="text-[2.6rem] sm:text-7xl xl:text-[6rem] mb-6 whitespace-nowrap relative bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green rotate-[-.8deg] !leading-snug font-title px-1 text-shadow-effect">
          your team awaits
        </h1>
        <Tag
          color="cyan"
          className="absolute -top-10 lg:top-20 xl:top-28 left-16 lg:left-32 text-xs xl:text-sm px-3 xl:px-4 py-1 rounded-full h-fit capitalize -rotate-6"
        >
          join now
        </Tag>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ProfileAvatar
            username="sportlink"
            gender="male"
            size={52}
            className="absolute -top-16 md:-top-14 lg:-top-12 xl:-top-10 right-16 dm:right-32 skew-x-6 skew-y-6 shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <ProfileAvatar
            username="sportlink-2"
            gender="male"
            size={44}
            className="absolute -top-28 md:-top-20 lg:-top-14 left-40 sm:left-56 md:left-60 -skew-x-3 -skew-y-6 shadow-lg blur-[2px] "
          />
        </motion.div>
        <article className="max-w-2xl mx-auto">
          <Text
            type="subtitle"
            text="Connect with Athletes, Form Teams, and Play Anytime, Anywhere. Join, Compete, and Share Stories with Like-Minded Sports Enthusiasts."
            color="text-gray-600"
          />
        </article>
      </div>
      <Link to="/sign-up">
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          className="!bg-gradient-to-r !from-cyan !to-green hover:brightness-105 hover:-translate-y-[.1rem] duration-500"
        >
          Get Started
        </Button>
      </Link>
    </>
  );

  const statsList = [
    { name: "Sports Categories", value: 50 },
    { name: "Teams Formed", value: 100 },
    { name: "Blogs Posted", value: 200 },
    { name: "Active Users", value: 300 },
  ];

  const stats = (
    <dl className="mt-28 grid gap-8 grid-cols-2 lg:grid-cols-4 text-center">
      {statsList.map((stat) => (
        <div key={stat.name} className="flex flex-col-reverse lg:gap-2">
          <dt className="text-base lg:text-lg leading-7 text-gray-500">
            {stat.name}
          </dt>
          <dd className="text-2xl lg:text-3xl font-bold leading-9 tracking-tight text-gray-600 flex justify-center">
            +<AnimatedStat value={stat.value} />
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <div className="relative bg-gradient-to-b from-white to-light-green isolate pt-32 pb-12 md:pb-16 lg:pb-20 flex overflow-hidden">
      <span className="absolute w-full h-4/5 top-0 left-0 bg-gradient-to-r from-cyan to-green"></span>
      <img
        src="/background-waves.svg"
        className="absolute h-[90%] w-[130%] -top-60 sm:-top-52 lg:-top-32 left-0 opacity-80"
      />

      <span
        className="absolute w-full h-full bottom-0 left-0 "
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(255 255 255), rgb(255 255 255 ), rgb(255 255 255), rgba(255 255 255 / 85%), rgb(255 255 255 / 0%))",
        }}
      ></span>

      <span
        className="absolute top-4 lg:top-20 -left-1/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu "
        aria-hidden="true"
      >
        <BlurShape color="bg-white" />
      </span>
      <span
        className="absolute top-0 -left-1/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-25 2xl:hidden"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <span
        className="absolute -top-48 -right-1/2 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-30 2xl:hidden"
        aria-hidden="true"
      >
        <BlurShape color="bg-green" />
      </span>
      <span
        className="absolute top-10 right-1/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-30 2xl:hidden"
        aria-hidden="true"
      >
        <BlurShape color="bg-white" />
      </span>
      <span
        className="absolute top-10 right-1/2 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-30 2xl:hidden"
        aria-hidden="true"
      >
        <BlurShape color="bg-white" />
      </span>
      <img
        src="/icons/bottle.svg"
        alt=""
        className="opacity-80 sm:opacity-100 absolute bottom-72 left-[10%] lg:left-[20%] w-6  blur-[1.2px] animate-bounce"
      />
      <img
        src="/icons/basketball.svg"
        alt=""
        className="opacity-80 sm:opacity-100 absolute bottom-60 lg:bottom-52 left-[30%] lg:left-[35%] w-14 md:w-16 animate-bounce"
        style={{ animationDelay: "5s" }}
      />
      <img
        src="/icons/dumbbell.svg"
        alt=""
        className="sm:opacity-100 absolute bottom-60 md:bottom-64 lg:bottom-52 right-[30%] lg:right-[35%] w-[4.5rem]  blur-[1px] animate-bounce"
        style={{ animationDelay: "3s" }}
      />
      <img
        src="/icons/dumbbell-ball.svg"
        alt=""
        className="absolute bottom-72 lg:bottom-72 right-[10%] lg:right-[20%] w-8 md:w-14  animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <Star
        type="filled"
        color="#ffffff"
        className=" absolute top-8 lg:top-20 right-[27%] w-4 md:w-6 -rotate-12"
        delay="1.5s"
      />
      <Star
        type="outlined"
        color="#ffffff"
        className="absolute top-6 lg:top-12 left-[15%] lg:left-[25%] w-6 rotate-45"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center gap-8 z-10">
        {hero}
        {stats}
      </div>
    </div>
  );
}

export default Header;
