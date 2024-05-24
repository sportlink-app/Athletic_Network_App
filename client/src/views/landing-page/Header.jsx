import BlurShape from "../../components/styled/BlurShape";

function Header() {
  const stats = [
    { name: "Sports Categories", value: "+50" },
    { name: "Active Users", value: "+300" },
    { name: "Successful Partner Matches", value: "+100" },
    { name: "Paid time off", value: "Unlimited" },
  ];
  const HeaderBG =
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80";
  return (
    <div className="relative isolate overflow-x-hidden py-24 sm:py-32 bg-white flex ">
      <img
        // src={HeaderBG}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover md:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <BlurShape
          color="bg-gradient-to-tr from-yellow to-green"
          width="w-[68.5625rem]"
          opacity="opacity-20"
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <BlurShape
          color="bg-cyan"
          width="w-[68.5625rem]"
          opacity="opacity-30"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
        <div className="mx-auto max-w-2xl lg:mx-0 w-full text-center ">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Team Awaits
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find your ideal sports partner and play together anytime, anywhere.
            Connect with athletes who match your skill level and interests.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none text-center">
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Header;
