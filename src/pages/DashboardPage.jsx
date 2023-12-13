import axios from "../config/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/authSlice";
import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const user = useSelector(selectCurrentUser);
  const [statisticByYear, setStatisticDataByYear] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalSale, setTotalTotalSale] = useState(0);
  const [totalOrder, setTotalTotalOrder] = useState(0);
  const [dateBefore, setDateBefore] = useState(formatDate(new Date()));
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);
  const [dateAfter, setDateAfter] = useState(formatDate(futureDate));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/statistic/income?dateBefore=${dateBefore}&dateAfter=${dateAfter}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        console.log(response.data);
        setStatisticDataByYear(response.data);
      } catch (error) {
        setStatisticDataByYear([]);
        console.log(error);
      }
    };
    fetchData();
  }, [dateBefore, dateAfter, user.accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/account/CUSTOMER`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setTotalCustomer(response["all-item"]);
        response.data;
      } catch (error) {
        setStatisticDataByYear([]);
        console.log(error);
      }
    };
    fetchData();
  }, [user.accessToken]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/order/SUCESSFULLY`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const totalAmount = response.data.reduce(
          (total, order) => total + order.orderDto.total,
          0
        );
        setTotalTotalSale(totalAmount);
        setTotalTotalOrder(response["all-item"]);
        response.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.accessToken]);

  const handleDateBeforeChange = (e) => {
    const newDateBefore = formatDate(new Date(e.target.value));
    setDateBefore(newDateBefore);
  };

  const handleDateAfterChange = (e) => {
    const newDateAfter = formatDate(new Date(e.target.value));
    setDateAfter(newDateAfter);
  };
  return (
    <>
      <div className="flex flex-col justify-center lg:mr-16">
        <div className="flex flex-row flex-wrap">
          <div className="flex-shrink w-full max-w-full px-4">
            <p className="mt-3 mb-5 text-xl font-bold text-blue-gray-900">
              Statistics
            </p>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                Total Orders
                <div className="text-green-500 ltr:float-right rtl:float-left">
                  +12%
                  <div
                    className="absolute top-auto mb-3 bottom-full"
                    style={{ display: "none" }}
                  >
                    <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-center text-white bg-black rounded-lg shadow-lg">
                      Since last month
                    </div>
                    <div className="absolute bottom-0 w-1 p-1 -mb-2 transform -rotate-45 bg-black ltr:ml-6 rtl:mr-6"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-pink-500 bg-pink-100 rounded-full w-14 h-14 dark:bg-pink-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-cart3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">{totalOrder}</h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/order"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                Total Sales
                <div className="text-green-500 ltr:float-right rtl:float-left">
                  +15%
                  <div
                    className="absolute top-auto mb-3 bottom-full"
                    style={{ display: "none" }}
                  >
                    <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-center text-white bg-black rounded-lg shadow-lg">
                      Since last month
                    </div>
                    <div className="absolute bottom-0 w-1 p-1 -mb-2 transform -rotate-45 bg-black ltr:ml-6 rtl:mr-6"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-yellow-500 bg-yellow-100 rounded-full w-14 h-14 dark:bg-yellow-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-credit-card"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"></path>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">
                  <span>$</span>
                  {totalSale}
                </h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/order"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                New Customers
                <div className="text-pink-500 ltr:float-right rtl:float-left">
                  -5%
                  <div
                    className="absolute top-auto mb-3 bottom-full"
                    style={{ display: "none" }}
                  >
                    <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-center text-white bg-black rounded-lg shadow-lg">
                      Since last month
                    </div>
                    <div className="absolute bottom-0 w-1 p-1 -mb-2 transform -rotate-45 bg-black ltr:ml-6 rtl:mr-6"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-green-500 bg-green-100 rounded-full w-14 h-14 dark:bg-green-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">1.2K</h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/account"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                Total Users{" "}
                <span className="w-2 h-2 mt-1 bg-green-500 rounded-full ltr:float-right rtl:float-left animate-pulse"></span>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-indigo-500 bg-indigo-100 rounded-full w-14 h-14 dark:bg-indigo-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">{totalCustomer}</h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/account"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-end justify-center gap-3">
            <div className="flex items-center justify-center gap-3 mr-10">
              <Input
                type="date"
                name="registerDate"
                label="Register Date"
                className="w-full"
                onChange={handleDateBeforeChange}
              />
              <Input
                type="datetime-local"
                name="registerDate"
                label="Register Date"
                className="w-full"
                onChange={handleDateAfterChange}
              />
            </div>
            <table className="w-full table-auto">
              <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Customer
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">Items</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Price</th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Purchase Date
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {/* {statisticByYear.map((item, index) => ( */}
                <tr>
                  <td className="rc-table-cell">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src=""
                        alt="avatar"
                        className="object-cover w-10 h-10 rounded-full "
                        loading="lazy"
                      />
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium text-gray-900 font-lexend dark:text-gray-700"></p>
                        <p className="text-[13px] text-gray-500"></p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="flex items-center justify-center font-medium text-gray-700"></p>
                  </td>
                  <td className="p-3">
                    <p className="flex items-center justify-center font-medium text-gray-700"></p>
                  </td>
                  <td className="p-3">
                    <p className="flex items-center justify-center font-medium text-gray-700"></p>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
