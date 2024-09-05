import { Form, Input, Select, Tag, Button, Spin } from "antd";
import PropTypes from "prop-types";
import sportsNames from "../../../../../components/SportsNames";
import TextArea from "antd/es/input/TextArea";
import userStore from "../../../../../store/userStore";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";

function EditProfileForm() {
  const {
    gender,
    updateForm,
    handleSportsChange,
    handleUpdateFieldChange,
    isFormComplete,
    updateValidationErrors,
    isLoading,
  } = userStore((state) => ({
    gender: state.gender,
    updateForm: state.updateForm,
    handleSportsChange: state.handleSportsChange,
    handleUpdateFieldChange: state.handleUpdateFieldChange,
    isFormComplete: state.isFormComplete(),
    isLoading: state.isLoading,
    updateValidationErrors: state.updateValidationErrors,
  }));

  const errors = updateValidationErrors();

  const [genderValue, setGenderValue] = useState(updateForm.gender || gender);

  const handleGenderChange = (value) => {
    setGenderValue(value);
    handleUpdateFieldChange({ target: { name: "gender", value } });
  };

  const usernameInput = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Username
      </label>
      <Input
        name="username"
        value={updateForm.username}
        onChange={handleUpdateFieldChange}
        status={errors.username ? "error" : ""}
        placeholder="Enter your username"
        maxLength={16}
        size="large"
        style={{ borderRadius: "50px" }}
      />
      {errors.username && (
        <p className="text-sm ml-2 text-red-500 sm:max-w-44">
          {errors.username}
        </p>
      )}
    </li>
  );

  const genderSelect = (
    <li className="w-32 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Gender
      </label>
      <Select
        placeholder="Select your gender"
        value={genderValue}
        onChange={handleGenderChange}
        style={{ borderRadius: "15px" }}
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        size="large"
        className="w-full lg:w-[110%]"
      />
    </li>
  );

  const bioTextArea = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Bio
      </label>
      <TextArea
        name="bio"
        value={updateForm.bio}
        onChange={handleUpdateFieldChange}
        status={errors.bio ? "error" : ""}
        placeholder="Write a brief biography about yourself"
        maxLength={180}
        rows={4}
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
        style={{ borderRadius: "15px" }}
      />
      {errors.bio && <p className="text-sm ml-2 text-red-500">{errors.bio}</p>}
    </li>
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
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sports
      </label>
      <Select
        value={updateForm.sports}
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
        size="large"
        onChange={handleSportsChange}
      />
    </li>
  );

  const cityInput = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        City
      </label>
      <Input
        name="city"
        value={updateForm.city}
        onChange={handleUpdateFieldChange}
        maxLength={14}
        placeholder="Your city"
        size="large"
        style={{ borderRadius: "50px" }}
      />
    </li>
  );

  const telInput = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Tel
      </label>
      <Input
        name="tel"
        value={updateForm.tel}
        onChange={handleUpdateFieldChange}
        status={errors.tel ? "error" : ""}
        maxLength={12}
        type="number"
        placeholder="Your phone number"
        size="large"
        style={{ borderRadius: "50px" }}
      />
      {errors.tel && (
        <p className="text-sm ml-2 text-red-500 sm:max-w-44">{errors.tel}</p>
      )}
    </li>
  );

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      className="flex flex-col gap-2 lg:gap-3 max-w-sm mx-auto pt-4 text-left"
    >
      <ul className="sm:flex gap-8">
        {usernameInput} {genderSelect}
      </ul>
      {bioTextArea}
      {sportsSelect}
      <ul className="sm:flex gap-8">
        {cityInput} {telInput}
      </ul>
      <div className="mt-6 sm:flex sm:flex-row-reverse">
        <Button
          disabled={!isFormComplete || isLoading}
          type="primary"
          shape="round"
          size="large"
          className="bg-green hover:!bg-green/80"
          icon={
            isLoading ? (
              <Spin size="small" className="white-spin" />
            ) : (
              <CheckOutlined size={16} />
            )
          }
          iconPosition="end"
        >
          Save
        </Button>
      </div>
    </Form>
  );
}

EditProfileForm.propTypes = {
  label: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

export default EditProfileForm;
