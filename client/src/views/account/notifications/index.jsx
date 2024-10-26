import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Tags from "../../../components/static/Tags";
import Footer from "../../../components/static/Footer";
import notificationStore from "../../../store/notificationStore";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getNotificationMessage } from "../../../components/static/notificationMessages";

export default function Notifications() {
  const { id } = useParams();
  const { notification, getNotification } = notificationStore();
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      try {
        await getNotification(id);
      } catch (error) {
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchNotification();
  }, [id, getNotification]);

  if (isLoading) {
    return <Spin size="large" className="green-spin" />;
  }

  const {
    reference_id: referenceId,
    team_name: teamName,
    created_at: createdAt,
    type,
    description,
    date,
    city,
    sport,
    sender,
  } = notification;

  const formattedDate = formatDistanceToNow(parseISO(createdAt), {
    addSuffix: true,
  });

  return (
    <>
      <div className="min-h-screen container mx-auto px-4 my-10">
        <div className="w-full mx-auto p-5 flex flex-col gap-4 lg:gap-5">
          <p className="text-sm text-gray-600 ">{formattedDate}</p>
          <div
            className={`w-full flex flex-col ${
              type === "team_completion" ? "md:flex-row" : "md:flex-row-reverse"
            }  gap-5 justify-between`}
          >
            {type !== "team_completion" && (
              <div className="flex gap-2 md:gap-4 self-end">
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  className="!bg-red-500 disabled:bg-red-500 hover:!bg-red-500 hover:brightness-105 w-fit"
                  icon={<CloseOutlined size={16} />}
                >
                  Reject
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  className="!bg-green disabled:bg-green hover:!bg-green hover:brightness-105 w-fit"
                  icon={<CheckOutlined size={16} />}
                >
                  Accept
                </Button>
              </div>
            )}
            <h3 className="text-lg xl:text-2xl font-medium text-gray-900 capitalize">
              {getNotificationMessage(type, sender, teamName)}
            </h3>
          </div>

          <Tags list={sport} className="py-1 px-4 text-sm" />

          <p className="text-base text-gray-600 sm:max-w-lg lg:max-w-2xl">
            {description}
          </p>

          <div className="flex items-start flex-col md:flex-row gap-4 lg:gap-8 xl:gap-10 mt-4">
            <span className="flex justify-center items-center gap-2 text-gray-500">
              <CalendarOutlined className="text-lg" />
              <p className="text-base">
                {new Date(date).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </span>
            <span className="flex justify-center items-center gap-2 text-gray-500">
              <EnvironmentOutlined className="text-lg" />
              <p className="text-base capitalize">{city}</p>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
