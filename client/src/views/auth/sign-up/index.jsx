import { Link, useNavigate } from "react-router-dom";
import BlurShape from "../../../components/static/BlurShape";
import Container from "../../../components/static/Container";
import Text from "../../../components/static/Text";
import SignUpForm from "./SignUpForm";
import { useEffect } from "react";
import authStore from "../../../store/user/authStore";

function SignUp() {
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
        <Text text="create a new account" />
        <div className="mt-12 lg:mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignUpForm />
          <div className="flex gap-4 mt-8 justify-center">
            <p className="text-center text-gray-500">
              Already have an account?
            </p>
            <Link
              to="/account/login"
              className="font-semibold leading-6 text-green"
            >
              Sign in here.
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
