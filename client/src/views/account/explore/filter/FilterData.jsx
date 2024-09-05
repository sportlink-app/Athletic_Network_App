import { useState } from "react";
import { Dropdown, Space, AutoComplete, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import exploreStore from "../../../../store/exploreStore";
import sportsNames from "../../../../components/SportsNames";

const City = () => {
  const { cityFilter, setCityFilter } = exploreStore();

  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
  };

  return (
    <Input
      value={cityFilter}
      onChange={handleCityChange}
      style={{ borderRadius: "50px" }}
      placeholder="Enter city name"
      className="max-w-52"
      size="large"
    />
  );
};
const Availability = () => {
  const { availabilityFilter, setAvailabilityFilter, availabilityList } =
    exploreStore();

  const handleMenuClick = ({ key }) => {
    const selectedItem = availabilityList.find((item) => item.key === key);
    if (selectedItem) {
      setAvailabilityFilter(selectedItem.label);
    }
  };

  return (
    <Dropdown
      menu={{
        items: availabilityList,
        selectable: true,
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
      overlayStyle={{ color: "green" }}
    >
      <span className="text-sm text-gray-600 cursor-pointer select-none capitalize">
        <Space>
          {availabilityFilter}
          <DownOutlined />
        </Space>
      </span>
    </Dropdown>
  );
};

const Sport = () => {
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
      style={{
        width: 200,
      }}
      onSearch={(text) => setOptions(getPanelValue(text))}
      onSelect={handleSportSelect}
      placeholder="Select a sport"
      size="large"
    />
  );
};

export { Availability, City, Sport };
