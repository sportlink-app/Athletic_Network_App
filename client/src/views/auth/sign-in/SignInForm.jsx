import { Button, Input, Spin, message } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import authStore from "../../../store/user/authStore";

function SignInForm() {
  const {
    signInForm,
    handleSignInForm,
    isSignInFormComplete,
    isLoading,
    login,
  } = authStore((state) => ({
    signInForm: state.signInForm,
    handleSignInForm: state.handleSignInForm,
    isSignInFormComplete: state.isSignInFormComplete(),
    isLoading: state.isLoading,
    login: state.login,
  }));

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call login function from authStore
      await login();
      message.success("Login successful");
      // Optionally redirect or perform other actions
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-3 text-left"
      action="#"
      method="POST"
    >
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
        type="primary" // Ant Design button type
        htmlType="submit" // HTML attribute to specify submit button
        disabled={!isSignInFormComplete || isLoading}
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
      >
        Sign In
      </Button>
    </form>
  );
}

export default SignInForm;
