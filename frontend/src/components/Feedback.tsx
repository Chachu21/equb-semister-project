import { useFormik } from "formik";
import * as Yup from "yup";
import feedback from "../../public/feedback.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Modal from "./Model/JoinModel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  comment: Yup.string().required("comment are required"),
  rating: Yup.number().required("Rating is required"),
});

const FeedbackForm = () => {
  const [showModal, setShowModal] = useState(false);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const user = useSelector((state: RootState) => state.user.user);
  const token = user?.token;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    comment: string;
    rating: number;
  }) => {
    // Handle form submission

    if (isLogin && token) {
      const response = await axios.post(
        "http://localhost:5000/api/v1/comment/create",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Successfully commented");
      console.log(response.data);
    } else {
      setShowModal(true);
      return;
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
  const handleLogin = () => {
    // Redirect to the login page
    navigate("/login");
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
            <label htmlFor="name" className="block mb-1">
              Full name
            </label>
            <input
              type="text"
              placeholder="enter your full name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg outline-[#008B8B] shadow-sm"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
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
              id="comment"
              name="comment"
              placeholder="Add comment"
              rows={4}
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 outline-[#008B8B] rounded-lg shadow-sm"
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div className="text-red-500">{formik.errors.comment}</div>
            ) : null}
          </div>
          <div className="flex justify-between md:justify-end items-center ">
            <button
              type="button"
              className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 mr-7 mb-4"
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
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default FeedbackForm;
