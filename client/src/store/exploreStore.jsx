import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import Footer from "../../../components/Footer";
import { Pagination, message } from "antd";
import SportFilter from "./filter/SportFilter";
import UserCard from "./UserCard";
import usersStore from "../../../store/user/usersStore";

function Explore() {
  const { users, totalUsers, currentPage, perPage, fetchUsers } = usersStore();
  const [selectedSport, setSelectedSport] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [searchParams, setSearchParams] = useSearchParams(); // Get search params

  // Extract page and sport from search params
  const pageFromParams = searchParams.get("page") || currentPage;
  const sportFromParams = searchParams.get("sport") || "";

  // Fetch users when the component mounts or when params change
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        await fetchUsers(pageFromParams, perPage, sportFromParams);
      } catch (error) {
        messageApi.error("An error occurred while fetching users data.");
      }
    };

    fetchUsersData();
  }, [fetchUsers, pageFromParams, perPage, sportFromParams, messageApi]); // Add dependencies

  // Handle page change
  const handlePageChange = (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSearchParams({ page, sport: selectedSport });
  };

  // Handle sport selection from the filter
  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    setSearchParams({ page: 1, sport }); // Reset to first page when changing sport
  };

  const usersList = users.map((user, index) => (
    <UserCard
      key={index}
      username={user.username}
      gender={user.gender}
      city={user.city}
      sports={user.sports}
      availability={true}
    />
  ));

  return (
    <>
      {contextHolder}
      <div className="min-h-screen container mx-auto px-4 my-10">
        <SportFilter onSportSelect={handleSportSelect} />
        <div className="mt-6 grid gap-x-6 gap-y-4 md:gap-y-6 lg:grid-cols-4 xl:gap-x-8">
          {usersList}
        </div>
      </div>
      <Pagination
        current={Number(pageFromParams)}
        pageSize={perPage}
        total={totalUsers}
        onChange={handlePageChange}
        className="mt-6 w-full text-center"
      />
      <Footer />
    </>
  );
}

export default Explore;
