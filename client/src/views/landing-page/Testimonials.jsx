import ProfileAvatar from "../../components/dynamic/Avatar";
import Container from "../../components/static/Container";
import Star from "../../components/static/Star";
import Tags from "../../components/static/Tags";
import Text from "../../components/static/Text";

function Testimonials() {
  const postsList = [
    {
      review:
        "Finding a football team is now a breeze! The app connects me with local players and makes weekend matches enjoyable.",
      name: "Seifeddine Aaza",
      gender: "male",
      sports: ["Football"],
    },
    {
      review:
        "This app made finding tennis partners easy! I can join and create teams, and the community is super supportive.",

      name: "Salma Khaled",
      gender: "female",
      sports: ["Tennis"],
    },
    {
      review:
        "Finding a football team is now a breeze! The app connects me with local players and makes weekend matches enjoyable.",
      name: "Mohamed Mahla",
      gender: "male",
      sports: ["Basketball"],
    },
  ];

  const posts = (
    <div className="mx-auto grid items-start grid-cols-1 gap-8 lg:gap-10 lg:mx-0 lg:grid-cols-3 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
      {postsList.map((post, index) => {
        const rotationDegree = index % 2 === 0 ? -1.5 : 1.3;
        return (
          <article
            key={index}
            className={`flex flex-col items-start justify-between bg-white p-4 sm:p-6 rounded-2xl border-gray-200 border-[1px]`}
            style={{ transform: `rotate(${rotationDegree}deg)` }}
          >
            <div className="relative flex items-center gap-x-4 text-left">
              <ProfileAvatar
                username={post.name}
                gender={post.gender}
                size={54}
              />
              <div className="text-base leading-6">
                <p className="font-semibold text-gray-900 capitalize">
                  <span className="absolute inset-0" />
                  {post.name}
                </p>
                <Tags
                  list={post.sports}
                  className="py-[.1rem] px-[.6rem] text-xs"
                />
              </div>
            </div>
            <div className="group relative">
              <p className="mt-5 text-left text-base leading-6 text-gray-600">
                {post.review}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
  return (
    <Container className=" bg-gradient-to-b from-white to-light-green">
      <Star
        type="outlined"
        color="#00e0b5"
        className=" absolute top-0 lg:top-12 left-1/4 w-6 rotate-12"
      />
      <div
        id="testimonials"
        className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 md:gap-14"
      >
        <Text text="insights from our athletes" />
        {posts}
      </div>
    </Container>
  );
}

export default Testimonials;
