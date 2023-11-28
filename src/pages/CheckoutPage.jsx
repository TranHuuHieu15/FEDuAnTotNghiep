import { Step, Stepper } from "@material-tailwind/react";
import SiteLayout from "../layout/SiteLayout";
import { AiOutlineCheck, AiOutlineShoppingCart } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { useEffect, useState } from "react";
import Heading from "../components/heading/Heading";
import Select from "../components/select/Select";
import Button from "../components/button/Button";
import RadioButton from "../components/radioButton/RadioButton";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CheckoutList from "../components/list/CheckoutList";
import axios from "axios";
import { selectCurrentUser } from "../redux/features/authSlice";

const deliveryMethods = [
  { id: 1, name: "Standard", description: "4-10 business days", price: 5.0 },
  { id: 2, name: "Express", description: "3-5 business days", price: 10.0 },
  { id: 3, name: "Viettel Post", description: "5-7 business days", price: 7.0 },
];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [voucherData, setVoucherData] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(
    deliveryMethods.find((method) => method.id === 1) || {}
  );
  const cartData = useSelector((state) => state.cart.products);
  const userInfo = useSelector(selectCurrentUser);
  const totalAmount = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const shippingFee = selectedDelivery?.price;
  const taxes = 0.2;
  const total = totalAmount + shippingFee + taxes;
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(`/voucher/accountId/${userInfo.id}`);
        setVoucherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVoucher();
  }, [userInfo.id]);
  const handleMethodClick = (id) => {
    const selectedMethod = deliveryMethods.find(
      (delivery) => delivery.id === id
    );
    if (selectedDelivery && selectedDelivery.id === id) {
      setSelectedDelivery(null);
    } else {
      setSelectedDelivery(selectedMethod);
    }
  };
  return (
    <>
      <SiteLayout>
        <div className="w-[1000px] mx-auto px-8 py-4">
          <Stepper activeStep={activeStep}>
            <Step onClick={() => setActiveStep(0)}>
              <AiOutlineShoppingCart className="w-5 h-5" />
            </Step>
            <Step onClick={() => setActiveStep(1)}>
              <MdPayment className="w-5 h-5" />
            </Step>
            <Step onClick={() => setActiveStep(2)}>
              <FaShippingFast className="w-5 h-5" />
            </Step>
          </Stepper>
        </div>
        <div className="flex gap-5 px-10 mx-auto w-[1200px]">
          <div className="flex flex-col w-full">
            <Heading className="px-2 text-base">Shipping information</Heading>
            <form>
              <div className="flex flex-col gap-3 my-2">
                /...................../
              </div>
              <label className="text-lg font-eculid">Delivery method</label>
              <div className="flex gap-2 py-2">
                {deliveryMethods.map((delivery) => (
                  <div
                    key={delivery.id}
                    className={`flex w-[170px] px-2 py-1 cursor-pointer ${
                      selectedDelivery && selectedDelivery.id === delivery.id
                        ? "rounded-lg outline outline-1 outline-pink-400"
                        : "outline outline-1 outline-blue-gray-800 rounded-lg"
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
                          className="mt-1 ml-auto bg-pink-400 rounded-full justify-self-end"
                          color="white"
                        />
                      )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-eculid">Payment</label>
                <div className="flex justify-start gap-2">
                  <RadioButton
                    label="Credit card"
                    name="paymentMethod"
                    ripple={true}
                    color="pink"
                    control={control}
                    errors={errors}
                  />
                  <RadioButton
                    label="VNPay"
                    name="paymentMethod"
                    ripple={true}
                    color="pink"
                    control={control}
                    errors={errors}
                  />
                  <RadioButton
                    label="Momo"
                    name="paymentMethod"
                    ripple={true}
                    color="pink"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col gap-3 w-[525px]">
                  <Input
                    label="Card number"
                    name="cardNumber"
                    control={control}
                    errors={errors}
                  />
                  <Input
                    label="Name on card"
                    name="nameCard"
                    control={control}
                    errors={errors}
                  />
                  <Input
                    label="Expriration date (MM/YY)"
                    name="exprirationDate"
                    control={control}
                    errors={errors}
                  />
                  <Input
                    label="CVV"
                    name="ccv"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Heading className="px-4 text-base">Order summary</Heading>
            <div className="flex flex-col gap-2 px-4 py-4 mx-4 rounded-lg shadow-xl">
              <div className="flex flex-col gap-5 my-4">
                <CheckoutList></CheckoutList>
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

                <div className="flex flex-col gap-2">
                  <Select
                    title="Apply Coupon: "
                    name="voucher"
                    className="px-3 py-2 w-[200px]"
                    className2="px-1 font-bold w-[200px]"
                    control={control}
                    errors={errors}
                    options={voucherData}
                  ></Select>
                </div>

                <div className="flex gap-36 bg-[#F3F4F6] px-5 py-3 font-bold justify-between">
                  <p>Total:</p>
                  <span>${total}</span>
                </div>

                <Button className="w-full shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                  Confirm Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
};

export default CheckoutPage;
