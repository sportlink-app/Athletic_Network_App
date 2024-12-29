import { Button, message, Modal } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState } from "react";

export default function ContactsModal({ members }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={showModal}
        type="primary"
        shape="round"
        size="large"
        className="w-fit !bg-green disabled:bg-green hover:!bg-green hover:brightness-105 self-end"
        icon={<UnorderedListOutlined size={16} />}
      >
        Contacts
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="p-4">
          <h1 className="text-slate-800 text-lg">Your Team Contacts</h1>
          <p className="text-sm text-gray-500 mt-3 xl:mt-4">
            Are you sure you want to deactivate your account? This action cannot
            be undone. Once you deactivate your account, there is no going back.
          </p>
        </div>
      </Modal>
    </>
  );
}
ContactsModal.propTypes = {
  members: PropTypes.object,
};
