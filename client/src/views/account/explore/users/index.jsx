import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../../../../components/static/Footer";
import { Pagination, Spin, message } from "antd";
import SportFilter from "./filter/SportFilter";
import UserCard from "./UserCard";
import usersStore from "../../../../store/user/usersStore";
import EmptyData from "../../../../components/static/EmptyData";

function Users() {
  const { users, totalUsers, currentPage, perPage, fetchUsers } = usersStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if the data fetch is complete

  // Get page and sport from URL params or fallback to defaults
  const pageFromParams = Number(searchParams.get("page")) || currentPage;
  const sportFromParams = searchParams.get("sport") || "";

  // Fetch users data
  const fetchUsersData = useCallback(async () => {
    try {
      setLoading(true);
      await fetchUsers(pageFromParams, perPage, sportFromParams);
      setIsDataFetched(true); // Mark data as fetched once complete
    } catch (error) {
      messageApi.error("An error occurred while fetching users data.");
    } finally {
      setLoading(false);
    }
  }, [pageFromParams, perPage, sportFromParams, fetchUsers, messageApi]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // Smoothly scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setSearchParams({ page, sport: sportFromParams });
    scrollToTop();
  };

  // Handle sport selection from the filter
  const handleSportSelect = (sport) => {
    setSearchParams({ page: 1, sport }); // Reset to first page when changing sport
    scrollToTop();
  };

  // Render user list or EmptyData based on loading and user data status
  const usersList = users.length > 0 && (
    <div className="mt-6 grid gap-x-6 gap-y-4 md:gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
      {users.map((user, index) => (
        <UserCard
          key={index}
          username={user.username}
          gender={user.gender}
          city={user.city}
          sports={user.sports}
          availability={true}
        />
      ))}
    </div>
  );

  return (
    <>
      {contextHolder}

      <section className="min-h-screen container mx-auto px-4 my-10 ">
        <SportFilter
          onSportSelect={handleSportSelect}
          initialSport={sportFromParams} // Pass the sport from URL as initial value
        />
        {isLoading && <Spin size="small" className="white-spin" />}
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
        )}
      </section>

      <Footer />
    </>
  );
}

export default Users;
