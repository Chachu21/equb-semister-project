import Service from "../components/Service";
import Hero from "../components/Hero";
import WhoisEligible from "../components/WhoisEligible";
import FrequentlyAskedQuestions from "../components/FAQ";
import FeedbackForm from "../components/Feedback";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <section className="flex flex-col space-y-2 m-auto sm:mx-[50px] min-h-screen">
      <Hero />
      <Service />
      <WhoisEligible />
      <FrequentlyAskedQuestions />
      <FeedbackForm />
      <Testimonial />
      <Footer />
    </section>
  );
};

export default Home;
