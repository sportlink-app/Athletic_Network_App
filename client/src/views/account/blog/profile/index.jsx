import { useParams } from "react-router-dom";
import { getRandomColor } from "../../../../components/utils/randomColor";
import ProfileHeader from "../../../../components/dynamic/ProfileHeader";
import Footer from "../../../../components/static/Footer";
import BackButton from "../../../../components/static/BackButton";
import { useCallback, useEffect, useState } from "react";
import BlogCard from "../../../../components/dynamic/BlogCard";
import DeleteBlog from "./DeleteBlog";
import blogStore from "../../../../store/blogStore";
import { Button, message, Spin } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/static/EmptyData";

function UserBlogs() {
  const { userGender } = blogStore();
  const { username } = useParams();
  const coverBgColor = getRandomColor(username);

  const { userBlogs, getUserBlogs, userBlogsTotalItems } = blogStore();
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Fetch user blogs data
  const fetchUserBlogs = useCallback(async () => {
    try {
      setLoading(true);
      await getUserBlogs(username, true); // Fetch with reset
      setIsDataFetched(true); // Mark data as fetched
    } catch (error) {
      messageApi.error("An error occurred while fetching user blogs data.");
      console.error("Error fetching user blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [getUserBlogs, username, messageApi]);

  useEffect(() => {
    fetchUserBlogs();
  }, [fetchUserBlogs]);

  // Load more blogs
  const handleLoadMore = async () => {
    if (isLoading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      await getUserBlogs(username); // Load more for the specific user
    } catch (error) {
      messageApi.error("Failed to load more blogs.");
    } finally {
      setLoading(false);
    }
  };

  // Render blog list or EmptyData based on data status
  const userBlogsList = userBlogs.length > 0 && (
    <section className="mt-24 gap-x-[1em] sm:columns-2 lg:columns-3 2xl:columns-4">
      {userBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          username={username}
          content={blog.content}
          date={new Date(blog.created_at).toLocaleString()}
          title={blog.title}
          sport={blog.sport}
          btn={<DeleteBlog id={blog.id} />}
        />
      ))}
    </section>
  );

  return (
    <>
      {contextHolder}
      <div className="min-h-screen">
        <div
          style={{ backgroundColor: coverBgColor }}
          className="w-full h-28 md:h-32 xl:h-40 flex justify-center items-end"
        >
          <div className="w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl h-10 relative ">
            <BackButton />
          </div>
        </div>

        <section className="container mx-auto px-4 mt-10 lg:mt-14 xl:mt-16 ">
          <div className="w-full flex items-center flex-col">
            <ProfileHeader username={username} gender={userGender} />
          </div>
          {isLoading && <Spin size="small" className="white-spin" />}
          {isDataFetched && userBlogs.length !== 0 && userBlogsList}
          {!isLoading && isDataFetched && userBlogs.length === 0 && (
            <EmptyData text="No blog posts found!" />
          )}
          <div className="flex justify-center">
            {!isLoading && userBlogs.length < userBlogsTotalItems && (
              <Button
                onClick={handleLoadMore}
                type="primary"
                shape="round"
                size="large"
                className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green mx-auto mt-4"
                icon={
                  isLoading ? (
                    <Spin size="small" className="white-spin" />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default UserBlogs;
