import { useState } from "react";
import { AutoComplete } from "antd";
import exploreStore from "../../../../store/exploreStore";
import sportsNames from "../../../../components/SportsNames";

function SportFilter() {
  const { setSportFilter } = exploreStore();
  const [options, setOptions] = useState([]);

  const getPanelValue = (searchText) =>
    sportsNames
      .filter((name) => name.toLowerCase().includes(searchText.toLowerCase()))
      .map((name) => ({ value: name }));

  const handleSportSelect = (value) => {
    setSportFilter(value);
  };
  return (
    <AutoComplete
      options={options}
      onSearch={(text) => setOptions(getPanelValue(text))}
      onSelect={handleSportSelect}
      placeholder="Select a sport"
      size="large"
      className="w-48 text-left"
    />
  );
}

export default SportFilter;
