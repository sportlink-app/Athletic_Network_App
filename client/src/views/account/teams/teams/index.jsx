import { FloatButton, message, Pagination } from "antd";
import Footer from "../../../../components/static/Footer";
import CreateTeam from "./create-team";
import TeamCard from "./TeamCard";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import teamStore from "../../../../store/team/teamStore";
import SportFilter from "./filters/SportFilter";
import SortByFilter from "./filters/SortByFilter";
import EmptyData from "../../../../components/static/EmptyData";

function Teams() {
  const {
    teams,
    totalTeams,
    currentPage,
    perPage,
    fetchTeams,
    setSportFilter,
  } = teamStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = Number(searchParams.get("page")) || currentPage;
  const sportFromParams = searchParams.get("sport") || "";
  const [sortBy, setSortBy] = useState("date");

  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);

  const navigate = useNavigate();

  const fetchTeamsData = useCallback(async () => {
    setLoading(true);
    try {
      await fetchTeams(pageFromParams, perPage, sportFromParams, sortBy);
      setIsDataFetched(true);
    } catch (error) {
      if (error.message === "400") {
        navigate(`/`);
      } else if (error.message === "403") {
        navigate("/login");
      } else {
        messageApi.error(
          "An unexpected error occurred, please refresh the page or try again later"
        );
      }
    } finally {
      setLoading(false);
    }
  }, [
    pageFromParams,
    perPage,
    sportFromParams,
    sortBy,
    fetchTeams,
    messageApi,
    navigate,
  ]);

  useEffect(() => {
    fetchTeamsData();
  }, [fetchTeamsData]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (page) => {
    setSearchParams({ page, sport: sportFromParams });
    scrollToTop();
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setSearchParams({ page: 1, sport: sportFromParams, sort_by: sortValue });
  };

  const handleSportChange = (sport) => {
    setSearchParams({ page: 1, sport, sort_by: sortBy });
    setSportFilter(sport); // Update sport filter in store
  };

  const teamsList = teams.length > 0 && (
    <div className="mt-6 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team, index) => (
        <TeamCard
          key={index}
          teamId={team.id}
          name={team.name}
          description={team.description}
          members={team.members}
          rest={team.rest}
          date={team.date}
          city={team.city}
          sport={team.sport}
          isMember={team.isMember}
          isRequested={team.isRequested}
        />
      ))}
    </div>
  );

  return (
    <>
      {contextHolder}
      <section className="min-h-screen container mx-auto px-4 my-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <CreateTeam />
          <div className="self-end flex gap-4">
            <SportFilter onSportChange={handleSportChange} />
            <SortByFilter onSortChange={handleSortChange} />
          </div>
        </div>

        {!isLoading && isDataFetched && teams.length === 0 ? (
          <EmptyData text="No teams found!" />
        ) : (
          teamsList
        )}

        {teams.length > 0 && (
          <Pagination
            current={pageFromParams}
            pageSize={perPage}
            total={totalTeams}
            onChange={handlePageChange}
            className="mt-10 mx-auto w-fit"
          />
        )}
      </section>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Teams;
