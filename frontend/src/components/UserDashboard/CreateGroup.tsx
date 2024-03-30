import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  types: string;
  amount: number;
  member: number;
}

const CreateGroup: React.FC = () => {
  const userData = localStorage.getItem("user");
  const token = userData ? JSON.parse(userData).token : "";

  const initialValues: FormData = {
    name: "",
    types: "",
    amount: 0,
    member: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    types: Yup.string().required("Type is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .min(20, "Amount must be greater than or equal to 20"),
    member: Yup.number()
      .required("Number of members is required")
      .positive("Number of members must be positive")
      .min(3, "member must be greater than or equal to 3"),
  });

  const handleSubmit = async (values: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/group/create",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast.success("Successfully created group");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group. Please try again later.");
    }
  };

  return (
    <>
      <div className="bg-gray-200 container mx-auto overflow-x-hidden h-full md:max-w-3xl flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center bg-white px-5 py-20 space-y-5">
          <span className="text-2xl text-center font-semibold text-sky-950">
            create your equb group by filling the following form
          </span>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col space-y-3 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-5  ">
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Please add equb name"
                      className="border border-gray-400 p-3 rounded-lg"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="types">Equb type</label>
                    <Field
                      type="text"
                      name="types"
                      placeholder="Please add type"
                      className="border border-gray-400 p-3 rounded-lg"
                    />
                    <ErrorMessage
                      name="types"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-5">
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="amount">Amount of payment</label>
                    <Field
                      type="number"
                      name="amount"
                      placeholder="Please add amount"
                      className="border border-gray-400 p-3 rounded-lg"
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col pb-20">
                    <label htmlFor="member">Number of members</label>
                    <Field
                      type="number"
                      name="member"
                      placeholder="Please add members"
                      className="border border-gray-400 p-3 rounded-lg"
                    />
                    <ErrorMessage
                      name="member"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex justify-center items-center float-right bg-gray-700 text-white w-fit py-3 px-10 rounded-md container mx-auto mt-20"
                >
                  Create Group
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
