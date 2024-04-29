"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { toast } from "react-toastify";

const PasswordModel = ({ handleClosePasswordModal }) => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const ref = useDetectClickOutside({ onTriggered: handleClosePasswordModal });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const validatePassword = () => {
    const { newPassword, confirmNewPassword } = passwords;
    const isValidLength = newPassword.length >= 6;
    const hasAlphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword);
    const isNotRepetitive =
      newPassword !== newPassword.repeat(newPassword.length / 2);
    const passwordsMatch = newPassword === confirmNewPassword;

    return {
      isValidLength,
      hasAlphanumeric,
      isNotRepetitive,
      passwordsMatch,
    };
  };

  const passwordValidation = validatePassword();
  const isValidPassword = Object.values(passwordValidation).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPassword) return;
    const { newPassword } = passwords;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/changepassword`,
        {
          password: newPassword,
          id: session?.user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      console.log(data);
      if (
        data.userDetails &&
        data.userDetails.message === "Password updated successfully"
      ) {
        toast.success("Password updated successfully");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error occurred during password change:", error);
      toast.error(`Some error occurred: ${error.message}`);
    } finally {
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-6 my-6"
      ref={ref}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          className="p-3 border outline-none border-1 border-gray-400 rounded-xl w-3/4"
          placeholder="Current Password"
        />
      </div>
      <div>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          className="p-3 border outline-none border-1 border-gray-400 rounded-xl w-3/4"
          placeholder="New Password"
        />
        {touchedFields.newPassword && !passwordValidation.isValidLength && (
          <p className="text-red-500">
            Password must be at least 6 characters long.
          </p>
        )}
        {touchedFields.newPassword && !passwordValidation.hasAlphanumeric && (
          <p className="text-red-500">
            Password must contain both letters and numbers.
          </p>
        )}
        {touchedFields.newPassword && !passwordValidation.isNotRepetitive && (
          <p className="text-red-500">Password should not be repetitive.</p>
        )}
      </div>
      <div>
        <input
          type="password"
          name="confirmNewPassword"
          value={passwords.confirmNewPassword}
          onChange={handleChange}
          className="p-3 border outline-none border-1 border-gray-400 rounded-xl w-3/4"
          placeholder="Confirm New Password"
        />
        {touchedFields.confirmNewPassword &&
          !passwordValidation.passwordsMatch && (
            <p className="text-red-500">Passwords do not match.</p>
          )}
        {touchedFields.confirmNewPassword && isValidPassword && (
          <p className="text-green-500">Your password is secure.</p>
        )}
      </div>
      <div className="flex items-center gap-12">
        <button
          type="submit"
          className="greenyellowbutton"
          disabled={!isValidPassword}
        >
          Submit
        </button>
        <button className="font-medium" onClick={handleClosePasswordModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PasswordModel;
