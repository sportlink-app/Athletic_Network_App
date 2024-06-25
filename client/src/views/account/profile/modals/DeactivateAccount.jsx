import { useState } from "react";
import { Modal } from "antd";
import MainButton from "../../../../components/Button";
import Card from "../../../../components/Card";
function DeactivateAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Card>
        <div>
          <div className="text-base font-semibold leading-6 text-gray-900">
            Deactivate Account
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Once you deactivate your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <MainButton text="deactivate" danger onClick={showModal} />
        </div>
      </Card>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Deactivate Account"
        footer={null}
        style={{ borderRadius: "100px" }}
      >
        <p className="text-sm text-gray-500 mt-8">
          Are you sure you want to deactivate your account? This action cannot
          be undone. Once you deactivate your account, there is no going back.
        </p>

        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <MainButton
            text="deactivate this account"
            danger
            onClick={showModal}
          />
        </div>
      </Modal>
    </>
  );
}
export default DeactivateAccount;
