import Text from "../../components/static/Text";
import BlurShape from "../../components/static/BlurShape";
import { ArrowRightOutlined } from "@ant-design/icons";
import Star from "../../components/static/Star";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Header() {
  const hero = (
    <>
      <div className="mx-auto max-w-2xl lg:mx-0 w-full text-center ">
        <h2
          style={{ wordSpacing: "-10px" }}
          className="text-[3.1rem] sm:text-6xl md:text-7xl lg:text-8xl !font-title bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green mb-6"
        >
          Your Team Awaits!
        </h2>
        <Text
          type="subtitle"
          text="Find your ideal sports partner and play together anytime, anywhere.
          Connect with athletes who match your skill level and interests."
          color="text-gray-600"
        />
      </div>
      <Link to="/account/sign-up">
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          className="!bg-gradient-to-r !from-cyan !to-green hover:brightness-105  duration-300"
        >
          Get Started
        </Button>
      </Link>
    </>
  );
  const statsList = [
    { name: "Sports Categories", value: "+50" },
    { name: "Active Users", value: "+300" },
    { name: "Partner Matches", value: "+100" },
    { name: "Service Cost", value: "Free" },
  ];
  const stats = (
    <dl className="mt-28 grid  gap-8 grid-cols-2 lg:grid-cols-4 text-center">
      {statsList.map((stat) => (
        <div key={stat.name} className="flex flex-col-reverse lg:gap-2">
          <dt className="text-base lg:text-lg leading-7 text-gray-500">
            {stat.name}
          </dt>
          <dd className="text-2xl lg:text-3xl font-bold leading-9 tracking-tight text-gray-600">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <div className="relative isolate pt-24 lg:pt-36 pb-12 md:pb-16 lg:pb-20 flex overflow-hidden ">
      <img
        // src="/images/header-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover md:object-center grayscale opacity-70"
      />
      <span
        className="absolute w-full h-full top-0 left-0 "
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff , #ffffffca, #ffffffea 90%, #f9fafb )",
        }}
      ></span>
      <span
        className="absolute -top-10 -left-1/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-15"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <span
        className="absolute -top-52 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-25"
        aria-hidden="true"
      >
        <BlurShape color="bg-green" />
      </span>

      <img
        src="/icons/bottle.svg"
        alt=""
        className="opacity-60 sm:opacity-100 absolute bottom-72 left-[10%] lg:left-[20%] w-6 md:w-7 rotate-12"
      />
      <img
        src="/icons/basketball.svg"
        alt=""
        className="opacity-60 sm:opacity-100 absolute bottom-60 lg:bottom-52 left-[30%] lg:left-[35%] w-14 md:w-16"
      />
      <img
        src="/icons/dumbbell.svg"
        alt=""
        className="opacity-60 sm:opacity-100 absolute bottom-60 md:bottom-64 lg:bottom-52 right-[30%] lg:right-[35%] w-16 -rotate-12"
      />
      <img
        src="/icons/dumbbell-ball.svg"
        alt=""
        className="opacity-60 sm:opacity-100 absolute bottom-72 lg:bottom-72 right-[10%] lg:right-[20%] w-10 md:w-14 rotate-12"
      />
      <Star
        type="filled"
        color="#31e528"
        className="opacity-70 absolute top-12 lg:top-20 right-[27%] w-6 -rotate-12"
      />
      <Star
        type="outlined"
        color="#00e0b5"
        className="opacity-50 sm:opacity-100 absolute top-6 lg:top-12 left-[15%] lg:left-[25%] w-8 lg:w-10 rotate-45"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center gap-8 z-10">
        {hero}
        {stats}
      </div>
    </div>
  );
}

export default Header;
