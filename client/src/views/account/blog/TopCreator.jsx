import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../../components/dynamic/Avatar";
import { getRandomColor } from "../../../components/utils/randomColor";
import Text from "../../../components/static/Text";
import blogStore from "../../../store/blog/blogStore";
import { message } from "antd";

function TopCreators() {
  const { getTopCreators, topCreators } = blogStore((state) => ({
    getTopCreators: state.getTopCreators,
    topCreators: state.topCreators,
  }));

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        await getTopCreators();
      } catch (error) {
        messageApi.error(error.message);
      }
    };
    fetchCreators();
  }, [getTopCreators, messageApi]);

  // Render the creators list
  const creatorsList = topCreators.map((creator, index) => (
    <li key={index} className="flex flex-col items-center gap-2">
      <Link
        to={`/blog/${creator.username}`}
        className="w-fit rounded-full hover:scale-[1.03] hover:shadow-xl duration-500 cursor-pointer leading-[.5rem]"
      >
        <ProfileAvatar
          username={creator.username}
          gender={creator.gender}
          count={creator.blog_count}
          size={64}
          bgColor={getRandomColor(creator.username)}
        />
      </Link>
      <h3 className="text-base font-medium capitalize text-slate-700">
        {creator.username}
      </h3>
    </li>
  ));

  return (
    <>
      {contextHolder}
      <div className="min-h-40 text-center mt-6">
        <Text type="title" text="Top Creators" className="mb-6" />
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-2">
          {topCreators.length > 0 && creatorsList}
        </div>
      </div>
    </>
  );
}

export default TopCreators;
