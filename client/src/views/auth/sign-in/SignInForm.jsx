import { Button, Input, Spin } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import authStore from "../../../store/authStore";

function SignInForm() {
  const { signInForm, handleSignInForm, isSignInFormComplete, isLoading } =
    authStore((state) => ({
      signInForm: state.signInForm,
      handleSignInForm: state.handleSignInForm,
      isSignInFormComplete: state.isSignInFormComplete(),
      isLoading: state.isLoading,
    }));

  return (
    <form className="flex flex-col gap-3 text-left" action="#" method="POST">
      <label
        htmlFor="email"
        className="ml-2 font-medium leading-6 text-gray-900 capitalize"
      >
        Email Address
      </label>
      <Input
        name="email"
        value={signInForm.email}
        onChange={handleSignInForm}
        placeholder="Enter your email address"
        size="large"
        style={{ borderRadius: "50px" }}
      />
      <label
        htmlFor="password"
        className="ml-2 font-medium leading-6 text-gray-900 capitalize"
      >
        Password
      </label>
      <Input.Password
        name="password"
        value={signInForm.password}
        onChange={handleSignInForm}
        placeholder="Enter your password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        size="large"
        style={{ borderRadius: "50px" }}
      />
      <Button
        disabled={!isSignInFormComplete || isLoading}
        type="primary"
        shape="round"
        size="large"
        className="bg-green hover:!bg-green/80 mx-auto mt-4"
        icon={
          isLoading ? (
            <Spin size="small" className="white-spin" />
          ) : (
            <UserOutlined size={16} />
          )
        }
        iconPosition="end"
      >
        Sign In
      </Button>
    </form>
  );
}

export default SignInForm;
