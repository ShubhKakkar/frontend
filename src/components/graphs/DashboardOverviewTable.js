"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import getDateBefore from "@/utils";
const DashboardTableChart = dynamic(() => import("./DashboardTableChart"), {
  ssr: false,
});

const DashboardOverviewTable = ({ selectedRange = 7 }) => {
  const [storesData, setStoresData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const startDate = getDateBefore(selectedRange);
        const token = session?.user?.token;
        const response = await axios.get(
          session?.user.role === "superadmin"
            ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/getAllStores2/${currentPage}/${itemsPerPage}/${startDate}`
            : `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/getAllStores2/${currentPage}/${itemsPerPage}/${startDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response && response.status === 401) {
          signOut();
        }
        if (
          response &&
          response.status === 201 &&
          response.data.newStoreDetails
        ) {
          setStoresData(response.data.newStoreDetails);
        }
      } catch (error) {
        console.error("Error fetching stores data:", error);
      }
    };

    if (session) {
      fetchStoresData();
    }
  }, [currentPage, session, selectedRange]);

  return (
    <div className="shadow-1 rounded-xl flex-1">
      <table className="w-full">
        <thead>
          <tr className="[&>th]:font-regular [&>th]:text-regular [&>th]:py-2 [&>th]:px-4">
            <th>Stores</th>
            <th>Customers</th>
            <th>Busy hours</th>
            <th>Most Visited Aisle</th>
            <th>Future Prediction</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {storesData.map((store, index) => (
            <tr
              key={index}
              className={`[&>td]:text-regular [&>td]:px-4 [&>td]:py-2 [&>td]:text-center ${
                index % 2 === 0 ? "even-table-row" : "odd-table-row"
              } [&>*]:text-dark-blue-4`}
            >
              <td>
                <div className="flex items-center gap-2 text-xs">
                  <div className="relative w-[18px] h-[18px]">
                    <Image
                      src={store?.logo || "/walmart.png"}
                      alt={store?.name}
                      className="rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                  </div>
                  {store.name}
                </div>
              </td>
              <td>{store?.count || 0}</td>
              <td>{store?.busy_hours || 0}</td>
              <td>
                <p className="px-3 py-1 bg-[#95FFE1] w-fit rounded-full mx-auto">
                  {store?.aisle_name || "null"}
                </p>
              </td>
              <td>
                <div className="center [&>div]:!min-h-0 h-[50px] overflow-hidden">
                  <DashboardTableChart />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardOverviewTable;
