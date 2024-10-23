import Card from "../../../../components/static/Card";
import Tags from "../../../../components/static/Tags";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import { Link } from "react-router-dom";

export default function NotificationCard({
  teamName,
  sport,
  owner,
  city,
  date,
  hide,
}) {
  return (
    <Link to="/notification/ss" onClick={hide}>
      <Card className="border-transparent rounded-2xl p-5 flex flex-col gap-4 hover:bg-slate-50 hover:scale-[1.02] hover:!border-gray-300 hover:shadow-lg duration-500 cursor-pointer">
        <div className="w-full flex justify-between">
          <h3 className="text-base font-medium text-gray-900 capitalize">
            {teamName} by {owner.username}
          </h3>
          <Tags list={sport} />
        </div>

        <div className="flex justify-between items-end gap-12">
          <div className="flex flex-col items-start gap-1 ">
            <span className="flex justify-center items-center gap-1 md:gap-2 text-gray-500">
              <CalendarOutlined className="text-sm" />
              <p className="text-xs">
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
              <p className="text-xs capitalize">{city}</p>
            </span>
          </div>
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
        </div>
      </Card>
    </Link>
  );
}

NotificationCard.propTypes = {
  teamName: PropTypes.string,
  sport: PropTypes.string,
  city: PropTypes.string,
  date: PropTypes.string,
  owner: PropTypes.object,
  hide: PropTypes.func, // Added PropType for hide function
};
