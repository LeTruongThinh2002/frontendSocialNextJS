import RecommendUser from "./recommend-user";

const RecommendForYou = () => {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <h2 className="text-sm font-semibold text-gray-500">Recommend for you</h2>
      {Array.from({ length: 5 }).map((_, index) => (
        <RecommendUser key={index} />
      ))}
    </div>
  );
};

export default RecommendForYou;
