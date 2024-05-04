"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import StoresCard from "@/components/StoresCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import getDateBefore from "@/utils";

const Stores = () => {
  const searchRef = useRef(null);
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const { data: session } = useSession();

  const fetchStores = async () => {
    try {
      const formattedDate = getDateBefore(7);
      const minPageLimit = process.env.NEXT_PUBLIC_MIN_PAGE_LIMIT;
      const maxPageLimit = process.env.NEXT_PUBLIC_MAX_PAGE_LIMIT;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/getAllStores1/${minPageLimit}/${maxPageLimit}/${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      if (res && res.data && res.data.newStoreDetails) {
        setStores(res.data.newStoreDetails);
        setFilteredStores(res.data.newStoreDetails);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = () => {
    const query = searchRef.current.value.toLowerCase();
    const filtered = stores.filter((store) =>
      store.name.toLowerCase().includes(query)
    );
    setFilteredStores(filtered);
  };

  const handleInputChange = () => {
    handleSearch();
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-center relative">
        <input
          type="text"
          className="px-4 py-2 placeholder:text-low border border-line outline-none w-[296px] h-[33px] text-sm shadow-lg"
          placeholder="Search Store"
          ref={searchRef}
          onChange={handleInputChange}
        />
        <FiSearch className="icon relative right-8 text-low" />
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-14 mt-11">
          {filteredStores.map((store) => (
            <StoresCard key={store.id} store={store} role={session?.user?.role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stores;
