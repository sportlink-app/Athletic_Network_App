import Container from "../../components/static/Container";
import BlurShape from "../../components/static/BlurShape";
import Star from "../../components/static/Star";

function Discover() {
  return (
    <Container className="relative bg-white grid place-items-center">
      <span className="absolute -top-52 left-2/3 transform-gpu blur-3xl sm:ml-16 opacity-20 md:opacity-40 ">
        <BlurShape color="bg-green" />
      </span>
      <Star
        type="filled"
        color="#00E0B5"
        className="opacity-0 md:opacity-70 absolute top-1/4 left-[5%] xl:left-[10%] w-6 rotate-45"
      />
      <Star
        type="outlined"
        color="#00E0B5"
        className=" absolute top-0 left-[40%] w-6 rotate-12"
      />
      <Star
        type="filled"
        color="#31E528"
        className="opacity-0 md:opacity-80 absolute top-2/4 right-[10%] w-6 -rotate-12 "
      />
      <div
        id="discover"
        className="mx-2 bg-gradient-to-r from-cyan to-green max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[52rem] rounded-3xl shadow-xl ring-1 ring-gray-200 p-10 md:p-12 lg:p-14 xl:p-16 text-center text-white overflow-hidden rotate-2"
      >
        <div className="relative z-10">
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
            Building Teams, Connecting Players, Sharing Stories
          </h2>
          <p className="mt-6 text-lg leading-6">
            Join a community of athletes, form teams, and compete in your
            favorite sports. Find partners based on your skill level, create or
            join teams, and share your experiences. Play anytime, anywhere, and
            engage with a growing sports community.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Discover;
