import Footer from "../../../components/static/Footer";
import TopCreators from "./TopCreator";
import WriteBlog from "./write-blog";
import { useEffect, useState } from "react";
import blogStore from "../../../store/blogStore";
import { FloatButton, message, Button, Spin } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import BlogCard from "../../../components/dynamic/BlogCard";

export default function Blogs() {
  const { blogs, getBlogs, totalItems } = blogStore();
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchBlogsData = async () => {
      if (!isDataFetched) {
        try {
          setLoading(true);
          await getBlogs(true); // Reset to fetch fresh data
          setIsDataFetched(true); // Mark data as fetched
        } catch (error) {
          messageApi.error("An error occurred while fetching blogs data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlogsData();
  }, [getBlogs, messageApi, isDataFetched]);

  // Load more blogs
  const handleLoadMore = async () => {
    if (isLoading) return; // Prevent further clicks
    setLoading(true);
    try {
      await getBlogs(); // Fetch next page of blogs
    } catch (error) {
      messageApi.error("Failed to load more blogs.");
    } finally {
      setLoading(false);
    }
  };

  // Render blog list or EmptyData based on data status
  const blogsList = blogs.length > 0 && (
    <section className="mt-6 lg:mt-10 gap-x-[1em] sm:columns-2 lg:columns-3 2xl:columns-4">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <BlogCard
            username={blog.author}
            gender={blog.gender}
            date={blog.created_at}
            sport={blog.sport}
            title={blog.title}
            content={blog.content}
          />
        </div>
      ))}
    </section>
  );

  return (
    <>
      {contextHolder}
      <section className="min-h-screen container mx-auto px-4 my-10">
        <WriteBlog />
        {isLoading && <Spin size="small" className="white-spin" />}
        {isDataFetched && blogs.length !== 0 && <TopCreators />}
        {isDataFetched && blogs.length !== 0 && blogsList}
        <div className="flex justify-center mt-4">
          {!isLoading && blogs.length < totalItems && (
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
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}
