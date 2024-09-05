import { useState } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditProfileForm from "./EditProfileForm";

function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Button
        onClick={showModal}
        type="text"
        shape="round"
        size="large"
        className=" text-gray-700"
        icon={<EditOutlined size={16} />}
        iconPosition="start"
      >
        Edit Profile
      </Button>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Edit Account"
        footer={null}
        style={{ borderRadius: "100px", textAlign: "center" }}
      >
        <EditProfileForm />
      </Modal>
    </>
  );
}

export default EditProfile;
