import { useEffect, useState, useCallback } from "react";
import { Alert, Spin } from "antd";
import EmptyData from "../../../../components/static/EmptyData";
import Text from "../../../../components/static/Text";
import TeamCard from "../../teams/teams/TeamCard";
import upcomingStore from "../../../../store/team/upcomingStore";
import PropTypes from "prop-types";

export default function Activities({ title, filter }) {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const { teams, fetchUpcoming } = upcomingStore();

  const fetchTeamsData = useCallback(async () => {
    try {
      await fetchUpcoming(filter);
      setIsDataFetched(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fetchUpcoming, filter]);

  useEffect(() => {
    fetchTeamsData();
  }, [fetchTeamsData]);

  const filteredTeams = teams[filter] || [];
  const teamsList =
    filteredTeams.length > 0 ? (
      <div className="mt-6 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team, index) => (
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
      <Text type="title" text={title} className="mb-2" />

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
          <EmptyData text="You don't have any scheduled activities" />
        )}
    </div>
  );
}

Activities.propTypes = {
  title: PropTypes.string,
  filter: PropTypes.string,
};
