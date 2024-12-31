import { Button, FloatButton } from "antd";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { HourglassOutlined, TrophyOutlined } from "@ant-design/icons";
import HubRoutes from "../../../routes/HubRoutes";
import Footer from "../../../components/static/Footer";

export default function Hub() {
  const location = useLocation(); // Import and use useLocation for current pathname

  return (
    <>
      <section className="min-h-screen container mx-auto px-4 my-10">
        <div className="flex gap-4">
          <Link to="/hub/upcoming">
            <Button
              type="primary"
              shape="round"
              size="large"
              className={`w-fit capitalize !bg-cyan duration-300 ${
                location.pathname === "/hub/upcoming"
                  ? "brightness-[1.06]"
                  : "hover:brightness-[1.06]"
              } `}
              icon={<HourglassOutlined size={16} />}
            >
              Upcoming
            </Button>
          </Link>
          <Link to="/hub/achievements">
            <Button
              type="primary"
              shape="round"
              size="large"
              className={`w-fit capitalize !bg-cyan duration-300 ${
                location.pathname === "/hub/achievements"
                  ? "brightness-[1.06]"
                  : "hover:brightness-[1.06]"
              } `}
              icon={<TrophyOutlined size={16} />}
            >
              Achievements
            </Button>
          </Link>
        </div>

        <div className="mt-6">
          <Routes>
            <Route path="/*" element={<HubRoutes />} />
          </Routes>
        </div>
      </section>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}
