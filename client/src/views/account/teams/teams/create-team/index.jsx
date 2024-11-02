import { useState } from "react";
import { Button, Modal } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import CreateTeamForm from "./CreateTeamForm";
import createTeamStore from "../../../../../store/team/createTeamStore";

function CreateTeam() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    // Reset the form state when closing the modal
    createTeamStore.setState({ teamForm: {}, errors: {} });
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        shape="round"
        size="large"
        className="!bg-cyan hover:!bg-cyan hover:brightness-105 w-fit"
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
        className="!w-[620px]"
      >
        <CreateTeamForm />
      </Modal>
    </>
  );
}

export default CreateTeam;
