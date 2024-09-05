import BlurShape from "../../../../components/BlurShape";
import Container from "../../../../components/Container";
import Text from "../../../../components/Text";
import CompleteProfileForm from "./CompleteProfileForm";

function CompleteProfile() {
  return (
    <div className="h-[calc(100vh-59.19px)] relative flex justify-center items-center overflow-hidden">
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
        <Text text="complete your profile" />
        <div className="mt-12 lg:mt-16 sm:mx-auto sm:w-full sm:max-w-md">
          <CompleteProfileForm />
        </div>
      </Container>
    </div>
  );
}

export default CompleteProfile;
