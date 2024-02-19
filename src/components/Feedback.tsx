import  { useState } from "react";

const FeedbackForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //will Handle form submission
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Comments:", comments);
    console.log("Rating:", rating);
    // Reset form fields
    setName("");
    setEmail("");
    setComments("");
    setRating(null);
  };

  const handleCancel = () => {
    // Reset form fields
    setName("");
    setEmail("");
    setComments("");
    setRating(null);
  };

  return (
    <div className="form-container max-w-md mx-auto shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 ml-16">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="enter your name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-lg"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-lg"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-1">Rating:</label>
          <div className="star-rating text-3xl">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`p-4 star cursor-pointer ${
                  rating && value <= rating
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleStarClick(value)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div className="form-group mb-4">
          <textarea
            id="comments"
            name="comments"
            placeholder="Add comments"
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-lg"
            required
          />
        </div>
        <div className="flex justify-end ">
          <button
            type="button"
            className="btn btn-cancel  text-blue-500 mr-7"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" bg-blue-500 text-white p-3 rounded-lg font-semibold mb-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
