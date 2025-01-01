import Text from "../../../../components/static/Text";
import { Line } from "@ant-design/charts";

export default function Chart() {
  // Static data for the last 8 weeks
  const data = [
    { activities: 1, week: "Nov 1 - Nov 6" },
    { activities: 4, week: "Nov 7 - Nov 13" },
    { activities: 6, week: "Nov 14 - Nov 19" },
    { activities: 7, week: "Nov 20 - Nov 26" },
    { activities: 5, week: "Nov 27 - Dec 2" },
    { activities: 8, week: "Dec 3 - Dec 9" },
    { activities: 9, week: "Dec 10 - Dec 16" },
  ];

  const config = {
    data,
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

  return (
    <div>
      <Text
        type="title"
        text="Your Weekly Progress"
        className="mb-2 !text-xl md:!text-2xl xl:!text-3xl"
      />
      <div className="max-w-4xl mt-8">
        <Line {...config} colorField="#32dc29" />
      </div>
    </div>
  );
}
