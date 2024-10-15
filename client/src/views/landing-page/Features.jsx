import Text from "../../components/static/Text";
import Container from "../../components/static/Container";
import {
  UserOutlined,
  NodeIndexOutlined,
  FormOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Star from "../../components/static/Star";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Features({
  titleAnimation,
  listAnimationVariables,
  itemAnimationVariables,
}) {
  const featuresList = [
    {
      title: "Team Creation",
      description:
        "Easily form and manage sports teams, invite friends to join, and coordinate practice sessions and matches.",
      icon: (
        <UsergroupAddOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
      ),
    },
    {
      title: "Smart Matchmaking",
      description:
        "Automatically connect users with compatible sports partners based on their interests, city, and availability.",
      icon: (
        <NodeIndexOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
      ),
    },
    {
      title: "Personalized Profiles",
      description:
        "Users create profiles highlighting their sports interests and skills to connect with like-minded partners and teams.",
      icon: <UserOutlined style={{ fontSize: "20px", color: "#ffffff" }} />,
    },
    {
      title: "Blogging Platform",
      description:
        "Users can share sports experiences and insights through blogs while reading and commenting on others posts.",
      icon: <FormOutlined style={{ fontSize: "20px", color: "#ffffff" }} />,
    },
  ];
  const features = (
    <motion.ul
      initial="hidden"
      whileInView="show"
      variants={listAnimationVariables}
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16 lg:gap-x-48 mx-4 lg:mx-8 xl:mx-12"
    >
      {featuresList.map((feature, index) => {
        return (
          <motion.li
            key={index}
            variants={itemAnimationVariables()}
            className="relative pl-16 text-left"
          >
            <dt className="text-base font-semibold leading-7 text-gray-900 capitalize">
              <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan to-green ">
                {feature.icon}
              </div>
              {feature.title}
            </dt>
            <dd className="mt-2 text-base leading-7 text-gray-600">
              {feature.description}
            </dd>
          </motion.li>
        );
      })}
    </motion.ul>
  );
  return (
    <Container>
      <Star
        type="filled"
        color="#00e0b5"
        className="invisible lg:visible absolute top-0 xl:top-1/4 left-[20%] w-5 -rotate-45"
        delay="1.5s"
      />
      <Star
        type="filled"
        color="#31e528"
        className="invisible md:visible absolute top-[2%] right-[10%] w-4 rotate-12"
      />
      <div
        id="features"
        className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14"
      >
        <div className="mx-auto max-w-2xl ">
          <motion.div
            initial={titleAnimation.initial}
            whileInView={titleAnimation.whileInView}
            transition={titleAnimation.transition}
            viewport={{ once: true }}
          >
            <Text
              type="title"
              text="your ultimate sports toolkit"
              className="mb-6"
            />
            <Text
              type="subtitle"
              text="Uncover the capabilities that make our platform unique and effective in connecting athletes seamlessly."
              color="text-gray-600"
            />
          </motion.div>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-none">{features}</div>
      </div>
    </Container>
  );
}

Features.propTypes = {
  titleAnimation: PropTypes.object.isRequired,
  listAnimationVariables: PropTypes.object.isRequired,
  itemAnimationVariables: PropTypes.func.isRequired,
};
