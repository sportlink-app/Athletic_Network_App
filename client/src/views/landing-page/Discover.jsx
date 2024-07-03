import Container from "../../components/Container";
import BlurShape from "../../components/BlurShape";
import Star from "../../components/Star";

function Discover() {
  return (
    <Container className="relative">
      <span className="absolute -top-52 left-2/3 transform-gpu blur-3xl sm:ml-16 opacity-25 md:opacity-40">
        <BlurShape color="bg-green" />
      </span>
      <Star
        type="filled"
        color="#00e0b5"
        className="opacity-70 absolute top-1/4 left-[5%] xl:left-[10%] w-6 rotate-45"
      />
      <Star
        type="outlined"
        color="#31e528"
        className=" absolute top-0 left-[60%] w-8 rotate-12"
      />
      <Star
        type="filled"
        color="#31e528"
        className="opacity-80 absolute top-2/4 right-[10%] w-6 -rotate-12"
      />
      <div
        id="discover"
        className="mx-auto relative bg-gradient-to-r from-cyan to-green max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl rounded-3xl ring-1 ring-gray-200 p-10 md:p-12 lg:p-14 xl:p-16 text-center text-white overflow-hidden"
      >
        <img
          loading="lazy"
          src="/images/discover.jpg"
          alt="Sport Partners"
          className="absolute inset-0 h-full w-full object-top object-cover opacity-15 grayscale z-0"
        />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight capitalize">
            Find Your Perfect Sport Partner
          </h2>
          <p className="mt-6 text-lg leading-8">
            Connect with athletes who match your skill level and interests, and
            enjoy sports together anytime, anywhere. Whether you&apos;re looking
            for a running buddy, a tennis partner, or a teammate for your next
            soccer game, our platform helps you find the perfect match.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Discover;
