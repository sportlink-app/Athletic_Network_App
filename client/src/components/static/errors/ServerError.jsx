import Container from "../Container";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

function ServerError() {
  return (
    <Container className="h-[calc(100vh-59.19px)] w-screen flex flex-col justify-center items-center ">
      <p className="text-7xl md:text-8xl lg:text-9xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green !leading-tight">
        500
      </p>
      <h1 className=" text-3xl font-semibold tracking-tight text-gray-600 ">
        Server Error
      </h1>
      <p className="mt-3 text-lg leading-7 text-gray-600">
        Sorry, we couldn&apos;t complete your request.
      </p>

      <Link to="/">
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<ArrowLeftOutlined />}
          iconPosition="start"
          className="mt-6 !bg-gradient-to-r !from-cyan !to-green hover:brightness-105  duration-300"
        >
          Back Home
        </Button>
      </Link>
    </Container>
  );
}
export default ServerError;
