import { FloatButton } from "antd";
import Footer from "../../../components/Footer";
import Articles from "./Articles";
import TopCreators from "./TopCreator";

import WriteBlog from "./write-blog";

function Blog() {
  return (
    <>
      <div className="container mx-auto px-4 my-10">
        <WriteBlog />
        <TopCreators />
        <Articles />
      </div>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Blog;
