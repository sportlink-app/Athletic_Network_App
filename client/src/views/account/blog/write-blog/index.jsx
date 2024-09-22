import { useState } from "react";
import { Button, Modal } from "antd";
import { FormOutlined } from "@ant-design/icons";
import WriteBlogForm from "./WriteBlogForm";
import blogStore from "../../../../store/blog/blogStore"; // Import your blog store

function WriteBlog() {
  const { getBlogs } = blogStore(); // Destructure getBlogs from the blog store
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSuccess = async () => {
    setIsModalOpen(false); // Close modal on successful blog creation
    await getBlogs(); // Refetch blogs after successfully writing a blog
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        shape="round"
        size="large"
        className="!bg-cyan hover:!bg-cyan hover:brightness-105"
        icon={<FormOutlined size={16} />}
        iconPosition="start"
      >
        Write
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        title="Write Blog"
        footer={null}
        style={{ borderRadius: "100px", textAlign: "center" }}
      >
        <WriteBlogForm onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}

export default WriteBlog;
