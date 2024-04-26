interface TestimonialData {
  name: string;
  role: string;
  comment: string;
  rating: number;
}

const Testimonial = () => {
  const testimonials: TestimonialData[] = [
    {
      name: "John Doe",
      role: "Customer",
      comment:
        "I am wowed with this new product! It's trustworthy and very reliable. Highly recommended!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Client",
      comment:
        "Absolutely amazing! The product exceeded my expectations. 5/5 stars!",
      rating: 5,
    },
    {
      name: "Michael Johnson",
      role: "User",
      comment: "Great product! It's user-friendly and efficient. 4/5 stars!",
      rating: 4,
    },
  ];

  return (
    <div className="container bg-white dark:bg-gray-900 dark:text-white flex flex-col justify-evenly items-center mx-auto  space-y-32 py-10 ">
      <h1 className="text-3xl font-bold mb-4 text-[#1F284F]">
        Everybody Loves Us
      </h1>
      {/* <p className="text-lg text-gray-600 mb-8 text-center">
        Check out some of our recent product reviews.
      </p> */}

      <div className="flex flex-col space-y-10 md:flex-row md:justify-center shadow-sm">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="relative max-w-sm  shadow-sm">
            {/* Stars */}
            <div className="flex justify-center items-center mt-8 mb-4">
              <div className="relative">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`absolute -top-9 -left-4 text-4xl ${
                      index < testimonial.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    style={{
                      transform: `rotate(${
                        index * (360 / 5)
                      }deg) translate(30px) rotate(-${index * (360 / 5)}deg)`,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-lg font-bold text-center">
                {testimonial.rating}
              </p>
            </div>
            {/* Testimonial content */}
            <div className="p-4">
              {/* Comment */}
              <p className="text-gray-800 mb-4 text-center">
                {testimonial.comment}
              </p>
              {/* Name */}
              <p className="text-lg font-semibold mb-1 text-center">
                {testimonial.name}
              </p>
              {/* Role */}
              <p className="text-gray-500 mb-2 text-center">
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
