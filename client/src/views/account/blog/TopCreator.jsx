import { Link } from "react-router-dom";
import ProfileAvatar from "../../../components/Avatar";
import { getRandomColor } from "../../../components/utils/randomColor";
import Text from "../../../components/Text";

function TopCreators() {
  const creators = [
    {
      id: 1,
      username: "seifAaa37",
      gender: "male",
    },
    {
      id: 1,
      username: "seiAaza37",
      gender: "male",
    },
    {
      id: 1,
      username: "seifAa37",
      gender: "male",
    },
    {
      id: 1,
      username: "sfAaza37",
      gender: "male",
    },
    {
      id: 1,
      username: "ifAaza37",
      gender: "male",
    },
  ];

  const creatorsList = creators.map((creator, index) => (
    <Link
      to={`/explore/${creator.username}`}
      key={index}
      className="rounded-full hover:scale-[1.03] hover:shadow-xl duration-500 cursor-pointer"
    >
      <ProfileAvatar
        username={creator.username}
        gender={creator.gender}
        size={64}
        bgColor={getRandomColor(creator.username)}
      />
    </Link>
  ));
  return (
    <div className="text-center mt-6">
      <Text type="title" text="top creators" className="mb-6" />
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-2">
        {creatorsList}
      </div>
    </div>
  );
}

export default TopCreators;
