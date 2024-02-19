import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import FrequentlyAskedQuestions from "./components/FAQ";
import FeedbackForm from "./components/Feedback";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";
import WhoisEligible from "./components/WhoisEligible";


const App: React.FC = () => {
  return (
    <div>
      <WhoisEligible />
      <FrequentlyAskedQuestions />
      <FeedbackForm />
      <Testimonial />
      
      <Register />
      <Login />
      <ForgotPassword />
      <Footer />
    </div>
  );
};

export default App;
