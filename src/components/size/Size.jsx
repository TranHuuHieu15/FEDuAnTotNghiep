import PropTypes from "prop-types";
import { AiOutlineCheck } from "react-icons/ai";

const Size = ({ size = [], onSizeChange, selectedSize }) => {
  const classNames = `w-8 h-8 bg-gray-300 border-none rounded-full relative outline-none opacity-50 cursor-pointer hover:opacity-100 flex items-center justify-center`;
  const sizeOrder = ["S", "M", "L", "XL", "XXL"];
  const sortedSizes = [...new Set(size.map((item) => item.size))].sort(
    (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
  );
  return (
    <>
      <div className="flex gap-4">
        {sortedSizes.map((uniqueSize) => (
          <span
            key={uniqueSize}
            className={`${classNames}`}
            onClick={() => onSizeChange(uniqueSize)}
          >
            {selectedSize === uniqueSize ? (
              <AiOutlineCheck className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            ) : (
              uniqueSize
            )}
          </span>
        ))}
      </div>
    </>
  );
};

Size.propTypes = {
  size: PropTypes.array.isRequired,
  selectedSize: PropTypes.string,
  onSizeChange: PropTypes.func.isRequired,
};

export default Size;
