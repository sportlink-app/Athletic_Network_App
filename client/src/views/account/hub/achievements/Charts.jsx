import Text from "../../../../components/static/Text";
import { Line } from "@ant-design/charts";
import { memo, useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { isEqual } from "lodash-es";
import PropTypes from "prop-types";
import { Alert } from "antd";
import hubStore from "../../../../store/team/hubStore";

export default function Charts() {
  const { engagingSports, getProgress, getEngagingSports } =
    hubStore();
  const [loading, setLoading] = useState(true);
  const progressData = [
    {
        "activities": 3,
        "week": "Dec 23 - Dec 29"
    },
    {
        "activities": 4,
        "week": "Dec 30 - Jan 05"
    },
    {
        "activities": 2,
        "week": "Jan 06 - Jan 12"
    },
    {
        "activities": 5,
        "week": "Jan 13 - Jan 19"
    },
    {
        "activities": 4,
        "week": "Jan 20 - Jan 26"
    },
    {
        "activities": 3,
        "week": "Jan 27 - Feb 02"
    }
]


  // Trigger API calls when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProgress();
        await getEngagingSports();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getProgress, getEngagingSports]);

  // Config for Line chart
  const lineConfig = {
    data: progressData,
    height: 300,
    xField: "week",
    yField: "activities",
    point: {
      size: 6,
      shape: "circle",
    },
    xAxis: {
      label: {
        autoRotate: true,
        formatter: (text) => text, // Formats week labels
      },
    },
    tooltip: {
      title: "Week Range",
    },
  };

  // Memoized Pie component
  const DemoPie = memo(
    function DemoPie({ data, onReady }) {
      const config = {
        data,
        angleField: "times",
        colorField: "sport",
        label: {
          text: "sport",
          position: "outside",
        },
        onReady,
      };
      return <Pie {...config} />;
    },
    (prevProps, nextProps) => {
      return isEqual(prevProps.data, nextProps.data);
    }
  );

  // Add PropTypes validation
  DemoPie.propTypes = {
    data: PropTypes.array.isRequired,
    onReady: PropTypes.func.isRequired,
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-10 xl:gap-16 2xl:gap-20 lg:flex-row lg:justify-between">
      <>
        <div className="w-full lg:w-2/5">
          <Text
            text="Your Engaging Sports Activities"
            className="mb-2 !text-xl md:!text-2xl xl:!text-3xl "
          />
          {engagingSports.length === 0 ? (
            <Alert
              message="No activities yet. Start your first one to track progress!"
              type="warning"
              className="rounded-xl px-5 py-4 my-16 w-fit "
              showIcon
            />
          ) : (
            <div className="mt-8" style={{ width: "300px" }}>
              <DemoPie data={engagingSports} onReady={() => {}} />
            </div>
          )}
        </div>
        <div className="w-full lg:w-3/5">
          <Text
            text="Your Weekly Progress"
            className="mb-2 !text-xl md:!text-2xl xl:!text-3xl"
          />
          {progressData.length === 0 ? (
            <Alert
              message="No progress data yet. Stay consistent to see your growth!"
              type="warning"
              className="rounded-xl px-5 py-4 my-16 w-fit "
              showIcon
            />
          ) : (
            <div className="max-w-3xl mt-8">
              <Line {...lineConfig} colorField="#32dc29" />
            </div>
          )}
        </div>
      </>
    </div>
  );
}
