import { Alert, AutoComplete, Button, Input, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import useSports from "../../../../components/dynamic/SportsNames";
import { SendOutlined } from "@ant-design/icons";
import blogStore from "../../../../store/blogStore";
import PropTypes from "prop-types";

function WriteBlogForm({ onSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [sportError, setSportError] = useState("");

  // Zustand store state
  const { blogForm, setBlogForm, createBlog } = blogStore();

  // Disable button if any of the inputs are empty or there is a sport error
  const isButtonDisabled =
    !blogForm.title || !blogForm.sportId || !blogForm.content || sportError;

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear any previous error before submitting

    try {
      await createBlog();
      setSelectedSport("");
      onSuccess();
      messageApi.success("Blog post posted!");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const titleInput = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Title
      </label>
      <Input
        name="title"
        value={blogForm.title}
        onChange={(e) => setBlogForm({ title: e.target.value })}
        placeholder="Enter a title for your post"
        size="large"
        style={{ borderRadius: "50px" }}
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
        setBlogForm({ sportId: exactMatch.id });
        setSportError("");
      } else {
        setBlogForm({ sportId: "" });
        setSportError("Please select a valid sport from the list.");
      }
    } else {
      setOptions([]);
      setBlogForm({ sportId: "" });
      setSportError("");
    }
  };

  const handleSportSelect = (value, option) => {
    setSelectedSport(value);
    setBlogForm({ sportId: option.id });
    setOptions([]);
    setSportError("");
  };

  const handleFocus = () => {
    setOptions(sports.map((sport) => ({ value: sport.name, id: sport.id })));
  };

  const sportSelect = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sport
      </label>
      <AutoComplete
        options={options}
        value={selectedSport}
        onSearch={handleSportSearch}
        onSelect={handleSportSelect}
        onFocus={handleFocus}
        onChange={(text) => {
          setSelectedSport(text);
          handleSportSearch(text);
        }}
        placeholder="Type and select a sport"
        size="large"
        className="w-44 text-left"
      />
      {sportError && (
        <p className="text-sm text-red-500 !leading-5 mt-1 max-w-[11rem]">
          {sportError}
        </p>
      )}
    </li>
  );

  const contentTextArea = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Content
      </label>
      <TextArea
        name="content"
        value={blogForm.content}
        onChange={(e) => setBlogForm({ content: e.target.value })}
        placeholder="Share your thoughts or experiences in this post"
        maxLength={350}
        autoSize={{
          minRows: 6,
        }}
        style={{ borderRadius: "15px", paddingTop: "8px" }}
      />
    </li>
  );

  return (
    <>
      {contextHolder}
      <form
        onSubmit={handleSubmit}
        method="POST"
        action="#"
        className="flex flex-col gap-2 lg:gap-3 max-w-md mx-auto py-4 text-left"
      >
        <ul className="flex justify-between gap-4">
          {titleInput}
          {sportSelect}
        </ul>
        {contentTextArea}

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
          disabled={isButtonDisabled || isLoading}
          type="primary"
          shape="round"
          size="large"
          className="w-fit self-end !bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
          icon={
            isLoading ? (
              <Spin size="small" className="white-spin" />
            ) : (
              <SendOutlined size={16} />
            )
          }
          iconPosition="end"
        >
          Post
        </Button>
      </form>
    </>
  );
}

WriteBlogForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default WriteBlogForm;
