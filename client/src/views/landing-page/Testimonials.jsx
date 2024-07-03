import Container from "../../components/Container";
import Star from "../../components/Star";
import Text from "../../components/Text";

function Testimonials() {
  const postsList = [
    {
      id: 1,
      review:
        "I've been using this app to find tennis partners, and it's been amazing. The community is friendly, and I always find someone who matches my skill level. It's a game-changer for my practice sessions",
      name: "seifeddine aaza",
      sport: "Tennis",
      imageUrl:
        "https://s3-eu-west-1.amazonaws.com/files2.fd.nl/Erwin/Slider+Daan/stefan-bron-2.jpg",
    },
    {
      id: 2,
      review:
        "Finding basketball partners was always a hassle until I discovered this app. Now, I can easily join games and even organize my own matches. The app is user-friendly and incredibly helpful!",
      name: "mohamed mahla",
      sport: "basketball",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      review:
        "This app is fantastic! I found a great team to play with every weekend. It's made finding local football matches so easy and enjoyable. Highly recommend it!",
      name: "ahmed khaled",
      sport: "football",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];
  const posts = (
    <div className="mx-auto grid items-start grid-cols-1 gap-6 lg:gap-10 xl:gap-16 lg:mx-0 lg:grid-cols-3 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
      {postsList.map((post) => (
        <article
          key={post.id}
          className="flex flex-col items-start justify-between "
        >
          <div className="relative flex items-center gap-x-4 text-left">
            <img
              loading="lazy"
              src={post.imageUrl}
              alt=""
              className="h-14 w-14 rounded-full object-cover bg-gray-50"
            />
            <div className="text-base leading-6 capitalize">
              <p className="font-semibold text-gray-900 ">
                <span className="absolute inset-0" />
                {post.name}
              </p>
              <p className="text-sm text-gray-600 ">{post.sport}</p>
            </div>
          </div>
          <div className="group relative">
            <p className="mt-5 text-left text-base leading-6 text-gray-600">
              {post.review}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
  return (
    <Container className="relative">
      <Star
        type="outlined"
        color="#00e0b5"
        className=" absolute top-[5%] left-1/4 w-6 rotate-12"
      />
      <div
        id="testimonials"
        className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14 xl:gap-[4.5rem]"
      >
        <Text text="insights from our athletes" />
        {posts}
      </div>
    </Container>
  );
}

export default Testimonials;
