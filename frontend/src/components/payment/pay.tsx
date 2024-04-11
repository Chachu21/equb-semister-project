import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface FormState {
  amount: string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  group_id: string;
}

const Pay = ({ isOpen, onClose, group_id }: ModalProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [form, setForm] = useState<FormState>({
    amount: "",
    currency: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/payment/accept-payment",
        {
          amount: form.amount,
          currency: form.currency,
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          phone_number: form.phone_number,
          group_id: group_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearar ${user?.token}`,
          },
        }
      );

      if (res.data && res.data.data && res.data.data.checkout_url) {
        window.location.href = res.data.data.checkout_url;
      } else {
        console.log("Invalid response:", res);
        // Handle invalid response
      }

      setForm({
        amount: "",
        currency: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
      });
    } catch (error) {
      console.log("Error", error);
      // Handle error
    }
  };

  return (
    <>
      <div
        className={`fixed z-50 inset-0 overflow-y-scroll md:overflow-hidden ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="flex container mx-auto items-center justify-center min-h-screen">
          <div
            className="fixed inset-0 bg-black opacity-20"
            onClick={onClose}
          />
          <div className="relative flex flex-col items-center py-3 px-5  md:space-y-2 bg-gray-100 rounded-lg  w-full md:max-w-2xl min-h-screen md:min-h-[80vh]">
            <span
              className="absolute top-0 right-5 cursor-pointer hover:text-red-500 bg-white text-5xl"
              onClick={onClose}
            >
              &times;
            </span>{" "}
            <div className="flex items-center justify-center w-full h-full">
              <div className=" flex flex-col justify-center items-center w-full space-y-8">
                <h1 className="font-mono font-extrabold text-lg">Welcome</h1>
                <form
                  className=" flex flex-col space-y-3 md:space-y-8"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        className="border border-black px-5 py-2 rounded-lg"
                        onChange={handleChange}
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        placeholder="first_name"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="firstname">Last Name</label>
                      <input
                        className="border border-black px-5 py-2 rounded-lg"
                        onChange={handleChange}
                        type="text"
                        name="last_name"
                        placeholder="last_name"
                        value={form.last_name}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="amount">Amount</label>
                      <input
                        className="border border-black px-5 py-2 rounded-lg"
                        onChange={handleChange}
                        type="text"
                        name="amount"
                        value={form.amount}
                        placeholder="amount"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="currency">Currency</label>
                      <input
                        className="border border-black px-5 py-2 rounded-lg"
                        onChange={handleChange}
                        type="text"
                        name="currency"
                        value={form.currency}
                        placeholder="currency"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5 ">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email">Your Email</label>
                      <input
                        className="border border-black px-5 py-2 rounded-lg"
                        onChange={handleChange}
                        type="text"
                        name="email"
                        value={form.email}
                        placeholder="email"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        className="border border-black px-5 py-2 rounded-lg"
                        onChange={handleChange}
                        type="text"
                        name="phone_number"
                        placeholder="phone_number"
                        value={form.phone_number}
                      />
                    </div>
                  </div>
                  <br />

                  <br />
                  <button
                    className="px-[100px] py-3 ml-3 text-white font-bold text-xl rounded-md bg-green-600"
                    type="submit"
                  >
                    Pay
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay;
