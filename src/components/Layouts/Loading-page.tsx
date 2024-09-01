const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-center bg-fixed bg-cover bg-[url(https://res.cloudinary.com/dd0tbhnzl/image/upload/v1722414427/wp2239808-wallpaper-gif_wpkk8l.gif)]">
      <h1 className="text-2xl font-bold edu-vic-wa-nt-beginner-700 gradient-text">
        Spider
      </h1>
      <div className="spinner-loading"></div>
    </div>
  );
};

export default LoadingPage;
