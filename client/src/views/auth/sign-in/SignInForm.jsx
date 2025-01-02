import { Alert, Button, Input, Spin } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import authStore from "../../../store/user/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const { signInForm, handleSignInForm, isSignInFormComplete, login } =
    authStore((state) => ({
      ...state,
      isSignInFormComplete: state.isSignInFormComplete(),
    }));

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before submitting

    try {
      setLoading(true);
      await login();
      navigate("/profile");
    } catch (error) {
      // Handle the error message set in the store
      setErrorMessage(error.message); // Set the specific error message
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        method="POST"
        action="#"
        className="flex flex-col gap-5 xl:gap-6 text-left"
      >
        <li className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="ml-2 font-medium leading-6 text-gray-800 capitalize"
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
        </li>
        <li className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="ml-2 font-medium leading-6 text-gray-800 capitalize"
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
        </li>
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            className="rounded-xl p-3"
            showIcon
            closable
            onClose={() => setErrorMessage("")} // Clear the error message when alert is closed
          />
        )}
        <Button
          htmlType="submit"
          disabled={!isSignInFormComplete || isLoading}
          type="primary"
          shape="round"
          size="large"
          className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green mx-auto mt-4"
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
    </>
  );
}

export default SignInForm;
