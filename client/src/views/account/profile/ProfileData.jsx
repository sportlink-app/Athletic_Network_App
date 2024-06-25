import Text from "../../../components/Text";
import Tags from "../../../components/Tags";

const Availability = () => (
  <div className="flex gap-2 justify-center items-center ">
    <Text text="available" type="subtitle" className="font-medium capitalize" />
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green"></span>
    </span>
  </div>
);

const Bio = () => (
  <>
    <Text
      text="Bio"
      type="subtitle"
      className="font-medium"
      color="text-gray-600"
    />
    <p className="text-sm text-gray-600 lg:max-w-xl mt-1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
      beatae maxime et nihil est, illo quis. Hic itaque eius molestias.
    </p>
  </>
);

const City = () => (
  <>
    <Text
      text="City"
      type="subtitle"
      className="font-medium"
      color="text-gray-600"
    />
    <p className="text-sm text-gray-600 mt-1">Casablanca</p>
  </>
);

const Tel = () => (
  <>
    <Text
      text="Tel"
      type="subtitle"
      className="font-medium"
      color="text-gray-600"
    />
    <p className="text-sm text-gray-600 mt-1">0728365287</p>
  </>
);

const sportList = [
  "football",
  "basketball",
  "tennis",
  "volleyball",
  "sport5",
  "sport6",
  "sport7",
  "sport8",
];

const Sports = () => (
  <>
    <Text
      text="Sports"
      type="subtitle"
      className="font-medium"
      color="text-gray-600"
    />
    <div className="flex flex-wrap gap-x-1 gap-y-3 mt-2">
      <Tags list={sportList} className="py-1 px-4 text-sm " />
    </div>
  </>
);

export { Availability, Bio, City, Tel, Sports };
