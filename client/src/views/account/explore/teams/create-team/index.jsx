import { useState } from "react";
import { Button, Modal } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import CreateTeamForm from "./CreateTeamForm";

function CreateTeam() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSuccess = async () => {
    setIsModalOpen(false); // Close modal on successful blog creation
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        shape="round"
        size="large"
        className="!bg-cyan hover:!bg-cyan hover:brightness-105"
        icon={<UsergroupAddOutlined size={16} />}
        iconPosition="start"
      >
        Create Team
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        title="Create Team"
        footer={null}
        style={{ borderRadius: "100px", textAlign: "center" }}
      >
        <CreateTeamForm onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}

export default CreateTeam;
