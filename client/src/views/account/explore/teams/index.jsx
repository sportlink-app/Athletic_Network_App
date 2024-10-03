import { FloatButton } from "antd";
import Footer from "../../../../components/static/Footer";
import CreateTeam from "./create-team";

function Teams() {
  return (
    <>
      <section className="min-h-screen container mx-auto px-4 my-10">
        <CreateTeam />
      </section>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Teams;
