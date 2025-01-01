import Activities from "../Activites";
import Countdown from "./Countdown";

export default function Upcoming() {
  return (
    <div className="flex flex-col gap-8">
      <Countdown />
      <Activities
        title="your activities for this week"
        filter="this_week"
        message="You don't have any activities scheduled for this week"
      />
      <Activities
        title="your later activities"
        filter="later"
        message="You don't have any upcoming activities scheduled"
      />
    </div>
  );
}
