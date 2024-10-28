import RecommendUser from "./recommend-user";

const RecommendForYou = ({ arrays }: { arrays: any[] }) => {
  if (arrays.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2 mt-5">
      <h2 className="text-sm font-semibold text-gray-500">Recommend for you</h2>
      {arrays.map((user, index) => (
        <RecommendUser key={index} user={user} />
      ))}
    </div>
  );
};

export default RecommendForYou;
