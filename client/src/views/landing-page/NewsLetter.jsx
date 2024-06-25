import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { Input } from "antd";
import BlurShape from "../../components/BlurShape";
import MainButton from "../../components/Button";
import { SendOutlined } from "@ant-design/icons";

function Newsletter() {
  return (
    <Container>
      <span
        className="absolute -top-52 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-25"
        aria-hidden="true"
      >
        <BlurShape color="bg-green" />
      </span>
      <div
        id="newsletter"
        className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14 xl:gap-[4.5rem]"
      >
        <Text type="title" text="Subscribe to our newsletter." />
        <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg text-left">
            <Text
              type="subtitle"
              text="Stay updated with the latest sports news, events, and tips. Join our community and never miss out on exciting opportunities and updates!"
              color="text-gray-600"
            />
            <div className="mt-6 flex flex-col sm:flex-row gap-4 max-w-md gap-x-4">
              <Input
                placeholder="Enter your email address"
                enterButton="Search"
                size="large"
                style={{ borderRadius: "50px" }}
              />
              <MainButton text="subscribe" icon={<SendOutlined />} />
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 text-left">
            <div className="flex flex-col items-start ">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  className="h-10 w-10 bg-clip-text text-green"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-black">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-600">
                Stay updated with our curated selection of insightful articles
                on sports.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  className="h-10 w-10 bg-clip-text text-green"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-black">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-600">
                We guarantee no spam, only useful updates and insights to help
                you stay active and informed.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Container>
  );
}

export default Newsletter;
