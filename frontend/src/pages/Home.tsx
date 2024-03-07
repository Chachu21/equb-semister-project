import Service from "../components/Service";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import SampleEqubGroup from "../components/SampleEqubGroup";
import HowItWorks from "../components/HowItWorks";
import WhoisEligible from "../components/WhoisEligible";
import FrequentlyAskedQuestions from "../components/FAQ";
import FeedbackForm from "../components/Feedback";
import Testimonial from "../components/Testimonial";




const Home = () => {
  return (
    <section className="flex flex-col space-y-10 m-auto sm:mx-[50px] min-h-screen">
      <Hero />
      <Service />
      <HowItWorks />
      <Feature />
      <SampleEqubGroup />
      <WhoisEligible />
      <FrequentlyAskedQuestions />
      <FeedbackForm />
      <Testimonial />
    </section>
  );
};

export default Home;
