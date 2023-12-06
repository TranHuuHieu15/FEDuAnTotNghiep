import SiteLayout from "../layout/SiteLayout";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import Heading from "../components/heading/Heading";
import Button from "../components/button/Button";
import { useSelector } from "react-redux";
import CheckoutList from "../components/list/CheckoutList";
import axios from "../config/axios";
import StepLine from "../components/step/StepLine";
import { MdOutlinePlace } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import DialogVoucher from "../components/dialog/DialogVoucher";
import { selectCurrentUser } from "../redux/features/authSlice";

const deliveryMethods = [
  { id: 1, name: "Standard", description: "4-10 business days", price: 5.0 },
  { id: 2, name: "Express", description: "3-5 business days", price: 10.0 },
  { id: 3, name: "Viettel Post", description: "5-7 business days", price: 7.0 },
];

const CheckoutPage = () => {
  const user = useSelector(selectCurrentUser);
  const [paymentData, setPaymentData] = useState([]);
  const [openDeliveryAddress, setOpenDeliveryAddress] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [selectVoucher, setSelectVoucher] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(
    deliveryMethods.find((delivery) => delivery.id === 1) || {}
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    deliveryMethods.find((payment) => payment.id === 1) || {}
  );
  const cartData = useSelector((state) => state.cart.products);
  const totalAmount = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shippingFee = selectedDelivery?.price;
  const taxes = 0.2;
  const total = totalAmount - discount + shippingFee + taxes;

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`/payment`);
        setPaymentData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPayment();
  }, []);
  useEffect(() => {
    const matchDiscount = () => {
      let discountValue = 0;
      if (totalAmount > selectVoucher?.minTotal) {
        if (selectVoucher.typeDiscount === "PERCENT") {
          discountValue = selectVoucher.discount * totalAmount;
          if (discountValue > selectVoucher.maxDiscount) {
            discountValue = selectVoucher.maxDiscount;
          }
        } else {
          discountValue = selectVoucher.discount;
        }
      }
      return discountValue;
    };
    setDiscount(matchDiscount());
  }, [selectVoucher, totalAmount]);
  const handleOrder = async () => {
    const orderItem = {
      orderDto: {
        total: total,
        deliveryAddressId: 1,
        paymentId: selectedPaymentMethod.id,
      },
      orderDetailsDto: cartData,
      discount: selectVoucher.discount,
    };
    try {
      const response = await axios.post(`/order/create`, orderItem, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(response);
      if (selectedPaymentMethod.name === "VN PAY") {
        const orderDtoId = response.data.orderDto.id;
        const responseVNPay = await axios.get(
          `order/payment?orderId=${orderDtoId}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        console.log(responseVNPay);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUseVoucher = (usedVoucher) => {
    setSelectVoucher(usedVoucher);
  };
  const handleMethodClick = (id) => {
    const selectDelivery = deliveryMethods.find(
      (delivery) => delivery.id === id
    );
    if (selectedDelivery && selectedDelivery.id === id) {
      setSelectedDelivery(null);
    } else {
      setSelectedDelivery(selectDelivery);
    }
  };
  const handlePaymentMethodClick = (id) => {
    const selectPayment = paymentData.find((payment) => payment.id === id);
    if (selectedPaymentMethod && selectedPaymentMethod.id === id) {
      setSelectedPaymentMethod(null);
    } else {
      setSelectedPaymentMethod(selectPayment);
    }
  };
  const handleOpenVoucher = () => {
    setOpenVoucher(true);
  };
  const handleCloseVoucher = () => {
    setOpenVoucher(false);
  };
  const handleOpenDeliveryAddress = () => {
    setOpenDeliveryAddress(true);
  };
  return (
    <>
      <SiteLayout>
        <StepLine />
        <div className="flex gap-5 mx-auto justify-center items-start w-[1200px]">
          <div className="flex flex-col w-full gap-2">
            <Heading className="px-2 text-2xl font-eculid">
              Shipping information
            </Heading>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-start justify-center gap-2 p-5 outline outline-1 outline-blue-gray-700">
                <h5 className="text-xl font-medium font-eculid">
                  Delivery address
                </h5>
                <div className="flex items-center justify-center gap-2">
                  <MdOutlinePlace />
                  <p>7/6 Ngô Chân Luw, Hòa Minh, Liên Chiểu, Đà Nẵng</p>
                </div>
                <div className="flex items-center justify-center gap-2 p-2 cursor-pointer outline outline-1 outline-blue-gray-800">
                  <AiOutlinePlus />
                  <span className="">Add new address</span>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-2 p-5 outline outline-1 outline-blue-gray-700">
                <h5 className="text-xl font-medium font-eculid">
                  Delivery method
                </h5>
                <div className="flex gap-2 py-2">
                  {deliveryMethods.map((delivery) => (
                    <div
                      key={delivery.id}
                      className={`flex w-[170px] px-2 py-1 cursor-pointer outline outline-1 rounded-lg ${
                        selectedDelivery && selectedDelivery.id === delivery.id
                          ? "outline-green-500"
                          : "outline-blue-gray-800 "
                      }`}
                      onClick={() => handleMethodClick(delivery.id)}
                    >
                      <div>
                        <p className="text-base font-eculid">{delivery.name}</p>
                        <p className="text-sm text-gray-600 font-eculid">
                          {delivery.description}
                        </p>
                        <p className="text-base font-normal font-eculid">
                          ${delivery.price}
                        </p>
                      </div>
                      {selectedDelivery &&
                        selectedDelivery.id === delivery.id && (
                          <AiOutlineCheck
                            className="mt-1 ml-auto bg-green-500 rounded-full justify-self-end"
                            color="white"
                          />
                        )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-2 p-5 outline outline-1 outline-blue-gray-700">
                <h5 className="text-xl font-medium font-eculid">
                  Payment method
                </h5>
                {paymentData.map((payment) => (
                  <div
                    key={payment.id}
                    className={`grid grid-cols-5 gap-3 p-3 outline outline-1 w-full ${
                      selectedPaymentMethod &&
                      selectedPaymentMethod.id === payment.id
                        ? "outline-green-500"
                        : "outline-blue-gray-800 "
                    }`}
                    onClick={() => handlePaymentMethodClick(payment.id)}
                  >
                    <img
                      src={payment.img}
                      alt="image"
                      className="object-cover w-12 h-12"
                    />
                    <p className="flex flex-col items-start justify-center col-span-3 gap-1">
                      <span>{payment.name}</span>
                      <span>{payment.description}</span>
                    </p>
                    <div>
                      {selectedPaymentMethod &&
                        selectedPaymentMethod.id === payment.id && (
                          <AiOutlineCheck
                            className="mt-1 ml-auto bg-green-500 rounded-full justify-self-end"
                            color="white"
                          />
                        )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 p-5 outline outline-1 outline-blue-gray-700">
                <div className="flex gap-20 justify-between bg-[#F3F4F6] px-5 py-5">
                  <div className="flex flex-col">
                    <p>Total Amount:</p>
                    <p>Shipping Fee:</p>
                    <p>Taxes:</p>
                  </div>
                  <div className="flex flex-col not-italic font-bold font-eculid">
                    <span>${totalAmount}</span>
                    <span>${shippingFee}</span>
                    <span>${taxes}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div className="flex items-center justify-start gap-2">
                    <BiSolidDiscount className="text-2xl text-deep-orange-600" />
                    <span className="text-2xl font-eculid ">Voucher</span>
                  </div>
                  {selectVoucher && <span>{selectVoucher.name}</span>}
                  <span
                    className="text-red-700 outline-none cursor-pointer "
                    onClick={handleOpenVoucher}
                  >
                    Choose voucher
                  </span>
                </div>
                <div className="flex gap-36 bg-[#F3F4F6] px-5 py-3 font-bold justify-between">
                  <p>Total:</p>
                  <span>${total}</span>
                </div>
                <Button
                  onClick={handleOrder}
                  className="w-full shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Confirm Order
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Heading className="px-4 text-2xl font-eculid">
              Order summary
            </Heading>
            <div className="flex flex-col gap-2 px-4 py-4 mx-4 rounded-lg shadow-3xl">
              <div className="flex flex-col gap-5 my-4">
                <CheckoutList></CheckoutList>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
      <DialogVoucher
        show={openVoucher}
        handleCloseVoucher={handleCloseVoucher}
        onUseVoucher={handleUseVoucher}
      />
    </>
  );
};

export default CheckoutPage;
