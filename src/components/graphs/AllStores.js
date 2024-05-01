"use client";
import React, { useEffect, useState } from "react";
import TheftStoresRow from "./TheftStoresRow";
import axios from "axios";
import { useSession } from "next-auth/react";
import getDateBefore from "@/utils";

const AllStores = ({ selectedRange = 7 }) => {
  const [allStoresData, setAllStoresData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchAllStoresData = async () => {
      try {
        const startDate = getDateBefore(selectedRange);
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

        if (
          response &&
          response.status === 201 &&
          response.data.newStoreDetails
        ) {
          setAllStoresData(response.data.newStoreDetails);
        }
      } catch (error) {
        console.error("Error fetching stores data:", error);
      }
    };

    if (session) {
      fetchAllStoresData();
    }
  }, [session, selectedRange]);

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allStoresData ? allStoresData.slice(startIndex, endIndex) : [];
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(allStoresData.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentPageData = getPageData();
  const maxPage = Math.ceil(allStoresData?.length / itemsPerPage);

  return (
    <div>
      <h1 className="pt-4 mb-3 font-medium">All Stores</h1>
      <div className="flex flex-col gap-2 px-2">
        {currentPageData &&
          currentPageData.map((store, index) => (
            <TheftStoresRow key={index} store={store} />
          ))}
      </div>
      <div className="pagination flex justify-end mr-4 mt-2 text-xs">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-2 py-1 mr-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          Previous
        </button>
        <span className="px-4 py-2 mr-2">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === maxPage}
          className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllStores;
