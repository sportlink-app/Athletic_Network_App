import { useState } from "react";
import { Alert, AutoComplete, Button, DatePicker, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import useSports from "../../../../../components/dynamic/SportsNames";
import createTeamStore from "../../../../../store/team/createTeamStore";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../../../../store/user/userInfoStore";

function CreateTeamForm() {
  const {
    teamForm,
    errors,
    setLocation,
    setTeamForm,
    handleInputChange,
    createTeam,
    isFormInvalid,
  } = createTeamStore((state) => ({
    teamForm: state.teamForm,
    errors: state.errors,
    setLocation: state.setLocation,
    setTeamForm: state.setTeamForm,
    handleInputChange: state.handleInputChange,
    createTeam: state.createTeam,
    isFormInvalid: state.isFormInvalid,
  }));

  const availability = userInfoStore((state) => state.availability);
  const city = userInfoStore((state) => state.city);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createTeam();
      const teamId = createTeamStore.getState().teamId;
      setSelectedSport("");
      navigate(`/team/${teamId}/users`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [currentStep, setCurrentStep] = useState(1);

  const nameInput = (
    <li className="sm:col-span-3 mt-2 flex flex-col gap-2">
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
    if (text) {
      const filteredOptions = sports
        .filter((sport) =>
          sport.name.toLowerCase().includes(text.toLowerCase())
        )
        .map((sport) => ({
          value: sport.name,
          id: sport.id,
        }));

      setOptions(filteredOptions);

      const exactMatch = filteredOptions.find(
        (option) => option.value.toLowerCase() === text.toLowerCase()
      );

      if (exactMatch) {
        setTeamForm({ ...teamForm, sportId: exactMatch.id });
        createTeamStore.setState({ errors: { ...errors, sportError: "" } });
      } else {
        setTeamForm({ ...teamForm, sportId: "" });
        createTeamStore.setState({
          errors: {
            ...errors,
            sportError: "Please select a valid sport from the list.",
          },
        });
      }
    } else {
      setOptions([]);
      setTeamForm({ ...teamForm, sportId: "" });
      createTeamStore.setState({ errors: { ...errors, sportError: "" } });
    }
  };

  const handleSportSelect = (value, option) => {
    setSelectedSport(value);
    setTeamForm({ ...teamForm, sportId: option.id });
    setOptions([]);
    createTeamStore.setState((state) => ({
      errors: {
        ...state.errors,
        sportError: "",
      },
    }));
  };

  const handleFocus = () => {
    // Display all sports when input is focused
    setOptions(sports.map((sport) => ({ value: sport.name, id: sport.id })));
  };

  const sportSelect = (
    <li className="sm:col-span-3 mt-2 flex flex-col gap-2">
      <label className="ml-2 font-medium leading-6 text-gray-900">Sport</label>
      <AutoComplete
        options={options}
        value={selectedSport}
        onFocus={handleFocus} // Open options on focus
        onSearch={handleSportSearch}
        onSelect={handleSportSelect}
        onChange={(text) => {
          setSelectedSport(text);
          handleSportSearch(text);
        }}
        placeholder="Type and select a sport"
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
    <li className="sm:col-span-3 mt-2 flex flex-col gap-2">
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
    <li className="sm:col-span-6 mt-2 flex flex-col gap-2">
      <label className="ml-2 font-medium leading-6 text-gray-900">
        Description
      </label>
      <TextArea
        name="description"
        value={teamForm.description}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        placeholder="Enter the description"
        maxLength={350}
        autoSize={{ minRows: 4 }}
        style={{ borderRadius: "15px" }}
      />
    </li>
  );

  const handleDateChange = (value) => {
    const now = dayjs();
    if (value && value.isBefore(now)) {
      createTeamStore.setState((state) => ({
        errors: {
          ...state.errors,
          dateError: "Date and time cannot be in the past.",
        },
      }));
    } else {
      createTeamStore.setState((state) => ({
        errors: { ...state.errors, dateError: "" },
      }));
    }
    setTeamForm({ date: value ? value.toISOString() : "" });
  };

  // Disable dates before today
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const dateInput = (
    <li className="sm:col-span-3 mt-2 flex flex-col gap-2">
      <label className="ml-2 font-medium leading-6 text-gray-900">
        Date & Time
      </label>
      <DatePicker
        format="YYYY-MM-DD HH:mm"
        showTime={window.innerWidth >= 640} // Show time only on wider screens
        value={teamForm.date ? dayjs(teamForm.date) : null}
        onChange={handleDateChange}
        disabledDate={disabledDate} // Disable past dates in calendar
        placeholder="Select date and time"
        size="large"
        className="!rounded-full"
      />
      {errors.dateError && (
        <p className="text-sm text-red-500 !leading-5 mt-1">
          {errors.dateError}
        </p>
      )}
    </li>
  );

  const [locationSuggestions, setLocationSuggestions] = useState([]); // Suggestions list
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationValue, setLocationValue] = useState("");

  // Handle input change and search location data
  const handleSearch = async (value) => {
    setLocationLoading(value); // Update search state on input change

    if (value.length > 2) {
      try {
        // Fetch location data from the OpenStreetMap API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${city}+${value}`
        );
        const data = await response.json();
        setLocationSuggestions(data); // Set the fetched suggestions
        setLocationLoading(false);
      } catch (error) {
        setLocationLoading(false);
      }
    } else {
      setLocationSuggestions([]); // Clear suggestions if input is less than 3 characters
    }
  };

  // Handle selection of a location suggestion

  const handleSelect = (value) => {
    setLocationSuggestions([]); // Clear suggestions
    setLocation(value); // Update the store
    setLocationValue(value);
  };

  // Handle clearing the input or changes to it
  const handleChange = (value) => {
    setLocationValue(value || ""); // Set location to empty if input is cleared
  };

  const locationInput = (
    <li className="sm:col-span-6 mt-2 flex flex-col gap-2">
      <label className="ml-2 font-medium leading-6 text-gray-900">
        Location
      </label>
      <AutoComplete
        onChange={handleChange}
        onSearch={handleSearch} // Call handleSearch on input change
        onSelect={handleSelect} // Handle selection of a suggestion
        placeholder="Type a location (e.g., Gym, park, Stadium)"
        allowClear
        style={{ width: "100%" }} // Ensure the input field has enough width
        size="large"
      >
        {locationLoading ? (
          // Show loading spinner while fetching data
          <AutoComplete.Option
            key="loading"
            disabled
            className="w-full text-center"
          >
            <Spin className="green-spin my-4" />
          </AutoComplete.Option>
        ) : (
          locationSuggestions.length > 0 &&
          locationSuggestions.map((item) => (
            <AutoComplete.Option key={item.place_id} value={item.display_name}>
              {item.display_name}
            </AutoComplete.Option>
          ))
        )}
      </AutoComplete>
    </li>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 lg:gap-3 max-w-lg mx-auto py-4 text-left"
    >
      {!availability && (
        <Alert
          message="You must be available to create a team. Please update your availability in your profile."
          type="warning"
        />
      )}
      {currentStep === 1 && (
        <ul className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4">
          {nameInput}
          {sportSelect}
          {descriptionInput}
        </ul>
      )}
      {currentStep === 2 && (
        <ul className="grid grid-cols-1 sm:grid-cols-6 gap-2 md:gap-4">
          {locationInput}
          {membersCountInput}
          {dateInput}
        </ul>
      )}
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

      {currentStep === 1 && (
        <Button
          onClick={() => setCurrentStep(2)}
          type="primary"
          shape="round"
          size="large"
          className="w-fit self-end !bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
          icon={<ArrowRightOutlined size={16} />}
          iconPosition="end"
        >
          Next
        </Button>
      )}

      {currentStep === 2 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentStep(1)}
            type="default"
            shape="round"
            size="large"
            icon={<ArrowLeftOutlined size={16} />}
            className="hover:!text-green hover:!border-green"
          >
            Back
          </Button>
          <Button
            htmlType="submit"
            disabled={
              isLoading || isFormInvalid() || !availability || !locationValue
            }
            type="primary"
            shape="round"
            size="large"
            className="w-fit self-end !bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80"
            icon={
              isLoading ? (
                <Spin size="small" className="white-spin" />
              ) : (
                <ArrowRightOutlined size={16} />
              )
            }
            iconPosition="end"
          >
            Create
          </Button>
        </div>
      )}
    </form>
  );
}

CreateTeamForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CreateTeamForm;
