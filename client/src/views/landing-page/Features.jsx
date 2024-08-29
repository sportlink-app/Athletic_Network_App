import Text from "../../components/Text";
import Container from "../../components/Container";
import BlurShape from "../../components/BlurShape";
import {
  UserOutlined,
  NodeIndexOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Star from "../../components/Star";

function Features() {
  const featuresList = [
    {
      title: "smart matchmaking",
      description:
        "Our advanced algorithm connects you with sports partners who share your interests, skill level, ensuring a perfect match for every game.",
      icon: (
        <NodeIndexOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
      ),
    },
    {
      title: "real-time availability",
      description:
        "Check the availability of potential partners in real-time, and schedule your sports activities instantly.",
      icon: (
        <ThunderboltOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
      ),
    },
    {
      title: "comprehensive profiles",
      description:
        "View detailed profiles of potential partners, including their sports interests, experience level, and past reviews from other users",
      icon: <UserOutlined style={{ fontSize: "20px", color: "#ffffff" }} />,
    },
    {
      title: "enhanced security",
      description:
        "Our platform prioritizes your safety with verified profiles, secure communication channels, and user reporting features.",
      icon: <SafetyOutlined style={{ fontSize: "20px", color: "#ffffff" }} />,
    },
  ];
  const features = (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16 lg:gap-x-28">
      {featuresList.map((feature) => (
        <div key={feature.title} className="relative pl-16 text-left">
          <dt className="text-base font-semibold leading-7 text-gray-900 capitalize">
            <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-green to-cyan ">
              {feature.icon}
            </div>
            {feature.title}
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            {feature.description}
          </dd>
        </div>
      ))}
    </dl>
  );
  return (
    <Container>
      <span
        className="absolute top-6 -left-1/2 -translate-x-1/2 transform-gpu blur-3xl sm:ml-16 sm:translate-x-0 sm:transform-gpu opacity-15"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <span
        className="absolute -top-52 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-20"
        aria-hidden="true"
      >
        <BlurShape color="bg-green" />
      </span>
      <Star
        type="filled"
        color="#00e0b5"
        className=" absolute top-0 xl:top-1/4 left-[20%] w-5 -rotate-45"
      />
      <Star
        type="filled"
        color="#31e528"
        className=" absolute top-[2%] right-[10%] w-4 rotate-12"
      />
      <div
        id="features"
        className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14 xl:gap-[4.5rem]"
      >
        <div className="mx-auto max-w-2xl ">
          <Text type="title" text="explore our features" className="mb-6" />
          <Text
            type="subtitle"
            text="Uncover the capabilities that make our platform unique and effective in connecting athletes seamlessly."
            color="text-gray-600"
          />
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-none">{features}</div>
      </div>
    </Container>
  );
}

export default Features;
