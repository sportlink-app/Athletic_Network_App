import { useEffect } from "react";
import { useStore } from "zustand";
import BlogCard from "./BlogCard";
import blogStore from "../../../store/blog/blogStore";
import { message } from "antd";

function Blogs() {
  const { blogs, getBlogs } = useStore(blogStore);

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await getBlogs(1, 9);
      } catch (error) {
        messageApi.error(error.message);
      }
    };
    fetchBlogs();
    console.log(blogs);
  }, [getBlogs, messageApi]);

  const blogsList = blogs.map((blog, index) => (
    <BlogCard
      key={index}
      username={blog.author}
      date={blog.created_at}
      sport={blog.sport}
      title={blog.title}
      content={blog.content}
    />
  ));

  return (
    <>
      {contextHolder}
      <div className="mt-6 lg:mt-10 gap-x-[1em] sm:columns-2 lg:columns-3 2xl:columns-4">
        {blogsList}
      </div>
    </>
  );
}

export default Blogs;
