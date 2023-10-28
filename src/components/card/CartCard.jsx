import { BsTrash } from "react-icons/bs";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Select from "../select/Select";

const CartCard = () => {
  return (
    <>
      <div className="flex gap-5 my-5 w-[750px] h-52">
        <img
          src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU0fHxjbG90aGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="object-cover w-[200px] h-full"
        />
        <div className="flex flex-col w-[400px] gap-5">
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg font-medium not-italic font-eculid text-[#374151]">
              Floral Print Notched Neckline
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
            <div className="flex gap-2 p-2 py-2 rounded-md shadow-3xl">
              <Select
                title="Size: "
                className="mr-2 outline-none hover:cursor-pointer"
              >
                <option value="option1">S</option>
                <option value="option2">M</option>
                <option value="option3">L</option>
                <option value="option4">XL</option>
              </Select>
            </div>
            <div className="flex items-center h-10 gap-2 p-3 rounded-md shadow-3xl outline-2 w-28">
              <button className="flex items-center justify-center">
                <FaMinusCircle />
              </button>
              <span
                type="number"
                min="0"
                value="1"
                className="flex items-center justify-center w-20"
              >
                1
              </span>
              <button className="flex items-center justify-center">
                <FaPlusCircle />
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-[150px] gap-2 items-center justify-center">
          <BsTrash className="w-5 h-5" size={"100px"} />
          <p className="text-sm not-italic font-normal cursor-pointer font-eculid">
            Remove Item
          </p>
        </div>
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
