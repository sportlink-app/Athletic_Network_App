import PropTypes from "prop-types";
import { Alert, Button, Input, message, Select, Spin, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { ArrowRightOutlined } from "@ant-design/icons";
import completeProfileStore from "../../../../store/user/completeProfileStore";
import authStore from "../../../../store/user/authStore"; // Adjust path as needed
import useSports from "../../../../components/dynamic/SportsNames";
import PhoneVerification from "./PhoneVerification";

function CompleteProfileForm() {
  const { setProfileCompletedState } = authStore((state) => ({
    setProfileCompletedState: state.setProfileCompletedState,
  }));

  const {
    updateForm,
    handleUpdateFieldChange,
    handleSportsChange,
    isFormComplete,
    updateValidationErrors,
    completeProfile,
  } = completeProfileStore((state) => ({
    updateForm: state.updateForm,
    handleUpdateFieldChange: state.handleUpdateFieldChange,
    handleSportsChange: state.handleSportsChange,
    isFormComplete: state.isFormComplete,
    updateValidationErrors: state.updateValidationErrors,
    completeProfile: state.completeProfile,
  }));
  const { selectedCode, setSelectedCode, phoneVerified } =
    completeProfileStore();

  const navigate = useNavigate();

  const errors = updateValidationErrors();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);
      await completeProfile(); // Call completeProfile function

      // Update the profile completion status in authStore
      setProfileCompletedState(true);

      navigate("/profile"); // Navigate to profile page
    } catch (error) {
      // Handle the error message set in the store
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const bioTextArea = (
    <li className="flex flex-col gap-2">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Bio
      </label>
      <TextArea
        name="bio"
        value={updateForm.bio}
        onChange={handleUpdateFieldChange}
        status={errors.bio ? "error" : ""}
        placeholder="Write a brief biography about yourself"
        maxLength={180}
        rows={4}
        autoSize={{ minRows: 3, maxRows: 5 }}
        style={{ borderRadius: "15px", paddingTop: "8px" }}
      />
      {errors.bio && <p className="text-sm ml-2 text-red-500">{errors.bio}</p>}
    </li>
  );

  const sports = useSports();
  const sportsSelect = (
    <li className="flex flex-col gap-2 w-full">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sports
      </label>
      <Select
        value={updateForm.sports.map((sport) => sport.id)} // Set selected sports by their IDs
        placeholder="Select your favorite sports"
        mode="multiple"
        tagRender={(props) => {
          const { label, closable, onClose } = props;
          return (
            <Tag
              color="default"
              closable={closable}
              onClose={onClose}
              className="m-[.15rem] py-[3px] px-4 rounded-full text-xs capitalize"
            >
              {label}
            </Tag>
          );
        }}
        maxCount={8}
        maxTagCount={1}
        style={{ width: "100%", borderRadius: "10px" }}
        options={sports.map(({ id, name }) => ({ value: id, label: name }))} // Map sports array to Select options
        size="large"
        onChange={(selectedIds) => {
          // Find the selected sports by their IDs and update the state with their full objects
          const selectedSports = sports.filter((sport) =>
            selectedIds.includes(sport.id)
          );
          handleSportsChange(selectedSports); // Update the store with selected sports
        }}
        filterOption={(input, option) =>
          option?.label.toLowerCase().includes(input.toLowerCase())
        }
        allowClear
      />
    </li>
  );

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);

  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  // Fetch list of countries
  useEffect(() => {
    setCountriesLoading(true);

    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/flag/unicode"
        );
        const result = await response.json();

        if (!result.error) {
          setCountries(
            result.data.map((country) => ({
              value: country.name, // Value passed on selection
              label: `${country.unicodeFlag} ${country.name}`, // Displayed in the dropdown
            }))
          );
        }
      } catch (error) {
        messageApi.error(
          "Error fetching countries list, please refresh the page or try again later"
        );
      } finally {
        setCountriesLoading(false);
      }
    };
    fetchCountries();
  }, [messageApi]);

  // Fetch country code based on selected country
  const fetchCountryCode = async (countryName) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const result = await response.json();

      if (result && result[0]?.idd) {
        const root = result[0].idd.root || "";
        const suffixes = result[0].idd.suffixes?.[0] || "";
        setSelectedCode(`${root}${suffixes}`); // Set the country code
      } else {
        setSelectedCode("###"); // Fallback code if not found
      }
    } catch (error) {
      messageApi.error("Error fetching country code");
      setSelectedCode("###");
    }
  };

  // Handle country selection
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    if (country) {
      fetchCities(country); // Fetch cities for the selected country
      fetchCountryCode(country); // Fetch and set the country code
    } else {
      setSelectedCode("###");
      handleUpdateFieldChange({ target: { name: "tel", value: null } });
      handleUpdateFieldChange({ target: { name: "city", value: null } });
    }
  };

  const countrySelect = (
    <li className="flex flex-col gap-2 sm:min-w-36 max-w-36">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Country
      </label>
      <Select
        name="country"
        size="large"
        showSearch
        allowClear
        placeholder="Select your country"
        optionFilterProp="label"
        onChange={handleCountryChange}
        options={countries}
        loading={countriesLoading}
        style={{ borderRadius: "50px" }}
        className="w-full"
      />
    </li>
  );

  const fetchCities = async (country) => {
    setCitiesLoading(true);

    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
        }
      );
      const result = await response.json();

      if (!result.error) {
        setCities(
          result.data.map((city) => ({
            value: city, // Value passed on selection
            label: city, // Displayed in the dropdown
          }))
        );
      }
    } catch (error) {
      messageApi.error(
        "Error fetching cities list, please refresh the page or try again later"
      );
    } finally {
      setCitiesLoading(false);
    }
  };

  const cityInput = (
    <li className="flex flex-col gap-2 sm:min-w-32">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        City
      </label>
      <Select
        name="city"
        size="large"
        showSearch
        placeholder="Select your city"
        optionFilterProp="label"
        options={cities}
        onChange={(city) =>
          handleUpdateFieldChange({ target: { name: "city", value: city } })
        }
        value={updateForm.city}
        loading={citiesLoading}
        className="w-full"
        disabled={!selectedCountry}
      />
    </li>
  );

  const telInput = (
    <li className="flex flex-col gap-2">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Tel
      </label>
      <Input
        addonBefore={selectedCode || ""} // Dynamically set the phone code or clear it
        name="tel"
        value={updateForm.tel}
        onChange={handleUpdateFieldChange}
        status={errors.tel ? "error" : ""}
        maxLength={12}
        type="number"
        placeholder="Your phone number"
        size="large"
        disabled={!selectedCountry} // Disable the input when no country is selected
        className="input-tel"
      />
      {errors.tel && (
        <p className="text-sm ml-2 text-red-500 max-w-60 sm:max-w-44">
          {errors.tel}
        </p>
      )}
    </li>
  );

  const genderSelect = (
    <li className="w-32 flex flex-col gap-2">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Gender
      </label>
      <Select
        placeholder="Select your gender"
        value={updateForm.gender}
        onChange={(gender) =>
          handleUpdateFieldChange({ target: { name: "gender", value: gender } })
        }
        style={{ borderRadius: "15px" }}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        size="large"
        className="w-32"
      />
    </li>
  );

  return (
    <>
      {contextHolder}
      <form
        onSubmit={handleCompleteProfile}
        action="#"
        method="POST"
        className="flex flex-col gap-6 sm:gap-4 lg:gap-5 xl:gap-6 text-left"
      >
        <ul className="flex flex-col sm:flex-row gap-6">
          {countrySelect}
          {cityInput}
          <div className="flex justify-center items-end gap-6">
            {telInput}
            <PhoneVerification />
          </div>
        </ul>
        <ul className="flex flex-col sm:flex-row  gap-6">
          {sportsSelect} {genderSelect}
        </ul>
        {bioTextArea}
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            className="rounded-xl p-3"
            showIcon
            closable
            onClose={() => setErrorMessage("")}
          />
        )}
        {isFormComplete() && !phoneVerified && (
          <Alert
            message="Please verify your phone number before submitting the form."
            type="warning"
            className="rounded-xl p-3"
            showIcon
          />
        )}
        <Button
          htmlType="submit"
          disabled={!isFormComplete() || isLoading || !phoneVerified}
          type="primary"
          shape="round"
          size="large"
          className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green mx-auto mt-4"
          icon={
            isLoading ? (
              <Spin size="small" className="white-spin" />
            ) : (
              <ArrowRightOutlined size={16} />
            )
          }
          iconPosition="end"
        >
          Finish
        </Button>
      </form>
    </>
  );
}

CompleteProfileForm.propTypes = {
  label: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CompleteProfileForm;
