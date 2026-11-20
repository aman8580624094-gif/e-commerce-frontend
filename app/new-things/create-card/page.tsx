
"use client";

import axios from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";

export default function CreateCard() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    description: "",
    
  });

  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    await data()
  };

  const data = async()=>{
    try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cards`, formData);
    router.push("/new-things/home")
    }
    catch(err){
        console.log(err)
    }
    
  }


  const fieldClass =
    "w-full p-3 border border-gray-300 rounded-lg bg-white text-[#000000] placeholder:text-gray-500 outline-none focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6 text-[#000000]">
          Create New Card
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={fieldClass}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={fieldClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className={fieldClass}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className={fieldClass}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className={fieldClass}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={fieldClass}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className={fieldClass}
            />
          </div>

          <textarea
            name="description"
            placeholder="Write Description..."
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={fieldClass}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Card
          </button>

        </form>
      </div>
    </div>
  );
}
 