import Service from "../components/Service";
import Hero from "../components/Hero";
import * as React from "react";
import Feature from "../components/Feature";
import SampleEqubGroup from "../components/SampleEqubGroup";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <section className="flex flex-col space-y-2 m-auto sm:mx-[50px] min-h-screen">
      <Hero />
      <Service />
      <Feature />
      <SampleEqubGroup />
      <HowItWorks />
    </section>
  );
};

export default Home;
