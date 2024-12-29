import Card from "../../../../components/static/Card";
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, message, Tag, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import notificationStore from "../../../../store/notificationStore";
import { getNotificationMessage } from "../../../../components/static/notificationMessages";
import teamStore from "../../../../store/team/teamStore";
import { useState } from "react";

export default function NotificationCard({
  id,
  teamId,
  isVisited,
  type,
  isTeamCompleted,
  referenceId,
  createdAt,
  teamName,
  sender,
  hide,
}) {
  const { deleteNotification } = notificationStore();
  const { inviteRespond, joinRespond } = teamStore();

  const formattedDate = formatDistanceToNow(parseISO(createdAt), {
    addSuffix: true,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const [isRejectLoading, setRejectLoading] = useState(false);
  const [isAcceptLoading, setAcceptLoading] = useState(false);

  const handleNotificationDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteNotification(id);
      messageApi.success("Notification deleted!");
    } catch (error) {
      messageApi.error("Failed to delete notification!");
    }
  };

  const navigate = useNavigate();
  const handleInviteRespond = async (e, action) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    if (action === "accept") {
      setAcceptLoading(true);
    } else setRejectLoading(true);
    try {
      await inviteRespond(referenceId, action);
      messageApi.success(`Invite ${action}ed!`);
      if (action === "accept") {
        hide();
        navigate(`/team/${teamId}`);
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
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRespond = async (e, action) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    if (action === "accept") {
      setAcceptLoading(true);
    } else setRejectLoading(true);
    try {
      await joinRespond(referenceId, action);
      messageApi.success(`Join request ${action}ed!`);
      if (action === "accept") {
        hide();
        navigate(`/team/${teamId}`);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Link
        to={
          type === "team_completion"
            ? `/team/${referenceId}`
            : `/notification/${id}`
        }
        onClick={hide}
      >
        <Card
          className={`${
            !isVisited ? "!bg-green/5 hover:!bg-green/10 !border-green" : ""
          }  border-transparent rounded-2xl p-5 flex gap-5 justify-between hover:bg-slate-50 hover:scale-[1.02] !border-gray-300 hover:shadow-lg duration-500 cursor-pointer`}
        >
          <div className="flex flex-col justify-between gap-2">
            <h3 className="text-base text-gray-900">
              {getNotificationMessage(type, sender, teamName)}
            </h3>
            <p className="text-xs text-slate-600">{formattedDate}</p>
          </div>
          <div className="flex flex-col justify-between items-end gap-5">
            <Button
              type="primary"
              shape="circle"
              size="middle"
              className="!bg-slate-50 hover:!bg-slate-200 !text-slate-800"
              icon={<DeleteOutlined />}
              onClick={handleNotificationDelete}
            />
            {((!isTeamCompleted && type === "team_invite") ||
              (!isTeamCompleted && type === "team_join")) && (
              <div className="flex gap-2">
                <Tooltip title="Accept" color="#32dc29">
                  <Button
                    onClick={
                      type === "team_invite"
                        ? (e) => handleInviteRespond(e, "accept")
                        : (e) => handleJoinRespond(e, "accept")
                    }
                    disabled={isLoading}
                    loading={isAcceptLoading}
                    type="primary"
                    shape="circle"
                    icon={<CheckOutlined />}
                    className="!bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
                  />
                </Tooltip>
                <Tooltip title="Reject" color="red">
                  <Button
                    onClick={
                      type === "team_invite"
                        ? (e) => handleInviteRespond(e, "reject")
                        : (e) => handleJoinRespond(e, "reject")
                    }
                    disabled={isLoading}
                    loading={isRejectLoading}
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    className="!bg-red-500 disabled:bg-red-500 hover:!bg-red-500 hover:brightness-105"
                  />
                </Tooltip>
              </div>
            )}
            {isTeamCompleted &&
              (type === "team_invite" || type === "team_join") && (
                <Tag
                  bordered={false}
                  color="warning"
                  className="py-1 px-2 rounded-full"
                  icon={<ExclamationCircleOutlined />}
                >
                  Team is completed
                </Tag>
              )}
          </div>
        </Card>
      </Link>
    </>
  );
}

NotificationCard.propTypes = {
  id: PropTypes.number.isRequired,
  teamId: PropTypes.number,
  isVisited: PropTypes.bool,
  type: PropTypes.string.isRequired,
  isTeamCompleted: PropTypes.bool,
  referenceId: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
  teamName: PropTypes.string,
  sender: PropTypes.object,
  hide: PropTypes.func,
};
