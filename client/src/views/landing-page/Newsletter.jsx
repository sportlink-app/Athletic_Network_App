import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { Input, Button, message, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import newsletterStore from "../../store/newsletterStore";
import Container from "../../components/static/Container";
import Text from "../../components/static/Text";
import Star from "../../components/static/Star";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Newsletter({
  titleAnimation,
  listAnimationVariables,
  itemAnimationVariables,
}) {
  // Zustand store state and actions
  const { email, setEmail, subscribe, emailError, isEmailValid } =
    newsletterStore();

  // Local component state for handling loading
  const [isLoading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  // Handle form submission
  const handleSubscribe = async () => {
    setLoading(true);

    try {
      await subscribe();
      messageApi.success("Subscribed successfully!"); // Success message
      setEmail(""); // Clear the email input after successful subscription
    } catch (error) {
      messageApi.error(error.message); // Display error message from catch
    } finally {
      setLoading(false);
    }
  };

  // Check if button should be disabled
  const isButtonDisabled = !email || !isEmailValid() || isLoading;

  return (
    <>
      {contextHolder}
      <Container>
        <Star
          type="filled"
          color="#31e528"
          className="invisible lg:visible absolute top-0 lg:top-1/4 right-[15%] w-5 rotate-12"
        />
        <div
          id="newsletter"
          className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14"
        >
          <motion.div
            initial={titleAnimation.initial}
            whileInView={titleAnimation.whileInView}
            transition={titleAnimation.transition}
            viewport={{ once: true }}
          >
            <Text type="title" text="Subscribe to our newsletter." />
          </motion.div>
          <motion.ul
            initial="hidden"
            whileInView="show"
            variants={listAnimationVariables}
            viewport={{ once: true }}
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
          >
            <motion.li
              variants={itemAnimationVariables()}
              className="max-w-xl lg:max-w-lg text-left"
            >
              <Text
                type="subtitle"
                text="Stay updated with the latest sports news, events, and tips. Join our community and never miss out on exciting opportunities and updates!"
                color="text-gray-600"
              />
              <div className="mt-6 flex flex-col sm:flex-row gap-4 max-w-md gap-x-4">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  size="middle"
                  style={{ borderRadius: "50px" }}
                />
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleSubscribe}
                  disabled={isButtonDisabled}
                  className="!bg-gradient-to-r !from-cyan !to-green hover:brightness-105 duration-300 disabled:!text-slate-100 w-fit"
                  icon={
                    isLoading ? (
                      <Spin size="small" className="white-spin" />
                    ) : (
                      <SendOutlined size={16} />
                    )
                  }
                  iconPosition="end"
                >
                  Subscribe
                </Button>
              </div>
              {emailError && (
                <p className="text-sm ml-2 mt-2 text-red-500">{emailError}</p>
              )}
            </motion.li>

            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 text-left">
              <motion.li
                variants={itemAnimationVariables()}
                className="flex flex-col items-start"
              >
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarDaysIcon
                    className="h-10 w-10 bg-clip-text text-green rotate-3"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-black">
                  Weekly articles
                </dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Stay updated with our curated selection of insightful articles
                  on sports.
                </dd>
              </motion.li>
              <motion.li
                variants={itemAnimationVariables()}
                className="flex flex-col items-start"
              >
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandRaisedIcon
                    className="h-10 w-10 bg-clip-text text-green -rotate-12"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-black">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  We guarantee no spam, only useful updates and insights to help
                  you stay active and informed.
                </dd>
              </motion.li>
            </dl>
          </motion.ul>
        </div>
      </Container>
    </>
  );
}

Newsletter.propTypes = {
  titleAnimation: PropTypes.object.isRequired,
  listAnimationVariables: PropTypes.object.isRequired,
  itemAnimationVariables: PropTypes.func.isRequired,
};
