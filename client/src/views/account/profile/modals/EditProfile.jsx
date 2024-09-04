import { useState } from "react";
import PropTypes from "prop-types";
import MainButton from "../../../../components/Button";
import { Modal, Form, Select, Tag, Input, Switch } from "antd";
const { TextArea } = Input;
import sportsNames from "../../../../components/SportsNames";

function EditProfile() {
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

  const usernameInput = (
    <span className="mt-2 flex flex-col gap-1 ">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        username
      </label>
      <Input
        placeholder="Enter your username"
        maxLength={12}
        size="middle"
        style={{ borderRadius: "50px" }}
      />
    </span>
  );

  const availableSwitch = (
    <span className="mt-2 flex gap-3">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Available
      </label>
      <Switch checkedChildren="Yes" unCheckedChildren="No" />
    </span>
  );

  const bioTextArea = (
    <span className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Bio
      </label>
      <TextArea
        placeholder="Write a brief biography about yourself"
        maxLength={180}
        rows={4}
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
        style={{ borderRadius: "15px" }}
      />
    </span>
  );

  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    return (
      <Tag
        color="default"
        closable={closable}
        onClose={onClose}
        className="m-[.15rem] py-[3px] px-4 rounded-full text-xs capitalize"
      >
        {label}
      </Tag>
    );
  };

  const sportsSelect = (
    <span className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sports
      </label>
      <Select
        placeholder="Select your favorite sports"
        mode="multiple"
        tagRender={tagRender}
        maxCount={8}
        maxTagCount={2}
        style={{
          width: "100%",
          borderRadius: "10px",
        }}
        options={sportsNames.map((name) => ({
          value: name,
          label: name,
        }))}
        size="middle"
      />
    </span>
  );

  const cityInput = (
    <span className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        city
      </label>
      <Input
        maxLength={14}
        placeholder="Your city"
        size="middle"
        style={{ borderRadius: "50px" }}
      />
    </span>
  );

  const telInput = (
    <span className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        tel
      </label>
      <Input
        maxLength={12}
        type="number"
        placeholder="Your phone number"
        size="middle"
        style={{ borderRadius: "50px" }}
      />
    </span>
  );

  return (
    <>
      <MainButton
        text="edit profile"
        className="self-end md:self-start md:order-last"
        onClick={showModal}
      />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Edit Account"
        footer={null}
        style={{ borderRadius: "100px" }}
      >
        <>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            className="flex flex-col gap-2 lg:gap-3 max-w-sm mx-auto pt-4"
          >
            {usernameInput}
            {availableSwitch}
            {bioTextArea}
            {sportsSelect}

            <div className="sm:flex justify-between">
              {cityInput} {telInput}
            </div>
          </Form>
        </>

        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <MainButton text="save" />
        </div>
      </Modal>
    </>
  );
}
EditProfile.propTypes = {
  label: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

export default EditProfile;
