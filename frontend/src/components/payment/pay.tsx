import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormState {
  amount: string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const Pay: React.FC = () => {
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
          tx_ref: `${form.first_name}-${Date.now()}`,
        },
        {
          headers: { "Content-Type": "application/json" },
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
    <div className="flex items-end justify-center">
      <div>
        <h1 className="mx-[130px] mt-3 font-mono font-extrabold text-lg">
          Welcome
        </h1>
        <form
          className=" p-5 m-10 shadow-2xl rounded-xl"
          onSubmit={handleSubmit}
        >
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="amount"
            value={form.amount}
            placeholder="amount"
          />{" "}
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="currency"
            value={form.currency}
            placeholder="currency"
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="email"
            value={form.email}
            placeholder="email"
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="first_name"
            value={form.first_name}
            placeholder="first_name"
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="last_name"
            placeholder="last_name"
            value={form.last_name}
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="phone_number"
            placeholder="phone_number"
            value={form.phone_number}
          />
          <br />
          <button
            className="px-[100px] py-3 ml-3 rounded-md bg-green-600"
            type="submit"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pay;
