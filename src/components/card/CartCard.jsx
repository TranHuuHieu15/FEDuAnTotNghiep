import { BsTrash } from "react-icons/bs";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const CartCard = () => {
  return (
    <>
      <div className="flex gap-8 my-5">
        <img
          src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU0fHxjbG90aGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-48 h-52"
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-3">
            <p className="text-[14px] font-normal not-italic font-eculid text-[#374151]">
              Floral Print Notched Neckline Dress Without Belt Notched Neckline
            </p>
            <span className="font-eculid font-bold text-[16px] text-[#1F2937] not-italic">
              $100.00
            </span>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h5 className="text-sm not-italic font-semibold font-eculid">
              Color:
            </h5>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-orange-500 border-none rounded-full outline-none cursor-pointer hover:opacity-100"></button>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="flex items-start gap-2 p-2 outline">
              <h5 className="text-sm not-italic font-semibold font-eculid">
                Size:
              </h5>
              <span className="text-sm not-italic font-semibold font-eculid">
                M
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 h-9 outline w-28">
              <button className="flex items-center justify-center">
                <FaMinusCircle />
              </button>
              <span
                type="number"
                min="0"
                value="1"
                className="flex items-center justify-center w-20 "
              >
                1
              </span>
              <button className="flex items-center justify-center">
                <FaPlusCircle />
              </button>
            </div>
          </div>
        </div>
        <button className="flex gap-2">
          <BsTrash className="w-5 h-5" />
          <p className="text-sm not-italic font-normal font-eculid">
            Remove Item
          </p>
        </button>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1072 2"
        fill="none"
        className="w-[750px] h-1"
      >
        <path d="M0 1L1072 0.999887" stroke="#D1D5DB" />
      </svg>
    </>
  );
};

export default CartCard;
