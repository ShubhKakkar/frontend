"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import getDateBefore from '@/utils';

const DashboardEmployeeEff = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const { data: session } = useSession();
  const itemsPerPage = 10;
  const storeId = 1;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const startDate = getDateBefore(30);
        const token = session?.user?.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/storeEmployee/getEmployeeEfficiencyByStoreid/${storeId}/${startDate}/1/${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data) {
          setEmployeeData(response.data);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    if (session) {
      fetchEmployeeData();
    }
  }, [session]);

  return (
    <div className="shadow-1 rounded-xl flex-1">
      <p className="font-medium">Employee Efficiency</p>

      <table className="w-fill">
        <thead>
          <tr className="[&>th]:font-regular [&>th]:text-regular [&>th]:py-2 [&>th]:px-4">
            <th align="left">Employee</th>
            <th>Hours With Customers</th>
            <th>Sitting Idle</th>
            <th>On Mobile</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
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
              <td className="text-green-500">{employee.hours_with_customers}</td>
              <td className="text-blue-500">{employee.sitting_idle}</td>
              <td className="text-pink-500">{employee.on_mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardEmployeeEff;
