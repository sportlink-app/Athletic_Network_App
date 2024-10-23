import { useState } from "react";
import {
  Alert,
  AutoComplete,
  Button,
  DatePicker,
  Input,
  message,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { ArrowRightOutlined } from "@ant-design/icons";
import useSports from "../../../../../components/dynamic/SportsNames";
import createTeamStore from "../../../../../store/team/createTeamStore";
import PropTypes from "prop-types";
import dayjs from "dayjs";

function CreateTeamForm({ onSuccess }) {
  const {
    teamForm,
    errors,
    setTeamForm,
    handleInputChange,
    createTeam,
    isFormInvalid,
  } = createTeamStore((state) => ({
    teamForm: state.teamForm,
    errors: state.errors,
    setTeamForm: state.setTeamForm,
    handleInputChange: state.handleInputChange,
    createTeam: state.createTeam,
    isFormInvalid: state.isFormInvalid,
  }));

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createTeam();
      setSelectedSport("");
      onSuccess();
      messageApi.success("Your team created successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
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

  const sports = useSports();
  const [options, setOptions] = useState([]);

  const handleSportSearch = (text) => {
    setSelectedSport(text); // Update the selected sport text
    if (text) {
      const filteredOptions = sports
        .filter((sport) =>
          sport.name.toLowerCase().includes(text.toLowerCase())
        )
        .map((sport) => ({
          value: sport.name, // Display the sport's name in the dropdown
          id: sport.id, // Attach the sport's ID to the option
        }));

      setOptions(filteredOptions);

      // Check if typed text exactly matches any sport
      const exactMatch = filteredOptions.find(
        (option) => option.value.toLowerCase() === text.toLowerCase()
      );

      if (exactMatch) {
        // If there's an exact match, set the sportId automatically
        setTeamForm({ ...teamForm, sportId: exactMatch.id });
        createTeamStore.setState({
          errors: {
            ...errors,
            sportError: "",
          },
        });
      } else if (filteredOptions.length === 0) {
        setTeamForm({ ...teamForm, sportId: "" }); // Clear sportId if no valid options
        createTeamStore.setState({
          errors: {
            ...errors,
            sportError: "Please select a valid sport from the list.",
          },
        });
      } else {
        createTeamStore.setState({
          errors: {
            ...errors,
            sportError: "",
          },
        });
      }
    } else {
      setOptions([]);
      setTeamForm({ ...teamForm, sportId: "" }); // Clear sportId when input is empty
      createTeamStore.setState({
        errors: {
          ...errors,
          sportError: "", // Clear the error when input is empty
        },
      });
    }
  };

  const handleSportSelect = (value, option) => {
    setSelectedSport(value); // Set selected sport name for display
    setTeamForm({ ...teamForm, sportId: option.id }); // Update form with selected sport ID
    setOptions([]); // Clear options after selection

    // Clear sport error when a valid option is selected
    createTeamStore.setState((state) => ({
      errors: {
        ...state.errors,
        sportError: "",
      },
    }));
  };

  const sportSelect = (
    <li className="sm:col-span-2 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900">Sport</label>
      <AutoComplete
        options={options}
        value={selectedSport} // Ensure the selected sport name is displayed
        onSearch={handleSportSearch} // Update the text being typed
        onSelect={handleSportSelect}
        onChange={(text) => {
          setSelectedSport(text);
          handleSportSearch(text); // Update options based on input
        }}
        placeholder="Type to search for a sport"
        size="large"
      />
      {errors.sportError && (
        <p className="text-sm text-red-500 !leading-5 mt-1">
          {errors.sportError}
        </p>
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
        <p className="text-sm text-red-500 !leading-5 mt-1">
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

  const handleDateChange = (value) => {
    setTeamForm({ date: value ? value.toISOString() : "" });
  };

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
    <>
      {contextHolder}
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
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            className="rounded-xl p-3"
            showIcon
            closable
            onClose={() => setErrorMessage("")} // Clear the error on close
          />
        )}
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
          Create & Invite Members
        </Button>
      </form>
    </>
  );
}

CreateTeamForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CreateTeamForm;
