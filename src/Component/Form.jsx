import React, { useState } from "react";

const Form = ({ setOpen }) => {
  const [name, setname] = useState("");
  const [add, setadd] = useState("");
  const [number, setnumber] = useState("");
  const [country, setcountry] = useState("");

  function handlesubmit() {
    if (!name || !add || !number || !country) {
      alert("Please fill all details");
      return;
    }

    console.log(name, add, number, country);

    setcountry("");
    setname("");
    setnumber("");
    setadd("");
    setOpen(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Feedback Form
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Address</label>
            <input
              type="text"
              value={add}
              onChange={(e) => setadd(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Number</label>
            <input
              type="tel"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your number"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your country"
            />
          </div>

          <button
            onClick={handlesubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
