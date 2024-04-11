import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { RootState } from "../../Redux/store";
import { usersType } from "../../types/usersType";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const user_id = useSelector((state: RootState) => state.user.user?._id);
  const [user, setUser] = useState<usersType>();
  const [selectedBank, setSelectedBank] = useState(""); // State to store selected bank

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/users/${user_id}`
      );
      if (res.status === 200 && res.statusText === "OK") {
        setUser(res.data.user);
      }
    };
    fetchUserData();
  }, [user_id]);

  return (
    <div className="bg-gray-200 container mx-auto overflow-x-hidden h-full md:max-w-3xl flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-white px-5 py-20 space-y-5">
        <p className="text-2xl">Adding withdrawal payment method</p>
        <div className="card-content">
          <Formik
            initialValues={{
              accountHolderName: "",
              accountNumber: "",
            }}
            validationSchema={Yup.object({
              accountHolderName: Yup.string().required(
                "Account holder name is required"
              ),
              accountNumber: Yup.number().required(
                "Account number is required"
              ),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Construct payload for API request
                const payload = {
                  updates: {
                    bank_account: {
                      bank_name: selectedBank,
                      account_holder_name: values.accountHolderName,
                      account_no: values.accountNumber,
                    },
                  },
                };
                // Check if account holder name is equal to user's name
                if (user && user.name !== values.accountHolderName) {
                  // If not equal, display error message and return
                  toast.warning("Account holder name must match user's name");
                  return;
                }
                // Send API request to update user with payment details
                const res = await axios.put(
                  `http://localhost:5000/api/v1/users/update/${user_id}`,
                  payload
                );

                if (res.status === 200 && res.statusText === "OK") {
                  // Handle successful response
                  toast.success("Payment details updated successfully!");
                }
              } catch (error) {
                console.error("Error updating payment details:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Form className="flex flex-col space-y-5 w-full">
              {/* Dropdown select for bank name */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="bankName" className="font-semibold">
                  Bank name
                </label>
                <Field
                  as="select"
                  name="bankName"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectedBank(e.target.value)
                  }
                  value={selectedBank}
                  className="px-3 py-2 border border-gray-400 rounded w-full max-w-full focus:border-gray-100 focus:ring focus:outline-none bg-white"
                >
                  <option value="" disabled>
                    Select Bank
                  </option>
                  <option value="Commerical Bank Of Ethiopia">
                    Commerical Bank Of Ethiopia
                  </option>
                  <option value="Bank Of Abyssinia">Bank Of Abyssinia</option>
                  <option value="Abbay Bank">Abbay Bank</option>
                  <option value="Amhara Bank">Amhara Bank</option>

                  {/* Add more options as needed */}
                </Field>
                <ErrorMessage
                  name="bankName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="accountHolderName" className="font-semibold">
                  Account holder name
                </label>
                <Field
                  type="text"
                  name="accountHolderName"
                  placeholder="Abebe Alemu Kebede"
                  className="px-3 py-2 border border-gray-400 rounded w-full max-w-full focus:border-gray-100 focus:ring focus:outline-none bg-white"
                />
                <ErrorMessage
                  name="accountHolderName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="accountNumber" className="font-semibold">
                  Account Number
                </label>
                <Field
                  type="number"
                  name="accountNumber"
                  placeholder="1000119219665"
                  autoComplete=""
                  className="px-3 py-2 border border-gray-400 rounded w-full max-w-full focus:border-gray-100 focus:ring focus:outline-none bg-white"
                />
                <ErrorMessage
                  name="accountNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex">
                <div className="">
                  <button
                    type="submit"
                    className="bg-green-500 w-fit px-8 py-1 text-white font-semibold text-xl rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Payment;
