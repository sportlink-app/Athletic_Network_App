import { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import useSports from "../../../../components/dynamic/SportsNames";
import PropTypes from "prop-types";

function SportFilter({ onSportSelect, initialSport }) {
  // State for options and selected sport
  const [options, setOptions] = useState([]);
  const [selectedSport, setSelectedSport] = useState(initialSport);
  const sports = useSports();

  useEffect(() => {
    setSelectedSport(initialSport); // Update selected sport when initialSport changes
  }, [initialSport]);

  const getPanelValue = (searchText) =>
    sports
      .filter((name) => name.toLowerCase().includes(searchText.toLowerCase()))
      .map((name) => ({ value: name }));

  const handleSportSelect = (value) => {
    setSelectedSport(value); // Update the local state
    onSportSelect(value); // Notify parent component when a sport is selected
  };

  const handleSportClear = () => {
    setSelectedSport(""); // Clear local state
    onSportSelect(""); // Notify parent component to fetch all users
  };

  const handleSearch = (text) => {
    setOptions(getPanelValue(text));
  };

  return (
    <AutoComplete
      options={options}
      value={selectedSport}
      onSearch={handleSearch}
      onSelect={handleSportSelect}
      onChange={(text) => {
        if (text === "") {
          handleSportClear(); // Detect when input is cleared
        } else {
          setSelectedSport(text); // Update the selectedSport state with the input text
        }
      }}
      placeholder="Start typing to search for a sport"
      size="large"
      className="w-48 text-left"
      allowClear
    />
  );
}

SportFilter.propTypes = {
  onSportSelect: PropTypes.func.isRequired,
  initialSport: PropTypes.string,
};

export default SportFilter;
