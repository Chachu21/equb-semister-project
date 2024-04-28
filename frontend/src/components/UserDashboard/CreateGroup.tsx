import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  types: string;
  amount: number;
  member: number;
  roundDuration: number;
  paymentInterval: number;
}

const CreateGroup = () => {
  const naviagte = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const initialValues: FormData = {
    name: "",
    types: "",
    amount: 0,
    member: 0,
    roundDuration: 0,
    paymentInterval: 0,
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
    roundDuration: Yup.number()
      .required("Number of members must be greater than or equal to 0.5")
      .positive("number must be positive")
      .min(
        0,
        "the duration of equb from selecting winner to next selection winner is  must be greater than or equal to 1day"
      ),
  });

  const handleSubmit = async (values: FormData) => {
    try {
      if (values.types === "daily") {
        values.paymentInterval = 0.00208;
      } else if (values.types === "weekly") {
        values.paymentInterval = 2;
      } else if (values.types === "monthly") {
        values.paymentInterval = 3;
      }
      console.log(values);
      const response = await axios.post(
        "http://localhost:5000/api/v1/group/create",
        values,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("before checking response is exist");

      if (response) {
        toast.success("Successfully created group");
        // naviagte to manage group
        naviagte("/equbCreatorDashboard/manageGroups");
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
            Create your equb group by filling the following form
          </span>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col space-y-3 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-5">
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
                      as="select"
                      name="types"
                      className="border border-gray-400 p-3 rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </Field>
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
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="roundDuration">RoundDuration</label>
                  <Field
                    type="number"
                    name="roundDuration"
                    placeholder="Please add roundDuration"
                    className="border border-gray-400 p-3 rounded-lg"
                  />
                  <ErrorMessage
                    name="roundDuration"
                    component="div"
                    className="text-red-500"
                  />
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
