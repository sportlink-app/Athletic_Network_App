import PropTypes from "prop-types";
import { Button, Input, Select, Spin, Tag } from "antd";
import userInfoStore from "../../../../store/user/userInfoStore";
import TextArea from "antd/es/input/TextArea";
import sportsNames from "../../../../components/SportsNames";
import { ArrowRightOutlined } from "@ant-design/icons";

function CompleteProfileForm() {
  const {
    updateForm,
    handleUpdateFieldChange,
    handleSportsChange,
    isFormComplete,
    isLoading,
    updateValidationErrors,
    handleCompleteProfileForm,
  } = userInfoStore((state) => ({
    updateForm: state.updateForm,
    handleUpdateFieldChange: state.handleUpdateFieldChange,
    handleSportsChange: state.handleSportsChange,
    isFormComplete: state.isFormComplete,
    isLoading: state.isLoading,
    updateValidationErrors: state.updateValidationErrors,
    handleCompleteProfileForm: state.handleCompleteProfileForm,
  }));

  const errors = updateValidationErrors();

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

  const sportsSelect = (
    <li className="mt-2 flex flex-col gap-1 w-full">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sports
      </label>
      <Select
        value={updateForm.sports}
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
        options={sportsNames.map((name) => ({ value: name, label: name }))}
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
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        size="large"
        className="w-32"
      />
    </li>
  );

  return (
    <form className="flex flex-col gap-3 text-left" action="#" method="POST">
      <ul className="sm:flex gap-6">
        {cityInput}
        {telInput}
      </ul>
      <ul className="sm:flex gap-6">
        {sportsSelect} {genderSelect}
      </ul>
      {bioTextArea}
      <Button
        disabled={!isFormComplete() || isLoading}
        type="primary"
        shape="round"
        size="large"
        className="bg-green hover:!bg-green/80 mx-auto mt-4"
        onClick={handleCompleteProfileForm}
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
