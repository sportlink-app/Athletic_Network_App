const Text = (props) => {
  return (
    <h1
      className={`${
        props.type == "title"
          ? "text-3xl md:text-4xl font-bold capitalize tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green"
          : props.type == "subtitle"
          ? "mt-6 text-lg leading-8 text-gray-600"
          : ""
      }   `}
    >
      {props.text}
    </h1>
  );
};

export default Text;
