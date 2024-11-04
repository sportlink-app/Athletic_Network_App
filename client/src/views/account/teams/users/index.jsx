import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Footer from "../../../../components/static/Footer";
import { Button, Pagination, message } from "antd";
import UsernameFilter from "./UsernameFilter"; // Updated import
import UserCard from "./UserCard";
import usersStore from "../../../../store/user/usersStore";
import EmptyData from "../../../../components/static/EmptyData";
import { CheckOutlined } from "@ant-design/icons";

export default function Users() {
  const { users, totalUsers, currentPage, perPage, fetchUsers } = usersStore();

  const { teamId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = Number(searchParams.get("page")) || currentPage;
  const usernameFromParams = searchParams.get("username") || "";

  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);

  const navigate = useNavigate();
  const fetchUsersData = useCallback(async () => {
    try {
      setLoading(true);
      await fetchUsers(teamId, pageFromParams, perPage, usernameFromParams);
      setIsDataFetched(true);
    } catch (error) {
      if (error.message === "400") {
        navigate(`/team/${teamId}`);
      } else if (error.message === "403") {
        navigate("/teams");
      } else {
        messageApi.error(
          "An unexpected error occurred, please refresh the page or try again later"
        );
      }
    } finally {
      setLoading(false);
    }
  }, [
    teamId,
    pageFromParams,
    perPage,
    usernameFromParams,
    fetchUsers,
    messageApi,
    navigate,
  ]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setSearchParams({ page, username: usernameFromParams });
    scrollToTop();
  };

  // Handle username search
  const handleUsernameSearch = (username) => {
    setSearchParams({ page: 1, username }); // Reset to first page when changing username
    scrollToTop();
  };

  const [invitedUsers, setInvitedUsers] = useState(new Set());
  // Function to update invited users state
  const handleInviteSuccess = (id) => {
    setInvitedUsers((prev) => new Set(prev).add(id));
  };

  // Render user list or EmptyData based on loading and user data status
  const usersList = users.length > 0 && (
    <div className="mt-6 grid gap-x-6 gap-y-4 md:gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
      {users.map((user, index) => (
        <UserCard
          key={index}
          id={user.id}
          username={user.username}
          gender={user.gender}
          city={user.city}
          sports={user.sports}
          teamId={teamId}
          isInvited={invitedUsers.has(user.id) || user.isInvited}
          isMember={user.isMember}
          onInviteSuccess={handleInviteSuccess}
        />
      ))}
    </div>
  );

  return (
    <>
      {contextHolder}

      <section className="min-h-screen container mx-auto px-4 my-10 ">
        <div className="flex flex-col sm:flex-row-reverse justify-between gap-4">
          <Button
            type="primary"
            shape="round"
            size="large"
            className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green w-fit self-end"
            icon={<CheckOutlined />}
          >
            Done
          </Button>
          <UsernameFilter
            onUsernameSearch={handleUsernameSearch}
            initialUsername={usernameFromParams}
          />
        </div>
        {!isLoading && isDataFetched && users.length === 0 ? (
          <EmptyData text="No users found!" />
        ) : (
          usersList
        )}
        {users.length > 0 && (
          <Pagination
            current={pageFromParams}
            pageSize={perPage}
            total={totalUsers}
            onChange={handlePageChange}
            className="mt-10 mx-auto w-fit"
          />
        )}
      </section>

      <Footer />
    </>
  );
}
