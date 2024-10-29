import { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

function UsernameFilter({ onUsernameSearch, initialUsername }) {
  const [username, setUsername] = useState(initialUsername);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    onUsernameSearch(value); // Pass the typed username to the parent
  };

  return (
    <Input
      name="username"
      type="text"
      value={username}
      onChange={handleUsernameChange}
      placeholder="Search by username"
      size="large"
      className="max-w-56 text-left pl-4 rounded-full h-fit"
    />
  );
}

UsernameFilter.propTypes = {
  onUsernameSearch: PropTypes.func.isRequired,
  initialUsername: PropTypes.string,
};

export default UsernameFilter;
