import HomeButtons from "@/components/home/HomeButtons";

const Home = () => {
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Task 4
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Show users list and do some actions
        </p>
        <HomeButtons />
      </div>
    </div>
  );
};

export default Home;
