import PropTypes from "prop-types";
import { Alert, Button, Input, Select, Spin, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { ArrowRightOutlined } from "@ant-design/icons";
import completeProfileStore from "../../../../store/user/completeProfileStore";
import authStore from "../../../../store/user/authStore"; // Adjust path as needed
import useSports from "../../../../components/dynamic/SportsNames";

function CompleteProfileForm() {
  const { setProfileCompletedState } = authStore((state) => ({
    setProfileCompletedState: state.setProfileCompletedState,
  }));

  const {
    updateForm,
    handleUpdateFieldChange,
    handleSportsChange,
    isFormComplete,
    updateValidationErrors,
    completeProfile,
  } = completeProfileStore((state) => ({
    updateForm: state.updateForm,
    handleUpdateFieldChange: state.handleUpdateFieldChange,
    handleSportsChange: state.handleSportsChange,
    isFormComplete: state.isFormComplete,
    updateValidationErrors: state.updateValidationErrors,
    completeProfile: state.completeProfile,
  }));

  const navigate = useNavigate();

  const errors = updateValidationErrors();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);
      await completeProfile(); // Call completeProfile function

      // Update the profile completion status in authStore
      setProfileCompletedState(true);

      navigate("/profile"); // Navigate to profile page
    } catch (error) {
      // Handle the error message set in the store
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

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
        autoSize={{ minRows: 3, maxRows: 5 }}
        style={{ borderRadius: "15px" }}
      />
      {errors.bio && <p className="text-sm ml-2 text-red-500">{errors.bio}</p>}
    </li>
  );

  const sports = useSports();
  const sportsSelect = (
    <li className="mt-2 flex flex-col gap-1 w-full">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sports
      </label>
      <Select
        value={updateForm.sports.map((sport) => sport.id)} // Set selected sports by their IDs
        placeholder="Select your favorite sports"
        mode="multiple"
        tagRender={(props) => {
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
        }}
        maxCount={8}
        maxTagCount={1}
        style={{ width: "100%", borderRadius: "10px" }}
        options={sports.map(({ id, name }) => ({ value: id, label: name }))} // Map sports array to Select options
        size="large"
        onChange={(selectedIds) => {
          // Find the selected sports by their IDs and update the state with their full objects
          const selectedSports = sports.filter((sport) =>
            selectedIds.includes(sport.id)
          );
          handleSportsChange(selectedSports); // Update the store with selected sports
        }}
        filterOption={(input, option) =>
          option?.label.toLowerCase().includes(input.toLowerCase())
        }
        allowClear
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
        <p className="text-sm ml-2 text-red-500 max-w-60 sm:max-w-44">
          {errors.tel}
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
        value={updateForm.gender}
        onChange={(value) =>
          handleUpdateFieldChange({ target: { name: "gender", value } })
        }
        style={{ borderRadius: "15px" }}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        size="large"
        className="w-32"
      />
    </li>
  );

  return (
    <form
      onSubmit={handleCompleteProfile}
      action="#"
      method="POST"
      className="flex flex-col gap-3 text-left"
    >
      <ul className="sm:flex gap-6">
        {cityInput}
        {telInput}
      </ul>
      <ul className="sm:flex gap-6">
        {sportsSelect} {genderSelect}
      </ul>
      {bioTextArea}
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
      <Button
        htmlType="submit"
        disabled={!isFormComplete() || isLoading}
        type="primary"
        shape="round"
        size="large"
        className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green mx-auto mt-4"
        icon={
          isLoading ? (
            <Spin size="small" className="white-spin" />
          ) : (
            <ArrowRightOutlined size={16} />
          )
        }
        iconPosition="end"
      >
        Done
      </Button>
    </form>
  );
}

CompleteProfileForm.propTypes = {
  label: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CompleteProfileForm;
