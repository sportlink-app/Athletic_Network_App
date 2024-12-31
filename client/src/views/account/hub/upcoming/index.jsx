import Activities from "./Activites";
import Countdown from "./Countdown";

export default function Upcoming() {
  return (
    <div className="flex flex-col gap-8">
      <Countdown />
      <Activities title="This Week" filter="this_week" />
      <Activities title="Later" filter="later" />
    </div>
  );
}
