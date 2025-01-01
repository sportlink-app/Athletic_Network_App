import Activities from "./Activites";
import Countdown from "./Countdown";

export default function Upcoming() {
  return (
    <div className="flex flex-col gap-8">
      <Countdown />
      <Activities title="Your Activities for This Week" filter="this_week" />
      <Activities title="Your Later Activities" filter="later" />
    </div>
  );
}
