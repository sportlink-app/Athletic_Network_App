import ProfileAvatar from "../../../components/dynamic/Avatar";
import Card from "../../../components/static/Card";
import Tags from "../../../components/static/Tags";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { getRandomColor } from "../../../components/utils/randomColor";

export default function NotificationCard({
  teamName,
  sport,
  owner,
  inviteId,
  city,
  date,
}) {
  return (
    <Card className="h-full rounded-2xl p-5 flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <h3 className="text-base lg:text-lg xl:text-2xl font-medium text-gray-900 capitalize">
          {teamName} by {owner.username}
        </h3>
        <Tags list={sport} />
      </div>

      <div className="flex justify-between items-end gap-4 ">
        <div className="flex flex-col items-start gap-1 ">
          <span className="flex justify-center items-center gap-1 md:gap-2 text-gray-500">
            <CalendarOutlined className="text-sm" />
            <p className="text-xs sm:text-sm ">
              {new Date(date).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </span>
          <span className="flex justify-center items-center gap-1 md:gap-2 text-gray-500">
            <EnvironmentOutlined className="text-sm" />
            <p className="text-xs sm:text-sm  capitalize">{city}</p>
          </span>
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-2 md:gap-4">
          <Button
            type="primary"
            shape="round"
            size="large"
            className="!bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
            icon={<CheckOutlined size={16} />}
          >
            Accept
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="!bg-red-500 disabled:bg-red-500 hover:!bg-red-500 hover:brightness-105"
            icon={<CloseOutlined size={16} />}
          >
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
}

NotificationCard.propTypes = {
  teamName: PropTypes.string,
  sport: PropTypes.string,
  city: PropTypes.string,
  date: PropTypes.string,
  owner: PropTypes.object,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
