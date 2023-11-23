import PropTypes from "prop-types";
import { AiOutlineCheck } from "react-icons/ai";

const Color = ({ color = [], onColorChange, selectedColor }) => {
  const classNames = `w-8 h-8 border-none rounded-full outline-none cursor-pointer hover:opacity-100 relative`;
  const uniqueColors = new Set(color.map((item) => item.colorId));
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {[...uniqueColors].map((uniqueColor) => (
          <span
            key={uniqueColor}
            className={`${classNames}`}
            style={{ backgroundColor: uniqueColor }}
            onClick={() => onColorChange(uniqueColor)}
          >
            {selectedColor === uniqueColor && (
              <AiOutlineCheck className="absolute bottom-0 right-0 text-white transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </span>
        ))}
      </div>
    </>
  );
};

Color.propTypes = {
  color: PropTypes.array.isRequired,
  selectedColor: PropTypes.string,
  onColorChange: PropTypes.func.isRequired,
};

export default Color;
