import Container from "../../components/Container";
import Text from "../../components/Text";
import BlurShape from "../../components/BlurShape";
import MainButton from "../../components/Button";
import { Input } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

function Login() {
  return (
    <Container className="mt-12">
      <span className="absolute -top-24 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-25 md:opacity-30">
        <BlurShape color="bg-green" />
      </span>
      <span
        className="absolute top-0 -left-3/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-40"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <Text type="title" text="sign in to your account" />
      <div className="mt-10 lg:mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="flex flex-col gap-2 text-left"
          action="#"
          method="POST"
        >
          <label
            htmlFor="email"
            className="ml-2 font-medium leading-6 text-gray-900 capitalize"
          >
            email address
          </label>
          <Input
            placeholder="Enter your email address"
            size="large"
            style={{ borderRadius: "50px" }}
          />
          <label
            htmlFor="password"
            className="ml-2 font-medium leading-6 text-gray-900 capitalize"
          >
            password
          </label>
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            size="large"
            style={{ borderRadius: "50px" }}
          />
          <MainButton
            text="sign in"
            type="primary"
            shape="round"
            icon={<UserOutlined />}
            className="mx-auto mt-4"
          />{" "}
        </form>

        <p className="mt-10 text-center text-gray-500">
          Not a member?{" "}
          <a href="#" className="ml-2 font-semibold leading-6 text-green">
            Sign up here.
          </a>
        </p>
      </div>
    </Container>
  );
}

export default Login;
