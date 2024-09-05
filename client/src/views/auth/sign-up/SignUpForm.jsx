import { Button, Input, Spin } from "antd";
import {
  UserAddOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import authStore from "../../../store/authStore";

function SignUpForm() {
  const {
    signUpForm,
    handleSignUpForm,
    isSignUpFormComplete,
    isLoading,
    signUpValidationErrors,
  } = authStore((state) => ({
    signUpForm: state.signUpForm,
    handleSignUpForm: state.handleSignUpForm,
    isSignUpFormComplete: state.isSignUpFormComplete(),
    isLoading: state.isLoading,
    signUpValidationErrors: state.signUpValidationErrors,
  }));

  const errors = signUpValidationErrors();

  return (
    <form className="flex flex-col gap-3 text-left" action="#" method="POST">
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
          <p className="text-sm ml-2 text-red-500">{errors.password}</p>
        )}
      </li>
      <Button
        disabled={!isSignUpFormComplete || isLoading}
        type="primary"
        shape="round"
        size="large"
        className="bg-green hover:!bg-green/80 mx-auto mt-4"
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
