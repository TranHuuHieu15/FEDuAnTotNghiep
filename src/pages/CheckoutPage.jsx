import { Step, Stepper } from "@material-tailwind/react";
import SiteLayout from "../layout/SiteLayout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { useState } from "react";
import Heading from "../components/heading/Heading";
import { BsTrash } from "react-icons/bs";
import Select from "../components/select/Select";
import Button from "../components/button/Button";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
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
              <div className="flex flex-col gap-3 my-2"></div>
            </form>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Heading className="px-4 text-base">Order summary</Heading>
            <div className="flex flex-col gap-2 px-4 py-4 mx-4 rounded-lg shadow-3xl">
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="image"
                  className="w-48 h-48"
                />
                <div className="flex flex-col w-[220px] gap-3">
                  <p className="text-lg font-medium font-eculid">Basic Tee</p>
                  <p className="text-lg font-semibold font-eculid">$188</p>
                  <p className="flex gap-2 text-lg font-medium font-eculid">
                    Color:
                    <span className="w-5 h-5 mt-1 bg-orange-500 border-none rounded-full outline-none cursor-pointer hover:opacity-100"></span>
                  </p>

                  <p className="flex gap-2 text-lg font-medium font-eculid">
                    Size: M
                  </p>
                  <p className="flex gap-2 text-lg font-medium font-eculid">
                    Quantity: 1
                  </p>
                </div>
                <div className="flex w-[150px] gap-2 items-stretch hover:cursor-pointer">
                  <BsTrash className="w-5 h-5" size={"100px"} />
                  <p className="text-sm not-italic font-normal cursor-pointer font-eculid">
                    Remove Item
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 my-4">
                <div className="flex gap-20 justify-between bg-[#F3F4F6] px-5 py-5">
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

                <div className="flex flex-col gap-2">
                  <Select
                    title="Apply Coupon: "
                    className="px-3 py-2 w-[200px]"
                    className2="px-1 font-bold w-[200px]"
                  >
                    <option value="">Choose the coupon</option>
                    <option value="">Mã coupon</option>
                    <option value="">Mã coupon</option>
                    <option value="">Mã coupon</option>
                    <option value="">Mã coupon</option>
                  </Select>
                </div>

                <div className="flex gap-36 bg-[#F3F4F6] px-5 py-3 font-bold justify-between">
                  <p>Total:</p>
                  <span>$283.17</span>
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
