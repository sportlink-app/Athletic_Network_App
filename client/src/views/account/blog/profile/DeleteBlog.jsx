import { useState } from "react";
import { Button, Modal, Spin, message } from "antd";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import blogStore from "../../../../store/blogStore";

function DeleteBlog({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { deleteBlog } = blogStore();
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleBlogDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call the deleteProfile function from the store
      await deleteBlog(id);
      messageApi.success("Blog post delete successfully!");
      // Close the modal after success
      setIsModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to delete blog post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      {
        <Button
          onClick={showModal}
          type="primary"
          size="middle"
          shape="circle"
          danger
          icon={<DeleteOutlined />}
          className="self-end md:order-last hover:brightness-105 "
        />
      }
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        title="Delete Blog"
        footer={null}
        style={{ borderRadius: "100px" }}
      >
        <p className="text-sm text-gray-500 ">
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </p>

        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <Button
            onClick={handleBlogDelete}
            danger
            type="primary"
            shape="round"
            size="large"
            icon={
              isLoading ? (
                <Spin size="small" className="white-spin" />
              ) : (
                <CloseOutlined size={16} />
              )
            }
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

DeleteBlog.propTypes = {
  id: PropTypes.string,
};

export default DeleteBlog;
