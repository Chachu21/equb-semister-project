import Service from "../components/Service";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <section className="flex flex-col space-y-2 m-auto sm:mx-[50px] min-h-screen">
      <Hero />
      <Service />
    </section>
  );
};

export default Home;
