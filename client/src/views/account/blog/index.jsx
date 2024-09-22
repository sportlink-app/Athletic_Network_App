import Footer from "../../../components/Footer";
import TopCreators from "./TopCreator";
import WriteBlog from "./write-blog"; // Adjusted the import for consistency
import { useCallback, useEffect, useState } from "react";
import blogStore from "../../../store/blog/blogStore";
import { FloatButton, message, Button, Spin } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import EmptyData from "../../../components/EmptyData";
import BlogCard from "./BlogCard";

function Blogs() {
  const { blogs, getBlogs, totalItems } = blogStore();
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Fetch blogs data
  const fetchBlogsData = useCallback(async () => {
    try {
      setLoading(true);
      await getBlogs();
      setIsDataFetched(true); // Mark data as fetched once complete
    } catch (error) {
      messageApi.error("An error occurred while fetching blogs data.");
    } finally {
      setLoading(false);
    }
  }, [getBlogs, messageApi]);

  useEffect(() => {
    fetchBlogsData();
  }, [fetchBlogsData]);

  // Load more blogs
  const handleLoadMore = async () => {
    setLoading(true);
    try {
      await getBlogs();
    } catch (error) {
      messageApi.error("Failed to load more blogs.");
    } finally {
      setLoading(false);
    }
  };

  const hasMoreBlogs = blogs.length < totalItems;

  // Render blog list or EmptyData based on data status
  const blogsList = blogs.length > 0 && (
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
  );

  return (
    <>
      {contextHolder}
      <div className="min-h-screen container mx-auto px-4 my-10">
        <WriteBlog />
        {isDataFetched && blogs.length !== 0 && <TopCreators />}
        <section>
          {!isLoading && isDataFetched && blogs.length === 0 ? (
            <EmptyData />
          ) : (
            blogsList
          )}

          <div className="flex justify-center mt-4">
            {!isLoading && hasMoreBlogs && (
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
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Blogs;
