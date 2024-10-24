import Card from "../../../../components/static/Card";
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function NotificationCard({
  notificationType,
  inviteId,
  createdAt,
  teamName,
  sender,
  hide,
}) {
  const inviteMessage = `${sender.username} has invited you to join the team ${teamName}`;
  const demandMessage = `${sender.username} has accepted your request to join the team ${teamName}`;

  // Convert createdAt to a readable format
  const formattedDate = formatDistanceToNow(parseISO(createdAt), {
    addSuffix: true,
  });

  return (
    <Link to="/notification/ss" onClick={hide}>
      <Card className=" border-transparent rounded-2xl p-5 flex gap-6 hover:bg-slate-50 hover:scale-[1.02] hover:!border-gray-300 hover:shadow-lg duration-500 cursor-pointer">
        <div className="flex flex-col justify-between gap-5">
          <h3 className="text-base text-gray-900">
            {notificationType == "invite" ? inviteMessage : demandMessage}
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
          />
          {notificationType == "invite" && (
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
  );
}

NotificationCard.propTypes = {
  notificationType: PropTypes.string,
  inviteId: PropTypes.string,
  teamName: PropTypes.string,
  createdAt: PropTypes.string,
  sender: PropTypes.object,
  hide: PropTypes.func,
};
