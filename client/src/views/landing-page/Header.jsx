import Text from "../../components/static/Text";
import Star from "../../components/static/Star";
import { ArrowRightOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar, Button, Tag } from "antd";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import PropTypes from "prop-types";

function AnimatedStat({ value }) {
  const count = useMotionValue(1);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, parseInt(value), {
      duration: 4,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [count, value]);

  return <motion.div>{rounded}</motion.div>;
}
AnimatedStat.propTypes = {
  value: PropTypes.number,
};

export default function Header() {
  const colors = { cyan: "#00e0b5", green: "#31e528" };
  const basketballIcon = (color) => (
    <svg
      style={{ animationDelay: "5s" }}
      className="opacity-80 sm:opacity-100 absolute bottom-56 lg:bottom-52 left-[30%] lg:left-[35%] w-14 md:w-16 animate-bounce"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        d="M50,100a50,50,0,1,1,50-50A50.06,50.06,0,0,1,50,100ZM50,4.08A45.92,45.92,0,1,0,95.92,50,46,46,0,0,0,50,4.08Z"
        transform="translate(0 0)"
        fill={color}
      />
      <path
        d="M40.23,99.74A2.09,2.09,0,0,1,39,99.33C24.94,88.68,16.38,64.13,19.5,43.44,23.12,19.46,40.55,0,50,0a2,2,0,0,1,0,4.08c-5.89,0-22.84,15.93-26.47,40-2.87,19,5.18,42.36,17.93,52a2,2,0,0,1-1.23,3.66Z"
        transform="translate(0 0)"
        fill={color}
      />
      <path
        d="M21.94,58a16.31,16.31,0,0,1-11.63-4.42C3.08,46.75,2.7,34.3,4.51,29.26a2,2,0,1,1,3.83,1.38c-1.4,3.92-1,14.53,4.78,20,4.32,4.11,10.76,4.41,19.11.9,3.05-1.28,7.31-5.27,12.24-9.9C57.61,29.31,75.6,12.42,93.59,25.87a2,2,0,0,1-2.44,3.27C75.9,17.73,60,32.64,47.26,44.62c-5.22,4.9-9.72,9.13-13.45,10.69A30.75,30.75,0,0,1,21.94,58Z"
        transform="translate(0 0)"
        fill={color}
      />
      <path
        d="M33.93,70.09c-8.26,0-15.71-1.32-21.59-3.91C4.38,62.66,0,56.92,0,50a2,2,0,0,1,4.08,0c0,6.67,5.39,10.45,9.91,12.44,23.59,10.42,62.21-2.55,82.12-20.7a2,2,0,0,1,2.75,3C80.06,61.9,54.49,70.09,33.93,70.09Z"
        transform="translate(0 0)"
        fill={color}
      />
      <path
        d="M66.76,89.66c-11,0-20.6-4.81-31.77-10.39l-.44-.22c-5.45-2.72-10-3.38-13.41-2A9.78,9.78,0,0,0,16,82.42a2,2,0,0,1-3.87-1.27,13.71,13.71,0,0,1,7.36-7.8c4.6-1.93,10.28-1.24,16.86,2.05l.44.22C53.4,83.91,65.39,89.9,83.56,81.55a2,2,0,1,1,1.7,3.7A43.6,43.6,0,0,1,66.76,89.66Z"
        transform="translate(0 0)"
        fill={color}
      />
    </svg>
  );
  const bottleIcon = (color) => (
    <svg
      className="opacity-80 sm:opacity-100 absolute bottom-64 left-[10%] lg:left-[20%] w-6 blur-[1.2px] animate-bounce"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47.19 100"
    >
      <path
        d="M45.67,100h-37a1.52,1.52,0,0,1-1.52-1.52V35.11A11.69,11.69,0,0,1,18.83,23.44H35.52A11.69,11.69,0,0,1,47.19,35.11V98.48A1.52,1.52,0,0,1,45.67,100ZM10.2,97h34V35.11a8.64,8.64,0,0,0-8.63-8.63H18.83a8.64,8.64,0,0,0-8.63,8.63Z"
        fill={color}
      />
      <path
        d="M38,26.48H16.4a3.58,3.58,0,1,1,0-7.16H38a3.58,3.58,0,1,1,0,7.16ZM16.4,22.36a.54.54,0,0,0,0,1.08H38a.54.54,0,1,0,0-1.08Z"
        fill={color}
      />
      <path
        d="M42.05,22.36H12.3a1.52,1.52,0,0,1-1.52-1.52v-2.4A11.69,11.69,0,0,1,22.45,6.76H31.9A11.69,11.69,0,0,1,43.57,18.44v2.4A1.52,1.52,0,0,1,42.05,22.36Zm-28.23-3H40.54v-.88A8.66,8.66,0,0,0,31.9,9.8H22.45a8.65,8.65,0,0,0-8.63,8.64Z"
        fill={color}
      />
      <path
        d="M16.59,18.3a1.52,1.52,0,0,1-1.46-1.94,7.64,7.64,0,0,1,7.32-5.54,1.52,1.52,0,0,1,0,3,4.6,4.6,0,0,0-4.4,3.33A1.52,1.52,0,0,1,16.59,18.3Z"
        fill={color}
      />
      <path
        d="M30.88,9.8h-7.4A1.52,1.52,0,0,1,22,8.28V5.22a5.22,5.22,0,0,1,10.44,0V8.28A1.52,1.52,0,0,1,30.88,9.8ZM25,6.76h4.36V5.22a2.18,2.18,0,1,0-4.36,0Z"
        fill={color}
      />
      <path
        d="M18.1,26.48H8.84a8.85,8.85,0,0,1,0-17.69h7.53a1.52,1.52,0,0,1,0,3H8.84a5.81,5.81,0,0,0,0,11.61H18.1a1.52,1.52,0,0,1,0,3Z"
        fill={color}
      />
      <path
        d="M45.67,39.48h-37a1.52,1.52,0,0,1,0-3h37a1.52,1.52,0,0,1,0,3Z"
        fill={color}
      />
      <path
        d="M45.67,84.9h-37a1.52,1.52,0,1,1,0-3h37a1.52,1.52,0,0,1,0,3Z"
        fill={color}
      />
      <path
        d="M33.2,52.77a5.37,5.37,0,0,1-4.1-2c-.73-.74-1.09-1.07-1.93-1.07s-1.2.33-1.93,1.07a5.22,5.22,0,0,1-8.19,0c-.73-.74-1.09-1.07-1.93-1.07a1.52,1.52,0,0,1,0-3,5.37,5.37,0,0,1,4.1,2c.73.74,1.09,1.07,1.92,1.07s1.2-.33,1.94-1.07a5.21,5.21,0,0,1,8.18,0c.74.74,1.1,1.07,1.94,1.07s1.2-.33,1.94-1.07a5.33,5.33,0,0,1,4.09-2,1.52,1.52,0,0,1,0,3c-.84,0-1.2.33-1.93,1.07A5.37,5.37,0,0,1,33.2,52.77Z"
        fill={color}
      />
      <path
        d="M33.2,60.58a5.4,5.4,0,0,1-4.1-2c-.73-.75-1.09-1.07-1.93-1.07s-1.2.32-1.93,1.07a5.24,5.24,0,0,1-8.19,0c-.73-.75-1.09-1.07-1.93-1.07a1.52,1.52,0,0,1,0-3,5.4,5.4,0,0,1,4.1,2c.73.74,1.09,1.07,1.92,1.07s1.2-.33,1.94-1.07a5.23,5.23,0,0,1,8.18,0c.74.74,1.1,1.07,1.94,1.07s1.2-.33,1.94-1.07a5.36,5.36,0,0,1,4.09-2,1.52,1.52,0,1,1,0,3c-.84,0-1.2.32-1.93,1.07A5.4,5.4,0,0,1,33.2,60.58Z"
        fill={color}
      />
      <path
        d="M33.2,68.39a5.4,5.4,0,0,1-4.1-2c-.73-.75-1.09-1.08-1.93-1.08s-1.2.33-1.93,1.08a5.24,5.24,0,0,1-8.19,0c-.73-.75-1.09-1.08-1.93-1.08a1.52,1.52,0,0,1,0-3,5.4,5.4,0,0,1,4.1,2c.73.74,1.09,1.07,1.92,1.07s1.2-.33,1.94-1.07a5.23,5.23,0,0,1,8.18,0c.74.74,1.1,1.07,1.94,1.07s1.2-.33,1.94-1.07a5.36,5.36,0,0,1,4.09-2,1.52,1.52,0,1,1,0,3c-.84,0-1.2.33-1.93,1.08A5.4,5.4,0,0,1,33.2,68.39Z"
        fill={color}
      />
    </svg>
  );
  const dumbellBallIcon = (color) => (
    <svg
      style={{ animationDelay: "1s" }}
      className="absolute bottom-64 right-[10%] lg:right-[20%] w-8 md:w-14  animate-bounce"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66.7 100"
    >
      <path
        d="M33.35,100a33.36,33.36,0,0,1-26-54.26,30.25,30.25,0,1,1,52,0,33.36,33.36,0,0,1-26,54.26ZM10.49,47a30.12,30.12,0,1,0,45.74,0,.94.94,0,0,1-.1-.1A1.62,1.62,0,0,1,56,45a27,27,0,1,0-45.28,0A1.61,1.61,0,0,1,10.49,47Z"
        fill={color}
      />
      <path
        d="M16.64,41.29a1.58,1.58,0,0,1-1.21-.56h0c-2.93-3.43-3.5-7-3.5-12,0-13.28,7.81-20.9,21.44-20.9,12.92,0,21.26,8,21.26,20.27,0,4.16-.41,8.89-3.44,12.54a1.63,1.63,0,0,1-2.09.34,30.16,30.16,0,0,0-31.47,0A1.6,1.6,0,0,1,16.64,41.29ZM33.35,11c-11.74,0-18.21,6.28-18.21,17.67,0,3.87.32,6.45,1.91,8.83a33.44,33.44,0,0,1,32.43-.09c1.33-2.17,1.9-5,1.9-9.37C51.38,17.57,44.47,11,33.35,11Z"
        fill={color}
      />
      <path d="M24.4,80.93H22.83v-26H20.46V53.35H24.4Z" fill={color} />
      <path
        d="M24.4,82.54H22.83a1.61,1.61,0,0,1-1.62-1.61V56.54h-.75a1.62,1.62,0,0,1-1.61-1.62V53.35a1.61,1.61,0,0,1,1.61-1.62H24.4A1.61,1.61,0,0,1,26,53.35V80.93A1.61,1.61,0,0,1,24.4,82.54Z"
        fill={color}
      />
      <path
        d="M30.79,61.42a8.5,8.5,0,0,1,.63-3.29,7.93,7.93,0,0,1,4.31-4.35,8.12,8.12,0,0,1,6.27,0,8.3,8.3,0,0,1,2.58,1.73,8.14,8.14,0,0,1,1.73,2.62,8.5,8.5,0,0,1,.63,3.29V72.85a8.5,8.5,0,0,1-.63,3.29,8.14,8.14,0,0,1-1.73,2.62A8.3,8.3,0,0,1,42,80.49a8.12,8.12,0,0,1-6.27,0,8,8,0,0,1-2.58-1.73,8.14,8.14,0,0,1-1.73-2.62,8.5,8.5,0,0,1-.63-3.29Zm14.57,0a7,7,0,0,0-.51-2.69,6.32,6.32,0,0,0-1.4-2.13,6.51,6.51,0,0,0-9.17,0,6.27,6.27,0,0,0-1.4,2.13,6.79,6.79,0,0,0-.52,2.69V72.85a6.88,6.88,0,0,0,.52,2.7,6.37,6.37,0,0,0,1.4,2.13,6.3,6.3,0,0,0,2.06,1.37,6.63,6.63,0,0,0,5,0,6.24,6.24,0,0,0,2.06-1.37,6.63,6.63,0,0,0,1.4-2.13,7.05,7.05,0,0,0,.51-2.7Z"
        fill={color}
      />
      <path
        d="M38.86,82.74A9.61,9.61,0,0,1,35.1,82a9.56,9.56,0,0,1-5.18-5.22,10.28,10.28,0,0,1-.75-3.91V61.42a10.31,10.31,0,0,1,.75-3.91,9.65,9.65,0,0,1,5.18-5.22,9.64,9.64,0,0,1,12.7,5.22,10,10,0,0,1,.76,3.91V72.85a10,10,0,0,1-.76,3.91,9.67,9.67,0,0,1-2.08,3.14,9.63,9.63,0,0,1-6.86,2.84Zm0-26.4a5,5,0,0,0-1.9.37,4.68,4.68,0,0,0-1.54,1,4.74,4.74,0,0,0-1.05,1.6A5.43,5.43,0,0,0,34,61.42V72.85a5.35,5.35,0,0,0,.39,2.08A4.73,4.73,0,0,0,37,77.56a5,5,0,0,0,3.8,0,4.67,4.67,0,0,0,1.55-1,4.84,4.84,0,0,0,1-1.6,5.43,5.43,0,0,0,.39-2.08V61.42a5.34,5.34,0,0,0-.39-2.07,4.78,4.78,0,0,0-1-1.61,4.72,4.72,0,0,0-1.55-1A5,5,0,0,0,38.86,56.34Z"
        fill={color}
      />
    </svg>
  );
  const dumbellIcon = (color) => (
    <svg
      style={{ animationDelay: "3s" }}
      className="sm:opacity-100 absolute bottom-56 md:bottom-60 lg:bottom-52 right-[30%] lg:right-[35%] w-[4.5rem]  blur-[1px] animate-bounce"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 53.83"
    >
      <path
        d="M30.19,53.83H17.79a5.26,5.26,0,0,1-5.25-5.25V35.75a1.22,1.22,0,0,1,2.44,0V48.58a2.81,2.81,0,0,0,2.81,2.81h12.4A2.82,2.82,0,0,0,33,48.58V5.25a2.82,2.82,0,0,0-2.82-2.81H17.79A2.81,2.81,0,0,0,15,5.25V16.86a1.22,1.22,0,1,1-2.44,0V5.25A5.26,5.26,0,0,1,17.79,0h12.4a5.26,5.26,0,0,1,5.26,5.25V48.58A5.26,5.26,0,0,1,30.19,53.83Z"
        fill={color}
      />
      <path
        d="M13.76,47.32H5.25A5.26,5.26,0,0,1,0,42.06V11.77A5.26,5.26,0,0,1,5.25,6.51h8.51a1.22,1.22,0,0,1,0,2.44H5.25a2.81,2.81,0,0,0-2.81,2.82V42.06a2.81,2.81,0,0,0,2.81,2.82h8.51a1.22,1.22,0,1,1,0,2.44Z"
        fill={color}
      />
      <path
        d="M82.21,53.83H69.8a5.26,5.26,0,0,1-5.25-5.25V5.25A5.26,5.26,0,0,1,69.8,0H82.21a5.26,5.26,0,0,1,5.25,5.25V16.86a1.22,1.22,0,0,1-2.44,0V5.25a2.81,2.81,0,0,0-2.81-2.81H69.8A2.81,2.81,0,0,0,67,5.25V48.58a2.81,2.81,0,0,0,2.81,2.81H82.21A2.81,2.81,0,0,0,85,48.58V35.75a1.22,1.22,0,0,1,2.44,0V48.58A5.26,5.26,0,0,1,82.21,53.83Z"
        fill={color}
      />
      <path
        d="M94.74,47.32h-8.5a1.22,1.22,0,0,1,0-2.44h8.5a2.82,2.82,0,0,0,2.82-2.82V11.77A2.82,2.82,0,0,0,94.74,9h-8.5a1.22,1.22,0,1,1,0-2.44h8.5A5.27,5.27,0,0,1,100,11.77V42.06A5.27,5.27,0,0,1,94.74,47.32Z"
        fill={color}
      />
      <path
        d="M65.77,21.29H34.23a1.22,1.22,0,0,1,0-2.44H65.77a1.22,1.22,0,0,1,0,2.44Z"
        fill={color}
      />
      <path
        d="M65.77,32.59H34.23a1.22,1.22,0,1,1,0-2.44H65.77a1.22,1.22,0,0,1,0,2.44Z"
        fill={color}
      />
    </svg>
  );
  const notificationIcon = (color) => (
    <svg
      className="w-4 xl:w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path
        d="M16 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1ZM19 24h-6a1 1 0 0 0-1 1v1a4 4 0 0 0 8 0v-1a1 1 0 0 0-1-1Z"
        fill={color}
      ></path>
      <path
        d="M28.45 24.11A6.21 6.21 0 0 1 25 18.53V15a9 9 0 0 0-18 0v3.53a6.21 6.21 0 0 1-3.45 5.58A1 1 0 0 0 4 26h24a1 1 0 0 0 .45-1.89Z"
        fill={color}
      ></path>
    </svg>
  );
  const sendIcon = (color) => (
    <svg
      className="w-4 xl:w-5"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
    >
      <path
        d="m21.5 11.1-17.9-9c-.9-.4-1.9.4-1.5 1.3l2.5 6.7L16 12 4.6 13.9l-2.5 6.7c-.3.9.6 1.7 1.5 1.2l17.9-9c.7-.3.7-1.3 0-1.7z"
        fill={color}
      ></path>
    </svg>
  );
  const hero = (
    <>
      <div className="relative mx-auto lg:mx-0 w-full text-center">
        <motion.div
          initial={{ opacity: 0.3, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut", duration: 1, delay: -0.2 }}
          viewport={{ once: true }}
        >
          <h1 className="text-[2.6rem] sm:text-7xl xl:text-[6rem] mb-6 whitespace-nowrap relative bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green rotate-[-.9deg] !leading-snug font-title px-1 text-shadow-effect">
            your team awaits
          </h1>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1, skewX: 0, skewY: 0, rotate: 0 }}
          initial={{ opacity: 0, scale: 0.5, skewX: -6, skewY: -1, rotate: -6 }}
          transition={{ ease: "easeInOut", duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="absolute -top-10 lg:top-20 xl:top-28 left-16 lg:left-32"
        >
          <Tag
            color="cyan"
            className="-skew-x-6 -skew-y-1 -rotate-6 text-xs xl:text-sm px-3 xl:px-4 py-1 rounded-full shadow-lg"
          >
            Join Now
          </Tag>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          transition={{ ease: "easeOut", duration: 0.9, delay: 0.7 }}
          viewport={{ once: true }}
          className="absolute -top-14 md:top-20 lg:-top-6 left-0 md:left-44 lg:left-24"
        >
          <div className="bg-light-cyan p-[.4rem] rounded-full -skew-x-6 -skew-y-6 shadow-lg blur-[1px] lg:blur-0">
            {notificationIcon(colors.cyan)}
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          transition={{ ease: "easeOut", duration: 0.9, delay: 0.9 }}
          viewport={{ once: true }}
          className="absolute -top-10 lg:-top-6 xl:top-28 right-[45%] sm:right-[40%] md:right-[35%]"
        >
          <div className="bg-[#c1ffbf] p-[.4rem] rounded-full skew-x-6 skew-y-6 shadow-lg blur-[1px]">
            {sendIcon(colors.green)}
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          transition={{ ease: "easeOut", duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute -top-16 md:-top-14 lg:-top-12 xl:-top-10 right-16 dm:right-32 xl:right-40"
        >
          <Avatar
            src="https://api.dicebear.com/9.x/micah/svg?seed=sportlink&hair=fonze&backgroundColor=a1ff9d&mouth=smile&facialHairProbability=0"
            size={52}
            className="skew-x-3 skew-y-3 shadow-lg border-[2px] border-white"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute -top-28 md:-top-20 lg:-top-14 left-40 sm:left-56 md:left-60"
        >
          <Avatar
            src="https://api.dicebear.com/9.x/micah/svg?seed=sportlink2&hair=dannyPhantom&backgroundColor=7effe5&mouth=smile&facialHairProbability=0"
            size={44}
            className=" -skew-x-3 -skew-y-6 shadow-lg border-[2px] border-white blur-[1px]"
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
      <div className="flex gap-4 sm:gap-6">
        <Link to="/how-it-works">
          <Button
            type="default"
            shape="round"
            size="large"
            icon={<QuestionCircleOutlined />}
            iconPosition="end"
            className="font-semibold !bg-transparent border-[1.3px] !border-cyan !text-cyan hover:!text-cyan hover:!bg-white hover:-translate-y-[.1rem] hover:!shadow-sm duration-500"
          >
            How It Works
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            className="!bg-gradient-to-r !from-cyan !to-green hover:brightness-105 hover:-translate-y-[.1rem] hover:!shadow-sm duration-500"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </>
  );

  const statsList = [
    { name: "Sports Categories", value: 50 },
    { name: "Teams Formed", value: 100 },
    { name: "Blogs Posted", value: 200 },
    { name: "Active Users", value: 300 },
  ];

  const stats = (
    <dl className="mt-32 grid gap-8 grid-cols-2 lg:grid-cols-4 text-center">
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
    <div className="relative isolate pt-28 pb-12 md:pb-16 lg:pb-20 flex overflow-hidden">
      <span className="absolute w-full h-4/5 top-0 left-0 bg-gradient-to-r from-cyan to-green"></span>

      <span
        className="absolute w-full h-full bottom-0 left-0 "
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(245 255 248), rgb(245 255 248 ), rgb(245 255 248), rgba(245 255 248 / 85%), rgb(245 255 248 / 0%))",
        }}
      ></span>

      {basketballIcon(colors.cyan)}
      {bottleIcon(colors.cyan)}
      {dumbellBallIcon(colors.green)}
      {dumbellIcon(colors.green)}

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
