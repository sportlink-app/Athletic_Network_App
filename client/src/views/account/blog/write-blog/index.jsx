import { useState } from "react";
import { Button, Modal } from "antd";
import { FormOutlined } from "@ant-design/icons";
import WriteBlogForm from "./WriteBlogForm";

function WriteBlog() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSuccess = () => {
    setIsModalOpen(false); // Close modal on successful profile update
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        shape="round"
        size="large"
        className=" bg-cyan hover:!bg-cyan hover:brightness-105"
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
