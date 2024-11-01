import { AutoComplete } from "antd";
import { useState } from "react";
import useSports from "../../../../../components/dynamic/SportsNames";
import PropTypes from "prop-types";

export default function SportFilter({ onSportChange }) {
  const sports = useSports();
  const [options, setOptions] = useState([]);

  const getPanelValue = (searchText) =>
    sports
      .filter((sport) =>
        sport.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((sport) => ({ value: sport.name }));

  const handleSearch = (text) => {
    if (text) {
      setOptions(getPanelValue(text));
    } else {
      // Clear options when input is empty
      setOptions([]);
      onSportChange(""); // Clear the sport filter when input is empty
    }
  };

  const handleSelect = (value) => {
    onSportChange(value);
  };

  const handleClear = () => {
    setOptions([]);
    onSportChange(""); // Clear the sport filter when the input is cleared
  };

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Type and select a sport"
      size="large"
      className="w-40 sm:w-44"
      allowClear
      onClear={handleClear} // Attach the onClear handler
    />
  );
}

SportFilter.propTypes = {
  onSportChange: PropTypes.func,
};
