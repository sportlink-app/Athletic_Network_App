import { Select } from "antd";
import PropTypes from "prop-types";
export default function SortByFilter({ onSortChange }) {
  return (
    <Select
      placeholder="Sort By"
      options={[
        { value: "members_count", label: "Sort by members" },
        { value: "date", label: "Sort by date" },
      ]}
      size="large"
      className="main-select w-36 sm:w-40 !text-xs"
      onChange={onSortChange}
    />
  );
}
SortByFilter.propTypes = {
  onSortChange: PropTypes.func,
};
