import { Button, message, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ScheduleOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  CheckOutlined,
  ArrowRightOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Tags from "../../../components/static/Tags";
import Footer from "../../../components/static/Footer";
import notificationStore from "../../../store/notificationStore";
import { getNotificationMessage } from "../../../components/static/notificationMessages";
import teamStore from "../../../store/team/teamStore";
import BackButton from "../../../components/static/BackButton";
import timeAgo from "../../../components/utils/timeAgo";

export default function Notifications() {
  const { id } = useParams();
  const { notification, getNotification } = notificationStore();
  const [isLoading, setLoading] = useState(false);
  const [isRejectLoading, setRejectLoading] = useState(false);
  const [isAcceptLoading, setAcceptLoading] = useState(false);

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
    is_team_completed: isTeamCompleted,
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
    is_date_deprecated: isDateDeprecated,
  } = notification || {};

  const { inviteRespond, joinRespond } = teamStore();
  const [isDisabled, setDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleInviteRespond = async (action) => {
    setDisabled(true);
    if (action === "accept") {
      setAcceptLoading(true);
    } else setRejectLoading(true);
    try {
      await inviteRespond(referenceId, action);
      if (action === "accept") {
        navigate(`/team/${teamId}`);
      } else {
        navigate("/teams");
      }
    } catch (error) {
      if (error.message === "401") {
        messageApi.warning(
          "The team is already completed. You cannot accept this invitation."
        );
      } else {
        messageApi.error(
          "Failed to respond to invitation, please refresh the page or try again later"
        );
      }
    }
  };

  const handleJoinRespond = async (action) => {
    setDisabled(true);
    if (action === "accept") {
      setAcceptLoading(true);
    } else setRejectLoading(true);
    try {
      await joinRespond(referenceId, action);
      if (action === "accept") {
        navigate(`/team/${teamId}`);
      } else {
        navigate("/teams");
      }
    } catch (error) {
      if (error.message === "401") {
        messageApi.warning(
          "The team is already completed. You cannot accept this request."
        );
      } else {
        messageApi.error(
          "Failed to respond to join request, please refresh the page or try again later"
        );
      }
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
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className=" flex justify-between gap-4 ">
              <BackButton />
              <div
                className={`flex flex-col ${
                  type === "team_invite" || type === "team_join"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                } gap-5 justify-between`}
              >
                {isDateDeprecated && !isTeamCompleted && (
                  <Tag
                    bordered={false}
                    color="error"
                    className="w-fit rounded-full text-base py-1 md:py-2 px-3 md:px-4 self-end lg:self-start"
                  >
                    <CloseCircleOutlined />
                    <span>Date Has Passed</span>
                  </Tag>
                )}
                {((!isDateDeprecated &&
                  !isTeamCompleted &&
                  type === "team_invite") ||
                  (!isDateDeprecated &&
                    !isTeamCompleted &&
                    type === "team_join")) && (
                  <div className="flex gap-2 md:gap-4 self-end">
                    <Button
                      onClick={
                        type === "team_invite"
                          ? () => handleInviteRespond("reject")
                          : () => handleJoinRespond("reject")
                      }
                      disabled={isDisabled || isLoading}
                      loading={isRejectLoading}
                      type="primary"
                      shape="round"
                      size="large"
                      className="!bg-red-500 disabled:bg-red-500 hover:!bg-red-500 hover:brightness-105 w-fit"
                      icon={<CloseOutlined size={16} />}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={
                        type === "team_invite"
                          ? () => handleInviteRespond("accept")
                          : () => handleJoinRespond("accept")
                      }
                      disabled={isDisabled || isLoading}
                      loading={isAcceptLoading}
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
                {isTeamCompleted &&
                  (type === "team_invite" || type === "team_join") && (
                    <Tag
                      bordered={false}
                      color="warning"
                      className="w-fit py-2 px-4 text-base rounded-full !mr-0"
                      icon={<ExclamationCircleOutlined />}
                    >
                      Team is completed
                    </Tag>
                  )}
              </div>
            </div>
            <h3 className="text-lg xl:text-2xl font-medium text-gray-900 capitalize">
              {getNotificationMessage(type, sender, teamName)}
            </h3>
            <div className="w-full mx-auto flex flex-col gap-4 ">
              <p className="text-base text-gray-500">
                About {timeAgo(createdAt)}
              </p>

              <Tags list={sport} className="py-1 px-4 text-sm" />

              <p className="text-base text-gray-600 sm:max-w-lg lg:max-w-2xl">
                {description}
              </p>

              <div className="mt-2 flex flex-col md:flex-row lg:flex-col gap-2 md:gap-10 lg:gap-2">
                <span className="flex items-center gap-2 text-gray-500">
                  <ScheduleOutlined className="text-base pb-[.15rem]" />
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
                <span className="flex items-center gap-2 text-gray-500">
                  <EnvironmentOutlined className="text-sm pb-[.15rem]" />
                  <p className="text-base capitalize">{city}</p>
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
          </div>
        ) : (
          <p className="text-lg text-gray-600">Notification not found</p>
        )}
      </div>
      <Footer />
    </>
  );
}
