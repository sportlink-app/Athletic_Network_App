import ArticleCard from "./ArticleCard";

function Articles() {
  const articles = [
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati, ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati",
    },
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati ",
    },
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati, ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati ",
    },
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati ",
    },
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati, suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati",
    },
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati, suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati, suscipit rerum aperiam ut voluptates delectus nihil voluptate et enim voluptatem voluptas obcaecati ",
    },
    {
      id: 1,
      username: "seifAaza37",
      gender: "male",
      date: "april 16, 2023",
      sport: "Football",
      title: "Lorem ipsum dolor sit amet consectetur.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti suscipit ",
    },
  ];
  const articlesList = articles.map((user, index) => (
    <ArticleCard
      key={index}
      username={user.username}
      gender={user.gender}
      date={user.date}
      sport={user.sport}
      title={user.title}
      content={user.content}
    />
  ));
  return (
    <div className="mt-6 lg:mt-10 gap-x-[1em] sm:columns-2 lg:columns-3 2xl:columns-4">
      {articlesList}
    </div>
  );
}

export default Articles;
