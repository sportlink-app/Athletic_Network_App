import { useEffect } from "react";
import { useStore } from "zustand";
import BlogCard from "./BlogCard";
import blogStore from "../../../store/blog/blogStore";
import { message, Button, Spin } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

function Blogs() {
  const { blogs, getBlogs, isLoading, totalItems } = useStore(blogStore);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await getBlogs();
      } catch (error) {
        messageApi.error(error.message);
      }
    };
    fetchBlogs();
  }, [getBlogs, messageApi]);

  const handleLoadMore = async () => {
    try {
      await getBlogs();
    } catch (error) {
      messageApi.error(error.message);
    }
  };

  const hasMoreBlogs = blogs.length < totalItems;

  return (
    <>
      {contextHolder}
      <div className="mt-6 lg:mt-10 gap-x-[1em] sm:columns-2 lg:columns-3 2xl:columns-4">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            username={blog.author}
            date={blog.created_at}
            sport={blog.sport}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {!isLoading && hasMoreBlogs && (
          <Button
            onClick={handleLoadMore}
            type="primary"
            shape="round"
            size="large"
            className="bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green mx-auto mt-4"
            icon={
              isLoading ? (
                <Spin size="small" className="white-spin" />
              ) : (
                <ArrowDownOutlined size={16} />
              )
            }
            iconPosition="end"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
export default Blogs;
