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
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-[calc(100vh-59.19px)] relative flex justify-center items-center overflow-hidden">
      <span className="-z-10 absolute -top-24 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-25">
        <BlurShape color="bg-green" />
      </span>
      <span
        className="-z-10 absolute top-0 -left-2/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-15"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <Container>
        <Text text="sign in to your account" />
        <div className=" mt-12 lg:mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
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
              icon={<UserOutlined />}
              className="mx-auto mt-4"
            />{" "}
          </form>

          <div className="flex gap-2 mt-8 justify-center">
            <p className="text-center text-gray-500"> Not a member? </p>
            <Link
              to="/account/sign-up"
              className="ml-2 font-semibold leading-6 text-green"
            >
              Sign up here.
            </Link>
          </div>
        </div>
      </Container>{" "}
    </div>
  );
}

export default Login;
