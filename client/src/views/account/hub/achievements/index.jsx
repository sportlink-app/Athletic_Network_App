import Activities from "../Activites";
import Charts from "./Charts";

export default function Achievements() {
  return (
    <div className="flex flex-col gap-8">
      <Activities
        title="your finished team activities"
        filter="finished"
        message="You haven't completed any activities yet"
      />
      <Charts />
    </div>
  );
}
