import { AutoComplete, FloatButton, Select } from "antd";
import Footer from "../../../../components/static/Footer";
import CreateTeam from "./create-team";
import TeamCard from "./TeamCard";
import useSports from "../../../../components/dynamic/SportsNames";
import { useState } from "react";

function Teams() {
  // const teamsList = teams.length > 0 && (
  //   <div className="mt-6 grid gap-x-6 gap-y-4 md:gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
  //     {teams.map((team, index) => (
  //       <TeamCard />
  //     ))}
  //   </div>
  // );

  const sports = useSports();
  const [options, setOptions] = useState([]);

  const sportSelect = (
    <AutoComplete
      options={options}
      placeholder="Type and select a sport"
      size="large"
      className="w-40 sm:w-44"
    />
  );

  const sortBy = (
    <Select
      placeholder="Sort By"
      options={[
        { value: "members_count", label: "Sort by members" },
        { value: "date", label: "Sort by date" },
      ]}
      size="large"
      className="main-select w-36 sm:w-40 !text-xs"
    />
  );
  return (
    <>
      {/* {contextHolder} */}
      <section className="min-h-screen container mx-auto px-4 my-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <CreateTeam />
          <div className="self-end flex gap-4">
            {sportSelect}
            {sortBy}
          </div>
        </div>
        <div className="mt-6 grid gap-x-6 gap-y-4 md:gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <TeamCard
            name="Best team"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, adnesciunt! Reprehenderit accusamus neque voluptatibus.
            "
            members={[
              { username: "sako", gender: "male" },
              { username: "saalako", gender: "female" },
              { username: "saaako", gender: "female" },
              { username: "saaako", gender: "male" },
            ]}
            rest={2}
            date="2024-10-01 00:00:00"
            city="casablanca"
            sport="tennis"
          />
        </div>
        {/* {isLoading && <Spin size="small" className="white-spin" />}
        {!isLoading && isDataFetched && users.length === 0 ? (
          <EmptyData text="No users Found!" />
        ) : (
          usersList
        )}
        {users.length > 0 && (
          <Pagination
            current={pageFromParams}
            pageSize={perPage}
            total={totalUsers}
            onChange={handlePageChange}
            className="mt-6 mx-auto w-fit"
          />
        )} */}
      </section>
      <Footer />
      <FloatButton.BackTop duration={100} />
    </>
  );
}

export default Teams;
