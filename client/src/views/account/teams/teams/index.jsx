import { FloatButton } from "antd";
import Footer from "../../../../components/static/Footer";
import CreateTeam from "./create-team";
import TeamCard from "./TeamCard";

function Teams() {
  // const teamsList = teams.length > 0 && (
  //   <div className="mt-6 grid gap-x-6 gap-y-4 md:gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
  //     {teams.map((team, index) => (
  //       <TeamCard />
  //     ))}
  //   </div>
  // );
  return (
    <>
      {/* {contextHolder} */}
      <section className="min-h-screen container mx-auto px-4 my-10">
        <CreateTeam />
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
            sports={["tennis"]}
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
