import { useEffect } from "react";
import Container from "../../../../components/static/Container";
import Text from "../../../../components/static/Text";
import authStore from "../../../../store/user/authStore";
import CompleteProfileForm from "./CompleteProfileForm";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const { isAuthenticated, isProfileCompleted } = authStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isProfileCompleted: state.isProfileCompleted,
    setProfileCompletedState: state.setProfileCompletedState,
  }));

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isAuthenticated && isProfileCompleted) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate, isProfileCompleted]);
  return (
    <div className="min-h-[calc(100vh-59.19px)] relative flex justify-center items-center overflow-hidden">
      <Container>
        <Text text="complete your profile" />
        <div className="mt-12 lg:mt-16 sm:mx-auto sm:w-full sm:max-w-md">
          <CompleteProfileForm />
        </div>
      </Container>
    </div>
  );
}

export default CompleteProfile;
