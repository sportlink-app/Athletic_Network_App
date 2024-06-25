import { FloatButton } from "antd";
import UserCard from "./UserCard";

function Explore() {
  const users = [
    {
      id: 1,
      username: "seifAaza 37",
      gender: "male",
      city: "casablanca",
      sports: ["Black", "Black", "Black"],
    },
    {
      id: 1,
      username: "Bassssssé1ic Tee",
      gender: "male",
      city: "casablanca",
      sports: [
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
      ],
    },
    {
      id: 1,
      username: "BasisskecTee",
      gender: "female",
      city: "casablanca",
      sports: ["Black", "Black"],
    },
    {
      id: 1,
      username: "cTee z",
      gender: "male",
      city: "casablanca",
      sports: [
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
      ],
    },
    {
      id: 1,
      username: "Base cT ee",
      gender: "female",
      city: "casablanca",
      sports: ["Black", "Black", "Black", "Black", "Black", "Black"],
    },
  ];
  const usersList = users.map((user, index) => (
    <UserCard
      key={index}
      username={user.username}
      gender={user.gender}
      city={user.city}
      sports={user.sports}
    />
  ));
  return (
    <div className="container mx-auto px-4 mt-10 lg:mt-14 xl:mt-16 grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {usersList}
      <FloatButton.BackTop duration={100} />
    </div>
  );
}

export default Explore;
