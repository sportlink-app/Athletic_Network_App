import { Input, Select, Tag, Button, Spin, Alert, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import updateProfileStore from "../../../../store/user/updateProfile";
import useSports from "../../../../components/dynamic/SportsNames";
import PropTypes from "prop-types";

function EditProfileForm({ onSuccess }) {
  const {
    gender,
    editForm,
    handleSportsChange,
    handleUpdateFieldChange,
    isFormComplete,
    updateValidationErrors,
    updateProfile,
  } = updateProfileStore((state) => ({
    ...state,
    isFormComplete: state.isFormComplete(),
  }));

  const errors = updateValidationErrors();

  const [genderValue, setGenderValue] = useState(editForm.gender || gender);
  const handleGenderChange = (value) => {
    setGenderValue(value);
    handleUpdateFieldChange({ target: { name: "gender", value } });
  };

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);
      await updateProfile();
      onSuccess();
      messageApi.success("Profile updated successfully");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const usernameInput = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Username
      </label>
      <Input
        name="username"
        value={editForm.username}
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
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
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
        value={editForm.bio}
        onChange={handleUpdateFieldChange}
        status={errors.bio ? "error" : ""}
        placeholder="Write a brief biography about yourself"
        maxLength={180}
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

  const sports = useSports(); // Call the hook to get the sports array

  const sportsSelect = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sports
      </label>
      <Select
        value={editForm.sports}
        placeholder="Select your favorite sports"
        mode="multiple"
        tagRender={tagRender}
        maxCount={8}
        maxTagCount={2}
        style={{
          width: "100%",
          borderRadius: "10px",
        }}
        options={sports.map((name) => ({
          value: name,
          label: name,
        }))}
        size="large"
        allowClear
        onChange={handleSportsChange}
      />
    </li>
  );

  const cityInput = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">City</label>
      <Input
        name="city"
        value={editForm.city}
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
      <label className="ml-2 font-medium leading-6 text-gray-900">Tel</label>
      <Input
        name="tel"
        value={editForm.tel}
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
    <>
      {contextHolder}
      <form
        onSubmit={handleUpdateProfile}
        method="PUT"
        action="#"
        className="flex flex-col gap-2 lg:gap-3 max-w-md mx-auto py-4 text-left"
      >
        <ul className="sm:flex gap-8">
          {usernameInput} {genderSelect}
        </ul>
        {bioTextArea}
        {sportsSelect}
        <ul className="sm:flex gap-8">
          {cityInput} {telInput}
        </ul>
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            className="rounded-xl p-3"
            showIcon
            closable
            onClose={() => setErrorMessage("")}
          />
        )}
        <div className="mt-2 sm:flex sm:flex-row-reverse">
          <Button
            htmlType="submit"
            disabled={!isFormComplete || isLoading}
            type="primary"
            shape="round"
            size="large"
            className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
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
      </form>
    </>
  );
}

EditProfileForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  label: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

export default EditProfileForm;
