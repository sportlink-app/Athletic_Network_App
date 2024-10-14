import Text from "../../components/static/Text";
import Container from "../../components/static/Container";
import BlurShape from "../../components/static/BlurShape";
import {
  UserOutlined,
  NodeIndexOutlined,
  FormOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Star from "../../components/static/Star";

function Features() {
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
    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16 lg:gap-x-48 mx-4 lg:mx-8 xl:mx-12">
      {featuresList.map((feature) => (
        <div key={feature.title} className="relative pl-16 text-left">
          <dt className="text-base font-semibold leading-7 text-gray-900 capitalize">
            <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan to-green ">
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
    <Container className=" bg-gradient-to-b from-light-green to-white">
      <span
        className="absolute top-6 -left-1/2 -translate-x-1/2 transform-gpu blur-3xl sm:ml-16 sm:translate-x-0 sm:transform-gpu opacity-10"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <span
        className="absolute -top-52 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-15"
        aria-hidden="true"
      >
        <BlurShape color="bg-green" />
      </span>
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
        </div>
        <section className="mx-auto max-w-2xl lg:max-w-none">
          {features}
        </section>
      </div>
    </Container>
  );
}

export default Features;
