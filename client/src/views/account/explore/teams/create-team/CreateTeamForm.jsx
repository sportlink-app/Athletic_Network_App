import { useState } from "react";
import { AutoComplete, Button, DatePicker, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ArrowRightOutlined } from "@ant-design/icons";
import useSports from "../../../../../components/dynamic/SportsNames";
import createTeamStore from "../../../../../store/team/createTeamStore";
import PropTypes from "prop-types";
import dayjs from "dayjs"; // Lightweight date library

function CreateTeamForm({ onSuccess }) {
  const {
    teamForm,
    errors,
    setTeamForm,
    handleInputChange,
    handleSearch,
    createTeam,
    isFormInvalid,
  } = createTeamStore((state) => ({
    teamForm: state.teamForm,
    errors: state.errors,
    setTeamForm: state.setTeamForm,
    handleInputChange: state.handleInputChange,
    handleSearch: state.handleSearch,
    createTeam: state.createTeam,
    isFormInvalid: state.isFormInvalid,
  }));

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sports = useSports();

  const handleSportSearch = (text) => {
    const filteredOptions = handleSearch(text, sports);
    setOptions(filteredOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createTeam();
      onSuccess();
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (value) => {
    setTeamForm({ date: value ? value.toISOString() : "" });
  };

  const nameInput = (
    <li className="sm:col-span-2 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">Name</label>
      <Input
        name="name"
        value={teamForm.name}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        placeholder="Enter a name for your team"
        size="large"
        className="rounded-full"
      />
    </li>
  );

  const sportSelect = (
    <li className="sm:col-span-2 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">Sport</label>
      <AutoComplete
        options={options}
        value={teamForm.sport} // Ensure this reflects the input value
        onSearch={handleSportSearch}
        onSelect={(value) => {
          setTeamForm({ sport: value }); // Update state on selection
          setOptions([]); // Clear options after selection
        }}
        onChange={(value) => setTeamForm({ sport: value })} // Update state on input change
        placeholder="Type to search for a sport"
        size="large"
      />
      {errors.sportError && (
        <p className="text-sm text-red-500 !leading-5">{errors.sportError}</p>
      )}
    </li>
  );

  const membersCountInput = (
    <li className="sm:col-span-2 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">
        Members Count
      </label>
      <Input
        type="number"
        name="membersCount"
        value={teamForm.membersCount}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        min={2}
        max={22}
        placeholder="Number of members"
        size="large"
        className="rounded-full"
      />
      {errors.membersCountError && (
        <p className="text-sm text-red-500 !leading-5">
          {errors.membersCountError}
        </p>
      )}
    </li>
  );

  const descriptionInput = (
    <li className="sm:col-span-6 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">
        Description
      </label>
      <TextArea
        name="description"
        value={teamForm.description}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        placeholder="Enter the description"
        maxLength={350}
        autoSize={{ minRows: 2 }}
        style={{ borderRadius: "15px" }}
      />
    </li>
  );

  const dateInput = (
    <li className="sm:col-span-3 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">
        Date & Time
      </label>
      <DatePicker
        format="YYYY-MM-DD HH:mm"
        value={teamForm.date ? dayjs(teamForm.date) : null}
        onChange={handleDateChange}
        placeholder="Select date and time"
        size="large"
        className="!rounded-full"
      />
    </li>
  );

  const cityInput = (
    <li className="sm:col-span-3 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">City</label>
      <Input
        name="city"
        value={teamForm.city}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        placeholder="Enter the city"
        size="large"
        className="rounded-full"
      />
    </li>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 lg:gap-3 max-w-md mx-auto py-4 text-left"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4">
        {nameInput}
        {sportSelect}
        {membersCountInput}
        {descriptionInput}
        {cityInput}
        {dateInput}
      </ul>

      <Button
        htmlType="submit"
        disabled={isLoading || isFormInvalid()}
        type="primary"
        shape="round"
        size="large"
        className="w-fit self-end !bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
        icon={
          isLoading ? (
            <Spin size="small" className="white-spin" />
          ) : (
            <ArrowRightOutlined size={16} />
          )
        }
        iconPosition="end"
      >
        Create & Invite
      </Button>
    </form>
  );
}

CreateTeamForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CreateTeamForm;
