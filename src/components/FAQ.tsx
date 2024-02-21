import React from "react";
import { useState } from "react";
//interfaces for typscript type checks
interface FAQ {
  question: string;
  answer: string;
}

const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 shadow-md w-full">
      <button
        className="flex justify-between items-center w-full py-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md font-semibold">{faq.question}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {isOpen && <p className="mt-2 text-gray-700">{faq.answer}</p>}
    </div>
  );
};

const FAQs: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => {
  return (
    <div className="max-w-lg mx-auto w-full">
      {faqs.map((faq, index) => (
        <FAQItem key={index} faq={faq} />
      ))}
    </div>
  );
};

// Example usage:
const FrequentlyAskedQuestions: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "What is EQUB and how does it work?",
      answer:
        "Explanation of EQUB as a cooperative financial model where members contribute funds into a common pool, from which they can borrow interest-free loans.",
    },
    {
      question: "How do I join an EQUB?",
      answer:
        "Instructions on how individuals can become members of an EQUB, including any eligibility criteria or membership fees.",
    },
    {
      question: "What are the benefits of participating in an EQUB?",
      answer:
        "Description of the advantages of EQUB membership, such as access to interest-free loans, financial assistance, and community support.",
    },

    // Add more FAQs as needed
  ];

  return (
    <div className="py-8  w-full">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <FAQs faqs={faqs} />
    </div>
  );
};

export default FrequentlyAskedQuestions;
