import UserCard from "./UserCard";
function Users() {
  const users = [
    {
      id: 1,
      username: "seifAaza 37",
      gender: "male",
      city: "casablanca",
      sports: ["Black", "Black", "Black"],
      available: true,
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
      available: false,
    },
    {
      id: 1,
      username: "BasisskecTee",
      gender: "female",
      city: "casablanca",
      sports: ["Black", "Black"],
      available: true,
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
      available: true,
    },
    {
      id: 1,
      username: "Base cT ee",
      gender: "female",
      city: "casablanca",
      sports: ["Black", "Black", "Black", "Black", "Black", "Black"],
      available: false,
    },
  ];
  const usersList = users.map((user, index) => (
    <UserCard
      key={index}
      username={user.username}
      gender={user.gender}
      city={user.city}
      sports={user.sports}
      available={user.available}
    />
  ));
  return (
    <div className="mt-6 grid gap-x-6 gap-y-4 md:gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {usersList}
    </div>
  );
}

export default Users;
