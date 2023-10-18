import { FaPlusCircle, FaMinusCircle, FaShippingFast } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";
import Button from "../components/button/Button";
import { Collapse, Typography } from "@material-tailwind/react";
import React from "react";
import SiteLayout from "../layout/SiteLayout";
import Comment from "../components/comment/Comment";
const ProductDetailPage = () => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);
  return (
    <SiteLayout>
      <div className="flex gap-6 mx-32 mt-5">
        <div className="flex w-[630px] flex-col">
          <img
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="w-full h-[554px] object-fill"
          />
          <div className="flex flex-row gap-3 mx-auto mt-2">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="w-[146px] h-[154px] object-fill"
            />
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="w-[146px] h-[154px] object-fill"
            />
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="w-[146px] h-[154px] object-fill"
            />
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="w-[146px] h-[154px] object-fill"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 mt-2">
          <div className="flex flex-col items-start w-full gap-6">
            <div className="gap-4">
              <p className="text-2xl not-italic font-normal font-eculid">
                Floral Print Notched Neckline Dress
              </p>
              <span className="text-3xl not-italic font-bold leading-normal font-eculid">
                $100.00
              </span>
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Size:
              </h5>
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-gray-300 border-none rounded-full outline-none opacity-50 cursor-pointer hover:opacity-100">
                  S
                </button>
                <button className="w-8 h-8 bg-gray-300 border-none rounded-full outline-none opacity-50 cursor-pointer hover:opacity-100">
                  M
                </button>
                <button className="w-8 h-8 bg-gray-300 border-none rounded-full outline-none opacity-50 cursor-pointer hover:opacity-100">
                  L
                </button>
                <button className="w-8 h-8 bg-gray-300 border-none rounded-full outline-none opacity-50 cursor-pointer hover:opacity-100">
                  XL
                </button>
              </div>
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Color:
              </h5>
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-black border-none rounded-full outline-none cursor-pointer hover:opacity-100"></button>
                <button className="w-8 h-8 bg-red-500 border-none rounded-full outline-none cursor-pointer hover:opacity-100"></button>
                <button className="w-8 h-8 bg-yellow-500 border-none rounded-full outline-none cursor-pointer hover:opacity-100"></button>
                <button className="w-8 h-8 bg-green-500 border-none rounded-full outline-none cursor-pointer hover:opacity-100"></button>
              </div>
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Quantity:
              </h5>
              <div className="flex items-center justify-center gap-2 p-2 h-9 outline outline-offset-2 outline-2 w-28">
                <button>
                  <FaMinusCircle />
                </button>
                <span
                  type="number"
                  min="0"
                  value="1"
                  className="w-20 text-center"
                >
                  1
                </span>
                <button>
                  <FaPlusCircle />
                </button>
              </div>
            </div>
            <div className="flex w-[560px] gap-4">
              <Button className="w-full shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                Add to Cart
              </Button>
              <Button className="w-full shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                Buy Now
              </Button>
            </div>
            <div className="flex flex-col items-start gap-14">
              <div className="flex gap-3 px-4 py-8 bg-[#F3F4F6] w-[560px]">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-6">
                    <div className="flex items-center justify-center">
                      <FaShippingFast />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-medium">Free shipping</h5>
                      <p className="text-sm">
                        Free standard shipping on orders over 9,00€ Estimated to
                        be delivered on 28/02/2022 - 03/03/2022.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6">
                    <div className="flex items-center justify-center">
                      <MdSecurity />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-medium">Return Policy</h5>
                      <p className="text-sm">Learn More</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-10">
                <div className="flex items-center justify-center gap-[465px]">
                  <p className="text-lg font-semibold font-eculid">
                    Description
                  </p>
                  <button onClick={toggleOpen}>
                    <AiOutlinePlus />
                  </button>
                </div>
                <div>
                  <Collapse open={open} className="flex flex-col">
                    <Typography className="w-[480px] mx-auto my-2">
                      Use our Tailwind CSS collapse for your website. You can
                      use if for accordion, collapsible items and much more.
                    </Typography>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-32">
        <h3 className="text-2xl font-semibold font-eculid">Customer Reviews</h3>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
      </div>
    </SiteLayout>
  );
};

export default ProductDetailPage;
