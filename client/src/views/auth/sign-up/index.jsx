import { Link, useNavigate } from "react-router-dom";
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
      <Container>
        <Text text="create a new account" />
        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
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
