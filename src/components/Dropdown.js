"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import getDateBefore from "@/utils";

const Dropdown = ({ setStoreId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const startDate = getDateBefore(365);
        const token = session?.user?.token;
        const response = await axios.get(
          session?.user.role === "superadmin"
            ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/getAllStores1/${process.env.NEXT_PUBLIC_MIN_PAGE_LIMIT}/${process.env.NEXT_PUBLIC_MAX_PAGE_LIMIT}/${startDate}`
            : `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/getAllStores1/${process.env.NEXT_PUBLIC_MIN_PAGE_LIMIT}/${process.env.NEXT_PUBLIC_MAX_PAGE_LIMIT}/${startDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response && response.status === 201 && response.data.newStoreDetails) {
          setStores(response.data.newStoreDetails);
          setSelectedStore(response.data.newStoreDetails[0]?.name || null);
          setStoreId(response.data.newStoreDetails[0]?.id || null);
        }
      } catch (error) {
        console.error("Error fetching stores data:", error);
      }
    };

    fetchStores();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStoreSelect = (storeId, storeName) => {
    setStoreId(storeId);
    setSelectedStore(storeName);
    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {selectedStore ? selectedStore : "Select Store"}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoreSelect(store.id, store.name)}
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabIndex="-1"
              >
                {store.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
