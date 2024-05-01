"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const DashboardEmployeeSafetyProtocol = () => {
  const [employeeSafetyData, setEmployeeSafetyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const itemsPerPage = 10;
  const storeId = 1; // Assuming the storeId is 1 for now

  useEffect(() => {
    const fetchEmployeeSafetyData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/storeEmployee/getSafetyDetailsOfAllEmployeesByStore/${storeId}/${currentPage}/${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.token}`,
            },
          }
        );

        if (response.status === 200 && response.data) {
          setEmployeeSafetyData(response.data);
        }
      } catch (error) {
        console.error('Error fetching employee safety data:', error);
      }
    };

    if (session) {
      fetchEmployeeSafetyData();
    }
  }, [currentPage, session]);

  return (
    <div className="shadow-1 rounded-xl flex-1">
      <p className="font-medium">Safety Protocols</p>

      <table className="w-fill">
        <thead>
          <tr className="[&>th]:font-regular [&>th]:text-regular [&>th]:py-2 [&>th]:px-4">
            <th align="left">Employee</th>
            <th>Mask</th>
            <th>Gloves</th>
            <th>Hairnet</th>
            <th>Uniform</th>
            <th>Breaking SOPs</th>
          </tr>
        </thead>
        <tbody>
          {employeeSafetyData.map((employee, index) => (
            <tr
              key={index}
              className={`[&>td]:text-regular [&>td]:px-4 [&>td]:py-2 [&>td]:text-center ${
                index % 2 === 0 ? 'even-table-row' : 'odd-table-row'
              } [&>*]:text-dark-blue-4`}
            >
              <td>
                <div className="flex items-center gap-2">
                  <div className="relative w-[18px] h-[18px]">
                    <Image
                      src={employee.employee_image_url}
                      alt={employee.employee_name}
                      fill
                      className="rounded-md object-cover"
                      width={18}
                      height={18}
                    />
                  </div>
                  {employee.employee_name}
                </div>
              </td>
              <td align="center" className={`!text-${employee.mask ? 'green' : 'pink'}`}>
                {employee.mask ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
              </td>
              <td align="center" className={`!text-${employee.gloves ? 'green' : 'pink'}`}>
                {employee.gloves ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
              </td>
              <td align="center" className={`!text-${employee.hairnet ? 'green' : 'pink'}`}>
                {employee.hairnet ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
              </td>
              <td align="center" className={`!text-${employee.uniform ? 'green' : 'pink'}`}>
                {employee.uniform ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
              </td>
              <td>{employee.breaking_sops}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardEmployeeSafetyProtocol;
