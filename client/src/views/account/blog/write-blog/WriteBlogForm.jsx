import { AutoComplete, Button, Input, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import useSports from "../../../../components/dynamic/SportsNames";
import { CheckOutlined } from "@ant-design/icons";
import blogStore from "../../../../store/blog/blogStore";
import PropTypes from "prop-types";

function WriteBlogForm({ onSuccess }) {
  const [options, setOptions] = useState([]);
  const sports = useSports();

  // Zustand store state
  const { title, sport, content, setTitle, setSport, setContent, createBlog } =
    blogStore();

  // Disable button if any of the inputs are empty
  const isButtonDisabled = !title || !sport || !content;

  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBlog(); // This will now update the state
      onSuccess();
      messageApi.success("Blog post posted successfully!");
    } catch (error) {
      messageApi.error(error.message);
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
        value={title} // Bind title from Zustand store
        onChange={(e) => setTitle(e.target.value)} // Update store on change
        placeholder="Enter a title for your post"
        size="large"
        style={{ borderRadius: "50px" }}
      />
    </li>
  );

  const handleSportClear = () => {
    setSport(""); // Clear selected sport in Zustand store
  };

  // Filter the sports based on search text
  const getPanelValue = (searchText) =>
    sports
      .filter((name) => name.toLowerCase().includes(searchText.toLowerCase()))
      .map((name) => ({ value: name }));

  // Update options as user types in the AutoComplete input
  const handleSearch = (text) => {
    setOptions(getPanelValue(text));
  };

  // Handle the event when a sport is selected
  const handleSportSelect = (value) => {
    setSport(value); // Update sport in Zustand store
  };

  const sportSelect = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sport
      </label>
      <AutoComplete
        options={options}
        value={sport} // Bind selected value from Zustand store
        onSearch={handleSearch}
        onSelect={handleSportSelect} // Update store on select
        onChange={(text) => {
          if (text === "") {
            handleSportClear();
          } else {
            setSport(text); // Keep local state updated with user input
          }
        }}
        placeholder="Type to search for a sport"
        size="large"
        className="min-w-36 max-w-44 text-left"
      />
    </li>
  );

  const contentTextArea = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Content
      </label>
      <TextArea
        name="content"
        value={content} // Bind content from Zustand store
        onChange={(e) => setContent(e.target.value)} // Update store on change
        placeholder="Share your thoughts or experiences in this post"
        maxLength={350}
        autoSize={{
          minRows: 6,
        }}
        style={{ borderRadius: "15px" }}
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
        <ul className="flex justify-between items-center gap-4">
          {titleInput}
          {sportSelect}
        </ul>
        {contentTextArea}
        <Button
          htmlType="submit"
          disabled={isButtonDisabled || isLoading} // Disable button when inputs are empty or loading
          type="primary"
          shape="round"
          size="large"
          className="w-fit self-end !bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
          icon={
            isLoading ? (
              <Spin size="small" className="white-spin" />
            ) : (
              <CheckOutlined size={16} />
            )
          }
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
