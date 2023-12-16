import { useEffect, useState } from "react";
import OrderList from "../../components/list/OrderList";
import Tabs from "../../components/tabs/Tabs";
import axios from "../../config/axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const AccountOrder = () => {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("PENDING");
  const [orders, setOrders] = useState([]);

  const tabs = [
    { label: "Pending", value: "PENDING" },
    { label: "To Pay", value: "WAIT_TO_PAY" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Delivering", value: "DELIVERING" },
    { label: "Completed", value: "SUCCESSFUL" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Returned", value: "RETURNED" },
  ];

  useEffect(() => {
    const fetchOrdersByStatus = async () => {
      try {
        const response = await axios.get(`/order?type=${activeTab}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        if (error.response.status === "404") {
          setOrders([]);
        }
      }
    };
    if (!token) {
      navigate("/login");
    } else {
      fetchOrdersByStatus();
    }
  }, [activeTab, token]);

  return (
    <div className="flex flex-col gap-5">
      <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />
      <OrderList orders={orders} />
    </div>
  );
};

export default AccountOrder;
