import { Button, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  CheckOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Tags from "../../../components/static/Tags";
import Footer from "../../../components/static/Footer";
import notificationStore from "../../../store/notificationStore";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getNotificationMessage } from "../../../components/static/notificationMessages";
import teamStore from "../../../store/team/teamStore";

export default function Notifications() {
  const { id } = useParams();
  const { notification, getNotification } = notificationStore();
  const [isLoading, setLoading] = useState(false);

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
  }, [id, getNotification, navigate]);

  const {
    reference_id: referenceId,
    team_name: teamName,
    created_at: createdAt,
    team_id: teamId,
    type,
    description,
    date,
    city,
    sport,
    sender,
  } = notification || {};

  const formattedDate = createdAt
    ? formatDistanceToNow(parseISO(createdAt), { addSuffix: true })
    : "Date not available";

  const { inviteRespond } = teamStore();
  const [isDisabled, setDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleInviteRespond = async (action) => {
    setDisabled(true);
    try {
      await inviteRespond(referenceId, action);
      messageApi.success(`Invite ${action}ed successfully`);
    } catch (error) {
      messageApi.error(error.message);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen container mx-auto px-4 my-10 ">
        {isLoading ? (
          <div className="w-full h-[70vh] flex justify-center items-center">
            <Spin size="large" className="green-spin mx-auto my-20" />
          </div>
        ) : notification ? ( // Check if notification is not null
          <div className="w-full mx-auto p-5 flex flex-col gap-4 lg:gap-5">
            <p className="text-sm text-gray-600">{formattedDate}</p>
            <div
              className={`w-full flex flex-col ${
                type === "team_invite" || type === "join_request"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              } gap-5 justify-between`}
            >
              {(type === "team_invite" || type === "join_request") && (
                <div className="flex gap-2 md:gap-4 self-end">
                  <Button
                    onClick={() => handleInviteRespond("reject")}
                    disabled={isDisabled}
                    type="primary"
                    shape="round"
                    size="large"
                    className="!bg-red-500 disabled:bg-red-500 hover:!bg-red-500 hover:brightness-105 w-fit"
                    icon={<CloseOutlined size={16} />}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleInviteRespond("accept")}
                    disabled={isDisabled}
                    type="primary"
                    shape="round"
                    size="large"
                    className="!bg-green disabled:bg-green hover:!bg-green hover:brightness-105 w-fit"
                    icon={<CheckOutlined size={16} />}
                  >
                    {type === "team_invite" ? "Join" : "Accept"}
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

            <div className="flex items-start flex-col md:flex-row gap-4 lg:gap-8 xl:gap-10">
              <span className="flex justify-center items-center gap-2 text-gray-500">
                <CalendarOutlined className="text-sm" />
                <p className="text-base">
                  {date
                    ? new Date(date).toLocaleString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Date not available"}
                </p>
              </span>
              <span className="flex justify-center items-center gap-2 text-gray-500">
                <EnvironmentOutlined className="text-sm" />
                <p className="text-base capitalize">
                  {city || "City not available"}
                </p>
              </span>
            </div>
            <Link to={`/team/${teamId}`} className="mt-2">
              <Button
                type="primary"
                shape="round"
                size="large"
                className="!bg-cyan hover:!bg-cyan hover:brightness-105 w-fit "
                icon={<ArrowRightOutlined />}
                iconPosition="end"
              >
                View Team
              </Button>
            </Link>
          </div>
        ) : (
          <p className="text-lg text-gray-600">Notification not found</p>
        )}
      </div>
      <Footer />
    </>
  );
}
