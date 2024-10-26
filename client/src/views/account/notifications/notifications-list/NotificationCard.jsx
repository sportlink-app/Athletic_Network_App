import Card from "../../../../components/static/Card";
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, message, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import notificationStore from "../../../../store/notificationStore";
import { getNotificationMessage } from "../../../../components/static/notificationMessages";

export default function NotificationCard({
  id,
  isVisited,
  type,
  referenceId,
  createdAt,
  teamName,
  sender,
  hide,
}) {
  const { deleteNotification } = notificationStore();
  const [messageApi, contextHolder] = message.useMessage();

  const formattedDate = formatDistanceToNow(parseISO(createdAt), {
    addSuffix: true,
  });

  const handleNotificationDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteNotification(id);
      messageApi.success("Notification deleted successfully!");
    } catch (error) {
      messageApi.error("Failed to delete notification!");
    }
  };

  return (
    <>
      {contextHolder}
      <Link to={`/notification/${id}`} onClick={hide}>
        <Card
          className={`${
            !isVisited ? "!bg-green/10 hover:!bg-green/5 !border-green" : ""
          } border-transparent rounded-2xl p-5 flex gap-5 hover:bg-slate-50 hover:scale-[1.02] hover:!border-gray-300 hover:shadow-lg duration-500 cursor-pointer`}
        >
          <div className="flex flex-col justify-between">
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
            {type !== "team_completion" && (
              <div className="flex gap-2">
                <Tooltip title="Accept" color="green">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CheckOutlined />}
                    className="!bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
                  />
                </Tooltip>
                <Tooltip title="Reject" color="red">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    className="!bg-red-500 disabled:bg-red-500 hover:!bg-red-500 hover:brightness-105"
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </Card>
      </Link>
    </>
  );
}

NotificationCard.propTypes = {
  id: PropTypes.number.isRequired,
  isVisited: PropTypes.bool,
  type: PropTypes.string.isRequired,
  referenceId: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  teamName: PropTypes.string,
  sender: PropTypes.object,
  hide: PropTypes.func,
};
