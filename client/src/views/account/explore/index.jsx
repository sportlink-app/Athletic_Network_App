import Users from "./Users";
import Footer from "../../../components/Footer";
import { FloatButton, Pagination } from "antd";
import SportFilter from "./filter/SportFilter";

function Explore() {
  return (
    <>
      <div className=" container mx-auto px-4 my-10">
        <SportFilter />
        <Users />
        <Pagination
          defaultCurrent={2}
          total={30}
          className="mt-6 w-full text-center"
        />
      </div>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Explore;
