import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Payment = () => {
  return (
    <div className="bg-gray-200 container mx-auto overflow-x-hidden h-full md:max-w-3xl flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-white px-5 py-20 space-y-5">
        <p className="text-2xl">Adding withdrawal payment method</p>
        <div className="card-content">
          <Formik
            initialValues={{
              bankName: "",
              accountHolderName: "",
              accountNumber: "",
            }}
            validationSchema={Yup.object({
              bankName: Yup.string().required("Bank name is required"),
              accountHolderName: Yup.string().required(
                "Account holder name is required"
              ),
              accountNumber: Yup.number().required(
                "Account number is required"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // You can handle form submission here
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form className="flex flex-col space-y-5 w-full">
              <div className="flex flex-col space-y-1">
                <label htmlFor="bankName" className="font-semibold">
                  Bank name
                </label>
                <Field
                  type="text"
                  autoComplete="on"
                  name="bankName"
                  placeholder="Commercial bank of Ethiopia"
                  className="px-3 py-2 border border-gray-400 rounded w-full max-w-full focus:border-gray-100 focus:ring focus:outline-none bg-white"
                />
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
                    className="bg-green-500 w-fit px-8 py-1 rounded"
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
