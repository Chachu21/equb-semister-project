import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  LOGIN_MUTATION,
  LoginMutationResponse,
  LoginMutationVariables,
} from "../generated/mutations";
import logins from "../../public/logins.jpg";

// Define password rules regex
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// Define the basic validation schema using Yup
const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, "Please create a stronger password")
    .required("Required"),
});

const Login = () => {
  const navigate = useNavigate();

  const [login, { error, loading }] = useMutation<
    LoginMutationResponse,
    LoginMutationVariables
  >(LOGIN_MUTATION);
  error && <p>{error.message}</p>;
  loading && <p>loading....</p>;
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
      email: "",
      password: "",
      rememberMe: false, // Add rememberMe field for checkbox
    },
    validationSchema: basicSchema,
    onSubmit: async (formValues, actions) => {
      console.log(formValues);
      try {
        const response = await login({
          variables: {
            email: formValues.email,
            password: formValues.password,
          },
        });
        if (response?.data?.login) {
          // Handle successful signup
          console.log("Signup successful:", response.data);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.login.token)
          );
          actions.setSubmitting(false);
          // Redirect or handle authentication as needed
          navigate("/admin");
        }
      } catch (error) {
        console.error("Login error:", error);
        actions.resetForm();
        actions.setSubmitting(false);
      }
      setTimeout(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center content-center mt-1 mb-20 md:mt-5">
      <div className="hidden md:block order-1 md:order-1">
        <img
          src={logins}
          alt="feedback"
          className="object-cover items-center rounded-md "
        />
      </div>
      <div className="order-2 md:order-2 w-full bg-gray-50 dark:bg-gray-900 dark:text-white overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="max-w-xl mx-auto bg-white shadow-sm rounded px-8 md:pt-20 pb-8 md:my-20"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

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

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center mb-2 md:mb-0">
              <input
                type="checkbox"
                id="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember Me
              </label>
            </div>
            <Link
              to="/forgotpassword"
              className="text-blue-500 text-sm md:text-base"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            Login
          </button>
        </form>

        <p className="text-center mb-2">or</p>
        <button
          type="button"
          className="md:w-[80%] mx-auto flex items-center justify-center bg-white border border-gray-200 p-5 rounded-lg font-semibold mb-4"
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
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-500 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
