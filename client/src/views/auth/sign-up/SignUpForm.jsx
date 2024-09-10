import { Button, Input, Spin, Alert } from "antd";
import {
  UserAddOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import authStore from "../../../store/user/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const {
    signUpForm,
    handleSignUpForm,
    isSignUpFormComplete,
    signUpValidationErrors,
    signUp,
  } = authStore((state) => ({
    signUpForm: state.signUpForm,
    handleSignUpForm: state.handleSignUpForm,
    isSignUpFormComplete: state.isSignUpFormComplete(),
    signUpValidationErrors: state.signUpValidationErrors,
    signUp: state.signUp,
  }));

  const errors = signUpValidationErrors();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Track error messages

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before submitting

    try {
      setLoading(true);
      await signUp(); // Call login function from authStore
      navigate("/complete-profile");
    } catch (error) {
      // Handle the error message set in the store
      setErrorMessage(error.message); // Set the specific error message
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-3 text-left"
      action="#"
      method="POST"
    >
      <li className="flex flex-col gap-1">
        <label
          htmlFor="username"
          className="ml-2 font-medium leading-6 text-gray-900 capitalize"
        >
          username
        </label>
        <Input
          name="username"
          value={signUpForm.username}
          onChange={handleSignUpForm}
          placeholder="Enter your username"
          size="large"
          style={{ borderRadius: "50px" }}
          status={errors.username ? "error" : ""}
        />
        {errors.username && (
          <p className="text-sm ml-2 text-red-500">{errors.username}</p>
        )}
      </li>
      <li className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="ml-2 font-medium leading-6 text-gray-900 capitalize"
        >
          email address
        </label>
        <Input
          name="email"
          value={signUpForm.email}
          onChange={handleSignUpForm}
          placeholder="Enter your email address"
          size="large"
          style={{ borderRadius: "50px" }}
          status={errors.email ? "error" : ""}
        />
        {errors.email && (
          <p className="text-sm ml-2 text-red-500">{errors.email}</p>
        )}
      </li>
      <li className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="ml-2 font-medium leading-6 text-gray-900 capitalize"
        >
          password
        </label>
        <Input.Password
          name="password"
          value={signUpForm.password}
          onChange={handleSignUpForm}
          placeholder="Enter your password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          size="large"
          style={{ borderRadius: "50px" }}
          status={errors.password ? "error" : ""}
        />
        {errors.password && (
          <p className="text-sm ml-2 text-red-500 max-w-64 xl:max-w-80">
            {errors.password}
          </p>
        )}
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
        disabled={!isSignUpFormComplete || isLoading}
        type="primary"
        shape="round"
        size="large"
        className="bg-green hover:!bg-green/80 disabled:!bg-green/80 mx-auto mt-4"
        icon={
          isLoading ? (
            <Spin size="small" className="white-spin" />
          ) : (
            <UserAddOutlined size={16} />
          )
        }
        iconPosition="end"
      >
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
