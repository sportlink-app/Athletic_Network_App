import Filter from "./filter";
import Users from "./Users";
import Footer from "../../../components/Footer";
import { FloatButton, Pagination } from "antd";

function Explore() {
  return (
    <>
      <div className=" container mx-auto px-4 my-10 text-center">
        <Filter />
        <Users />
        <Pagination defaultCurrent={2} total={30} className="mt-6" />
      </div>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Explore;
