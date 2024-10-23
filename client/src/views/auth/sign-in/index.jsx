import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./SignInForm";
import Container from "../../../components/static/Container";
import Text from "../../../components/static/Text";
import authStore from "../../../store/user/authStore";
import { useEffect } from "react";

function Login() {
  const { isAuthenticated, isProfileCompleted } = authStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isProfileCompleted: state.isProfileCompleted,
    setProfileCompletedState: state.setProfileCompletedState,
  }));

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate, isProfileCompleted]);
  return (
    <div className="min-h-[calc(100vh-59.19px)] relative flex justify-center items-center overflow-hidden">
      <Container>
        <Text text="sign in to your account" />
        <div className=" mt-12 lg:mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />

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
