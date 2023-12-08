import axios from "../../config/axios";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { Option, Select } from "@material-tailwind/react";

const OrderManage = () => {
  const [orderData, setOrderData] = useState([]);
  const [selectTypeOrder, setSelectTypeOrder] = useState("");
  const user = useSelector(selectCurrentUser);
  const [editableOrderId, setEditableOrderId] = useState(null);
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setOrderData(response.data);
      } catch (error) {
        setOrderData([]);
        console.log(error);
      }
    };
    if (selectTypeOrder !== "") {
      fetchData(`/order?type=${selectTypeOrder}`);
    } else {
      fetchData("/order");
    }
  }, [selectTypeOrder, user.accessToken]);
  const handleChangeSelect = (value) => {
    setSelectTypeOrder(value);
  };
  const handleEditClick = (orderId) => {
    setEditableOrderId(orderId);
  };

  const handleCancelEdit = () => {
    setEditableOrderId(null);
  };
  const statusColorMap = {
    PENDING: "orange",
    PAID: "green",
    DELIVERING: "blue",
    SUCCESSFUL: "green",
    CANCELLED: "red",
    RETURNED: "gray",
  };
  return (
    <div className="flex flex-col items-end justify-center gap-2">
      <div className="mr-10">
        <Select
          label="Select Type Order"
          value={selectTypeOrder}
          onChange={handleChangeSelect}
        >
          <Option value="PENDING">PENDING</Option>
          <Option value="PAID">PAID</Option>
          <Option value="DELIVERING">DELIVERING</Option>
          <Option value="SUCCESSFUL">SUCCESSFUL</Option>
          <Option value="CANCELLED">CANCELLED</Option>
          <Option value="RETURNED">RETURNED</Option>
        </Select>
      </div>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Customer</th>
            <th className="px-6 py-4 font-medium text-gray-900">Items</th>
            <th className="px-6 py-4 font-medium text-gray-900">Price</th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Purchase Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Status</th>
            <th className="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {orderData.map((item, index) => (
            <tr key={index}>
              <td className="rc-table-cell">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={item.accountDto.image}
                    alt="avatar"
                    className="object-cover w-10 h-10 rounded-full "
                    loading="lazy"
                  />
                  <div className="grid gap-0.5">
                    <p className="text-sm font-medium text-gray-900 font-lexend dark:text-gray-700">
                      {item.accountDto.fullName}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      {item.accountDto.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <p className="flex items-center justify-center font-medium text-gray-700">
                  {item.orderDetailsDto.length}
                </p>
              </td>
              <td className="p-3">
                <p className="flex items-center justify-center font-medium text-gray-700">
                  {item.orderDto.total}
                </p>
              </td>
              <td className="p-3">
                <p className="flex items-center justify-center font-medium text-gray-700">
                  {item.orderDto.purchaseDate}
                </p>
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center">
                  <span
                    className={`inline-flex items-center justify-center w-2 h-2 font-semibold leading-none text-white bg-${
                      statusColorMap[item.orderDto.typeOrder]
                    }-500 rounded-full rizzui-badge color`}
                  ></span>
                  <p
                    className={`font-medium text-${
                      statusColorMap[item.orderDto.typeOrder]
                    }-500 ms-2`}
                  >
                    {item.orderDto.typeOrder}
                  </p>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-3">
                  {editableOrderId === item.orderDto.id ? (
                    <button
                      onClick={handleCancelEdit}
                      className="p-3 text-2xl cursor-pointer hover:text-blue-500"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(item.orderDto.id)}
                      className="p-3 text-2xl cursor-pointer hover:text-blue-500"
                    >
                      <CiEdit className="w-8" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManage;
