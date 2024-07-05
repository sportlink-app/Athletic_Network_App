import Container from "../../components/Container";
import Text from "../../components/Text";
import BlurShape from "../../components/BlurShape";
import MainButton from "../../components/Button";
import { Input } from "antd";
import {
  UserAddOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <Container className="mt-12">
      <span className="-z-10 absolute -top-24 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-25">
        <BlurShape color="bg-green" />
      </span>
      <span
        className="-z-10 absolute top-0 -left-3/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-40"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <Text text="create a new account" />
      <div className="px-4 mt-10 lg:mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="flex flex-col gap-2 text-left"
          action="#"
          method="POST"
        >
          <label
            htmlFor="username"
            className="ml-2 font-medium leading-6 text-gray-900 capitalize"
          >
            username
          </label>
          <Input
            placeholder="Enter your username"
            size="large"
            style={{ borderRadius: "50px" }}
          />
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
            text="sign up"
            icon={<UserAddOutlined />}
            className="mx-auto mt-4"
          />{" "}
        </form>
        <div className="flex gap-4 mt-8 justify-center">
          <p className="text-center text-gray-500">Already have an account?</p>
          <Link
            to="/account/login"
            className="font-semibold leading-6 text-green"
          >
            Sign in here.
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
