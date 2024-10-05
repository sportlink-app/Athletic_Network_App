import { useState } from "react";
import {
  AutoComplete,
  Button,
  DatePicker,
  Input,
  InputNumber,
  Spin,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import useSports from "../../../../../components/dynamic/SportsNames";
import { UserAddOutlined } from "@ant-design/icons";

import PropTypes from "prop-types";

function CreateTeamForm({ onSuccess }) {
  const nameInput = (
    <li className="sm:col-span-2 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 ">Name</label>
      <Input
        name="title"
        // value={title}
        // onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a name for your team"
        size="large"
        className="rounded-full"
      />
    </li>
  );

  const handleSportClear = () => {
    // setSport("");
  };

  const sports = useSports(); // Call the hook to get the sports array

  // Filter the sports based on search text
  const getPanelValue = (searchText) =>
    sports
      .filter((name) => name.toLowerCase().includes(searchText.toLowerCase()))
      .map((name) => ({ value: name }));

  // Update options as user types in the AutoComplete input
  const handleSearch = (text) => {
    // setOptions(getPanelValue(text));
  };

  // Handle the event when a sport is selected
  const handleSportSelect = (value) => {
    // setSport(value);
  };

  const sportSelect = (
    <li className=" sm:col-span-2 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 ">Sport</label>
      <AutoComplete
        // options={options}
        // value={sport}
        onSearch={handleSearch}
        onSelect={handleSportSelect} // Update store on select
        onChange={(text) => {
          if (text === "") {
            handleSportClear();
          } else {
            // setSport(text);
          }
        }}
        placeholder="Type to search for a sport"
        size="large"
      />
    </li>
  );

  const membersCountInput = (
    <li className="sm:col-span-2 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 ">
        Members Count
      </label>
      <InputNumber
        min={2}
        max={10}
        name="members-count"
        placeholder="Number of members"
        size="large"
        className="rounded-full overflow-hidden w-full"
      />
    </li>
  );

  const descriptionInput = (
    <li className="sm:col-span-6 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 ">
        Description
      </label>
      <TextArea
        name="description"
        placeholder="Enter the description"
        maxLength={350}
        autoSize={{
          minRows: 2,
        }}
        style={{ borderRadius: "15px" }}
      />
    </li>
  );

  const dateInput = (
    <li className="sm:col-span-3 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 ">
        Date & Time
      </label>
      <DatePicker
        format={{
          format: "YYYY-MM-DD HH:mm:ss",
          type: "mask",
        }}
        placeholder="Select date and time"
        size="large"
        className="!text-xs !rounded-full"
      />
    </li>
  );

  const cityInput = (
    <li className="sm:col-span-3 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 ">City</label>
      <Input
        name="city"
        // value={title}
        // onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the city"
        size="large"
        className="rounded-full"
      />
    </li>
  );

  return (
    <>
      {/* {contextHolder} */}
      <form
        // onSubmit={handleSubmit}
        method="POST"
        action="#"
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
          //   disabled={isButtonDisabled || isLoading}
          type="primary"
          shape="round"
          size="large"
          className="w-fit self-end !bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80  mt-4"
          //   icon={
          //     isLoading ? (
          //       <Spin size="small" className="white-spin" />
          //     ) : (
          //       <UserAddOutlined size={16} />
          //     )
          //   }
        >
          Invite Members
        </Button>
      </form>
    </>
  );
}

CreateTeamForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CreateTeamForm;
