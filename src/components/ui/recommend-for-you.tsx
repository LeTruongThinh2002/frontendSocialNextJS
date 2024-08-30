import RecommendUser from "./recommend-user";

const RecommendForYou = ({ arrays }: { arrays: any[] }) => {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <h2 className="text-sm font-semibold text-gray-500">Recommend for you</h2>
      {arrays.map((_, index) => (
        <RecommendUser key={index} />
      ))}
    </div>
  );
};

export default RecommendForYou;
