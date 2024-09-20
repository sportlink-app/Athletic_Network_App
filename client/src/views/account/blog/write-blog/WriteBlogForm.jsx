import { AutoComplete, Button, Form, Input, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import useSports from "../../../../components/SportsNames";
import { CheckOutlined } from "@ant-design/icons";
import blogStore from "../../../../store/blog/blogStore";
import PropTypes from "prop-types";

function WriteBlogForm({ onSuccess }) {
  const [options, setOptions] = useState([]);
  const sports = useSports();

  // Zustand store state
  const { title, sport, content, setTitle, setSport, setContent, createBlog } =
    blogStore();

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

  // Disable button if any of the inputs are empty
  const isButtonDisabled = !title || !sport || !content;

  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async () => {
    setLoading(true); // Set loading state
    try {
      await createBlog(); // Call the store's createBlog function
      onSuccess();
      messageApi.success("Blog post posted successfully!"); // Show success message
    } catch (error) {
      messageApi.error(error.message); // Show error message
    } finally {
      setLoading(false); // Reset loading state
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

  const sportsSelect = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Sport
      </label>
      <AutoComplete
        options={options}
        value={sport} // Bind selected value from Zustand store
        onSearch={handleSearch}
        onSelect={handleSportSelect} // Update store on select
        placeholder="Start typing to search for a sport"
        size="large"
        className="min-w-36 max-w-36 text-left"
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
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        className="flex flex-col gap-2 lg:gap-3 max-w-sm mx-auto pt-4 text-left"
      >
        <ul className="flex justify-between items-center gap-4">
          {titleInput}
          {sportsSelect}
        </ul>
        {contentTextArea}
        <Button
          onClick={handleSubmit} // Handle form submission
          disabled={isButtonDisabled || isLoading} // Disable button when inputs are empty or loading
          type="primary"
          shape="round"
          size="large"
          className="w-fit self-end bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
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
      </Form>
    </>
  );
}

WriteBlogForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default WriteBlogForm;
