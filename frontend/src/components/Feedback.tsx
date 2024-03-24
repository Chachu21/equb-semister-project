import { useFormik } from "formik";
import * as Yup from "yup";
import feedback from "../../public/feedback.png";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  COMMENT_MUTATION,
  CommentResponse,
  CommentVaribles,
} from "../generated/comment";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  content: Yup.string().required("content are required"),
  rating: Yup.number().required("Rating is required"),
});

const FeedbackForm = () => {
  const [addComments] = useMutation<CommentResponse, CommentVaribles>(
    COMMENT_MUTATION
  );

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      content: "",
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: {
    full_name: string;
    email: string;
    content: string;
    rating: number;
  }) => {
    // Handle form submission
    try {
      const response = await addComments({
        variables: {
          full_name: values.full_name,
          email: values.email,
          content: values.content,
          rating: values.rating,
        },
      });

      if (response.data?.insert_comment_one.email) {
        toast.success("successfully sent your comment, thanks so much!!!");
      }
    } catch (error) {
      console.log(error);
    }

    // Reset form fields
    formik.resetForm();
  };

  const handleStarClick = (value: number) => {
    formik.setFieldValue("rating", value);
  };

  const handleCancel = () => {
    // Reset form fields
    formik.resetForm();
  };

  return (
    <div className="container bg-white dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 ">
        <div className="order-1 md:order-1">
          <img
            src={feedback}
            alt="feedback"
            className="object-cover items-center rounded-md "
          />
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full order-2 md:order-2"
        >
          <div className="form-group mb-4">
            <label htmlFor="full_name" className="block mb-1">
              Full name
            </label>
            <input
              type="text"
              placeholder="enter your full name"
              id="full_name"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg outline-[#008B8B] shadow-sm"
            />
            {formik.touched.full_name && formik.errors.full_name ? (
              <div className="text-red-500">{formik.errors.full_name}</div>
            ) : null}
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm outline-[#008B8B]"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="star-rating text-3xl">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`p-4 star cursor-pointer ${
                    formik.values.rating && value <= formik.values.rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(value)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {formik.touched.rating && formik.errors.rating ? (
              <div className="text-red-500">{formik.errors.rating}</div>
            ) : null}
          </div>
          <div className="form-group mb-4">
            <textarea
              id="content"
              name="content"
              placeholder="Add content"
              rows={4}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 outline-[#008B8B] rounded-lg shadow-sm"
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="text-red-500">{formik.errors.content}</div>
            ) : null}
          </div>
          <div className="flex justify-between md:justify-end items-center ">
            <button
              type="button"
              className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 mr-7"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#008B8B] hover:bg-[#7da7a7] text-white py-2 px-5 rounded-lg font-semibold mb-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
