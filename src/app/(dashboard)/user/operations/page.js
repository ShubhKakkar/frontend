"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import UserOperationsCard from "@/components/UserOperationsCard";

const UserOperations = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [formData, setFormData] = useState({
    user_type: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile_number: "",
    location: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/register`,
        {
          user_type: formData.user_type,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          mobile_number: parseInt(formData.mobile_number),
          location: formData.location
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
     if(response.data && response.status === 201) {
        toast.success('New user created successfully');
     }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <div className="mt-8">
        <h1 className="font-medium text-2xl">Create New User</h1>
        <form className="grid grid-cols-4 gap-4 my-6" onSubmit={handleSubmit}>
          <div>
            <select
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none bg-gray-200"
            >
              <option value="">User Type</option>
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="py-2 px-3 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none border border-line"
            />
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="py-2 px-3 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none border border-line"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="py-2 px-3 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none border border-line"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="py-2 px-3 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none border border-line"
            />
          </div>
          <div>
            <input
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="py-2 px-3 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none border border-line"
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="py-2 px-3 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none border border-line"
            />
          </div>
          <div>
            <button type="submit" className="greenyellowbutton text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="mt-12">
        <h2>Existing User</h2>
        <div className="grid grid-cols-3 gap-4 mt-8">
            <UserOperationsCard />
        </div>
      </div>
    </div>
  );
};

export default UserOperations;
