import { Button, Form, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function WriteBlogModal() {
  const SportSelect = (
    <li className="w-32 mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Gender
      </label>
      <Select
        placeholder="Select your gender"
        // value={genderValue}
        // onChange={handleGenderChange}
        style={{ borderRadius: "15px" }}
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        size="large"
        className="w-full lg:w-[110%]"
      />
    </li>
  );
  const blogTextArea = (
    <li className="mt-2 flex flex-col gap-1">
      <label className="ml-2 font-medium leading-6 text-gray-900 capitalize">
        Bio
      </label>
      <TextArea
        name="bio"
        // value={editForm.bio}
        // onChange={handleUpdateFieldChange}
        // status={errors.bio ? "error" : ""}
        placeholder="Write a brief biography about yourself"
        maxLength={350}
        autoSize={{
          minRows: 6,
        }}
        style={{ borderRadius: "15px" }}
      />
      {/* {errors.bio && <p className="text-sm ml-2 text-red-500">{errors.bio}</p>} */}
    </li>
  );
  return (
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
      {SportSelect}
      {blogTextArea}

      <Button
        //   disabled={!isFormComplete || isLoading}
        type="primary"
        shape="round"
        size="large"
        className="bg-green hover:!bg-green/80 w-fit self-end mt-6"
        //   icon={
        //     isLoading ? (
        //       <Spin size="small" className="white-spin" />
        //     ) : (
        //       <CheckOutlined size={16} />
        //     )
        //   }
        iconPosition="end"
      >
        Post
      </Button>
    </Form>
  );
}

export default WriteBlogModal;
