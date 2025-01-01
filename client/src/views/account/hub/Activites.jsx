import { useEffect, useState, useCallback } from "react";
import { Alert, Spin, Button } from "antd";
import EmptyData from "../../../components/static/EmptyData";
import Text from "../../../components/static/Text";
import TeamCard from "../teams/teams/TeamCard";
import PropTypes from "prop-types";
import hubStore from "../../../store/team/hubStore";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

export default function Activities({ title, filter, message }) {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showAll, setShowAll] = useState(false); // State to toggle visibility

  const { teams, fetchHubData } = hubStore();

  const fetchTeamsData = useCallback(async () => {
    try {
      await fetchHubData(filter);
      setIsDataFetched(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fetchHubData, filter]);

  useEffect(() => {
    fetchTeamsData();
  }, [fetchTeamsData]);

  const filteredTeams = teams[filter] || [];

  // Determine how many items to display based on showAll state
  const displayedTeams = showAll ? filteredTeams : filteredTeams.slice(0, 3);

  const teamsList =
    filteredTeams.length > 0 ? (
      <div className="mt-6 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedTeams.map((team, index) => (
          <TeamCard
            key={index}
            teamId={team.id}
            name={team.name}
            members={team.members}
            date={team.date}
            city={team.city}
            sport={team.sport}
            isMember={true}
          />
        ))}
      </div>
    ) : null;

  return (
    <div className="mb-2">
      <Text
        type="title"
        text={title}
        className="mb-2 !text-xl md:!text-2xl xl:!text-3xl"
      />

      {isLoading && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Spin size="large" className="green-spin mx-auto my-20" />
        </div>
      )}
      {!isLoading && teamsList}
      {!isLoading && isError && (
        <Alert
          message="An unexpected error occurred, please refresh the page or try again later"
          type="error"
          className="rounded-xl p-3 my-10 xl:my-16 mx-auto w-fit"
          showIcon
        />
      )}
      {!isLoading &&
        !isError &&
        isDataFetched &&
        filteredTeams.length === 0 && (
          <EmptyData text={message} className="!h-[30vh]" />
        )}

      {/* Show buttons based on the state */}
      {!isLoading && filteredTeams.length > 3 && !showAll && (
        <div className="mt-2 flex justify-end">
          <Button
            onClick={() => setShowAll(true)}
            type="primary"
            shape="round"
            size="large"
            className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
            icon={<ArrowDownOutlined size={16} />}
          >
            Show All
          </Button>
        </div>
      )}

      {/* Show reset button if showAll is true */}
      {!isLoading && showAll && (
        <div className="mt-2 flex justify-end">
          <Button
            onClick={() => setShowAll(false)}
            type="primary"
            shape="round"
            size="large"
            className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green/80 mt-4"
            icon={<ArrowUpOutlined size={16} />}
          >
            Show Less
          </Button>
        </div>
      )}
    </div>
  );
}

Activities.propTypes = {
  title: PropTypes.string,
  filter: PropTypes.string,
  message: PropTypes.string,
};
