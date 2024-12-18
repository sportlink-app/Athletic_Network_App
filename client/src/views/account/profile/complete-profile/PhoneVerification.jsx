import { Button, Input, Modal, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import completeProfileStore from "../../../../store/user/completeProfileStore";
import { useState } from "react";

export default function PhoneVerification() {
  const { updateForm, updateValidationErrors, selectedCode } =
    completeProfileStore((state) => ({
      updateForm: state.updateForm,
      updateValidationErrors: state.updateValidationErrors,
      selectedCode: state.selectedCode, // Ensure this is mapped correctly
    }));
  const phoneVerified = completeProfileStore((state) => state.phoneVerified);

  const errors = updateValidationErrors();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };

  return (
    <>
      <div className="h-full pt-8">
        <Tooltip title="Verify your phone number" color="green">
          <Button
            onClick={showModal}
            disabled={updateForm.tel == null || errors.tel || phoneVerified}
            size="large"
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green"
          />
        </Tooltip>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="py-2 px-3">
          <h1 className="text-slate-800 text-lg">Verify Your Phone Number</h1>
          <p className="text-sm text-gray-500 mt-3">
            A verification code will be sent to{" "}
            <span style={{ color: "#1e293b", fontWeight: "600" }}>
              {selectedCode} {updateForm.tel}
            </span>
            . Please enter the code below to complete the verification process.
          </p>

          <div className="flex justify-center mt-4">
            <Input.OTP size="large" length={4} {...sharedProps} />
          </div>

          <div className="mt-6 sm:flex sm:flex-row-reverse">
            <Button
              type="primary"
              shape="round"
              size="large"
              className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green"
            >
              Verify Now
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
