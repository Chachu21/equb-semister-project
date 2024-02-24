import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

// Define password rules regex
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// Define the basic validation schema using Yup
const basicSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  phone: yup
    .string()
    .matches(
      /^(09|\+2519)\d{8}$/,
      "Please enter a valid Ethiopian phone number"
    )
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, "Please create a stronger password")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

const Register = () => {
  // useFormik hook for form handling
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false, // Initial value for agreeTerms checkbox
    },
    validationSchema: basicSchema,

    //TODO
    //we have to handle the requests
    onSubmit: async (values, actions) => {
      // Define onSubmit as an arrow function
      console.log("submitting muller");
      try {
        const response = await axios.post(
          //will corrected soon
          "http://localhost:5003/api/v1/users/login",
          {
            email: values.email, // Pass values.email
            password: values.password, // Pass values.password
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("An error occurred:", errors);
      }

      console.log("values are :", values);
      console.log("actions are  :", actions);
      setTimeout(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your fullname"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 border ${
              errors.name && touched.name ? "border-red-500" : "border-gray-300"
            } rounded-lg shadow-sm`}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            id="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs italic">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={values.agreeTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mr-2  ${
              errors.agreeTerms && touched.agreeTerms ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="agreeTerms"
            className="text-gray-700 text-sm font-semibold"
          >
            Yes, I understand and agree to the Equb Terms of Service, including
            the User Agreement and Privacy Policy.
          </label>
        </div>
        {errors.agreeTerms && touched.agreeTerms && (
          <p className="text-red-500 text-xs italic">{errors.agreeTerms}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mb-2">or</p>
      <button
        type="button"
        className=" w-full flex items-center justify-center bg-white border border-gray-200 p-5 rounded-lg font-semibold mb-4"
      >
        {/* svg is google icons */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="20"
          viewBox="0 0 60 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        continue with Google
      </button>

      <div className=" text-center py-4">
        <p>
          {/* TODO
          we have to give the correct route here */}
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
