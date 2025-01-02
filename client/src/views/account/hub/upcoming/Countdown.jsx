import { useState, useEffect } from "react";
import { Spin, Statistic } from "antd";
import { AlertOutlined, CalendarOutlined } from "@ant-design/icons";
import { useStore } from "zustand";
import upcomingStore from "../../../../store/team/hubStore";
export default function Countdown() {
  const [isLoading, setLoading] = useState(true); // Initially loading
  const [isError, setError] = useState(false);
  const { Countdown } = Statistic;

  const { countdown, fetchCountdown } = useStore(upcomingStore); // Bind state and actions directly
  const [deadline, setDeadline] = useState(null); // Deadline in milliseconds
  const [message, setMessage] = useState(""); // To display message when countdown ends
  const [format, setFormat] = useState(""); // To dynamically manage countdown format

  useEffect(() => {
    // Fetch the countdown data on component mount
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchCountdown();
      } catch (error) {
        setMessage("You have no upcoming team activities");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchCountdown]);

  useEffect(() => {
    if (countdown) {
      const deadlineTimestamp = Date.now() + countdown.countdown;
      setDeadline(deadlineTimestamp);
    }
  }, [countdown]);

  useEffect(() => {
    if (!deadline) return;

    const updateFormat = () => {
      const remainingTime = deadline - Date.now();

      if (remainingTime <= 0) {
        // If the countdown reaches zero, display the message
        setMessage("It's time! Your activity is starting now!");
        setFormat(""); // Hide countdown format
      } else {
        // If more than 0 seconds left, update format based on remaining time
        if (remainingTime > 1000 * 60 * 60 * 24) {
          setFormat("D [days]"); // More than 24 hours remaining
        } else {
          setFormat("H:m:s"); // Less than 24 hours remaining
        }
      }
    };

    // Initial format update
    updateFormat();

    // Update the format every second
    const interval = setInterval(updateFormat, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Spin size="large" className="green-spin mx-auto my-20" />
        </div>
      ) : (
        <div className="bg-light-cyan/25 px-8 py-6 rounded-xl border-[1px] border-cyan h-[99.71px] flex justify-center items-center w-fit">
          {!isLoading && message && (
            <div className="flex gap-4">
              {isError ? (
                <CalendarOutlined className="text-base xl:text-lg" />
              ) : (
                <AlertOutlined className="text-base xl:text-lg" />
              )}
              <span className="text-base text-slate-700">{message}</span>
            </div>
          )}
          {!isLoading && !isError && deadline && (
            <Countdown
              title="Time left until next activity"
              value={deadline}
              format={format}
            />
          )}
        </div>
      )}
    </>
  );
}
