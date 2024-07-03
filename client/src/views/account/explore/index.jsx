import Filter from "./filter";
import Users from "./Users";
import Footer from "../../../components/Footer";
import { FloatButton } from "antd";

function Explore() {
  return (
    <>
      <div className=" container mx-auto px-4 my-10 ">
        <Filter />
        <Users />
      </div>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Explore;
