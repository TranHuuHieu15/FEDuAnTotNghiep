import React from "react";
import { Stepper, Step } from "@material-tailwind/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import CartCard from "../components/card/CartCard";
import Select from "../components/select/Select";
import Button from "../components/button/Button";
import SiteLayout from "../layout/SiteLayout";
import { FaShippingFast } from "react-icons/fa";
const CartPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);

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
        <div className="flex gap-10 mx-36">
          <div className="flex flex-col">
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
          </div>
          <div className="flex flex-col gap-5 mx-5 my-10">
            <div className="flex gap-20 bg-[#F3F4F6] px-5 py-5">
              <div className="flex flex-col">
                <p>Total Amount:</p>
                <p>Shipping Fee:</p>
                <p>Taxes:</p>
              </div>
              <div className="flex flex-col not-italic font-bold font-eculid">
                <span>$274.97</span>
                <span>NIL</span>
                <span>$0.2</span>
              </div>
            </div>

            <div className="flex gap-36 bg-[#F3F4F6] px-5 py-3 font-bold">
              <p>Total:</p>
              <span>$283.17</span>
            </div>

            <div className="flex flex-col">
              <Select title="Apply Coupon: " className="px-3 py-2 w-[200px]" className2="px-1 pb-4 font-bold w-[200px]">
                <option value="">Choose the option</option>
                <option value="">Mã coupon</option>
                <option value="">Mã coupon</option>
                <option value="">Mã coupon</option>
                <option value="">Mã coupon</option>
              </Select>
            </div>
            <Button className="w-[462px] shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
              Purchase
            </Button>
          </div>
        </div>
      </SiteLayout>
    </>
  );
};

export default CartPage;
