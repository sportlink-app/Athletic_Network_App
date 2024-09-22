import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const Blogs = () => {
  return (
    <section>
      <Button
        type="primary"
        shape="round"
        size="large"
        className="bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green mx-auto mt-4"
        icon={<ArrowRightOutlined size={16} />}
        iconPosition="end"
      >
        Blogs
      </Button>
    </section>
  );
};

export default Blogs;
