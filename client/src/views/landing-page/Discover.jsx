import Container from "../../components/Container";
import BlurShape from "../../components/BlurShape";

function Discover() {
  return (
    <Container>
      <span className="absolute -top-52 left-2/3 transform-gpu blur-3xl sm:ml-16 opacity-25 md:opacity-40">
        <BlurShape color="bg-green" />
      </span>
      <div
        id="discover"
        className="relative bg-gradient-to-r from-cyan to-green mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl rounded-3xl ring-1 ring-gray-200 p-10 md:p-12 lg:p-14 xl:p-16 text-center text-white overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
