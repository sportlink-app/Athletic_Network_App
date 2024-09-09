import { useState } from "react";
import { Button, Modal } from "antd";
import { FormOutlined } from "@ant-design/icons";
import WriteBlogModal from "./WriteBlogModal";

function WriteBlog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);
  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        shape="round"
        size="large"
        className=" bg-cyan hover:!bg-cyan/80"
        icon={<FormOutlined size={16} />}
        iconPosition="start"
      >
        Write
      </Button>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Write Blog"
        footer={null}
        style={{ borderRadius: "100px", textAlign: "center" }}
      >
        <WriteBlogModal />
      </Modal>
    </>
  );
}

export default WriteBlog;
