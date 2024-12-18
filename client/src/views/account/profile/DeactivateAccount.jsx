import { useState } from "react";
import { Button, Modal, Spin, message } from "antd";
import Card from "../../../components/static/Card";
import { CloseOutlined } from "@ant-design/icons";
import userInfoStore from "../../../store/user/userInfoStore";
import authStore from "../../../store/user/authStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function DeactivateAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteProfile = userInfoStore((state) => state.deleteProfile); // Get the deleteProfile function from the store

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isLoading, setLoading] = useState(false);

  const { setAuthState } = authStore();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleDeactivate = async () => {
    try {
      setLoading(true);
      // Call the deleteProfile function from the store
      await deleteProfile();
      // Close the modal after success
      setIsModalOpen(false);

      Cookies.remove("token");
      // Update auth store state
      setAuthState(false);
      navigate("/");
    } catch (error) {
      messageApi.error("An error occurred while deactivating your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card>
        <div>
          <div className="text-base font-semibold leading-6 text-gray-900">
            Deactivate Account
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Once you deactivate your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <Button
            onClick={showModal}
            danger
            type="primary"
            shape="round"
            size="large"
            icon={<CloseOutlined size={16} />}
          >
            Deactivate
          </Button>
        </div>
      </Card>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="py-2 px-3">
          <h1 className="text-slate-800 text-lg">Deactivate Account</h1>
          <p className="text-sm text-gray-500 mt-3">
            Are you sure you want to deactivate your account? This action cannot
            be undone. Once you deactivate your account, there is no going back.
          </p>

          <div className="mt-4 sm:flex sm:flex-row-reverse">
            <Button
              onClick={handleDeactivate}
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
              Deactivate This Account
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeactivateAccount;
