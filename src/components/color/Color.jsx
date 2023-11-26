import PropTypes from "prop-types";
import { AiOutlineCheck } from "react-icons/ai";

const Color = ({ color = [], onColorChange, selectedColor }) => {
  const classNames = `w-8 h-8 border rounded-full outline-none cursor-pointer hover:opacity-100 relative flex items-center justify-center`; // Removed 'border-none' to allow border styling
  const borderStyle = `text-sm font-bold border-2 border-gray-300`;
  const selectedStyle = `scale-125`;
  const uniqueColors = new Set(color.map((item) => item.colorId));
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {[...uniqueColors].map((uniqueColor) => {
          // Check for white color and apply border style
          const isWhite = uniqueColor.toUpperCase() === '#FFFFFF';
          const isSelected = uniqueColor === selectedColor;
          const colorStyle = {
            backgroundColor: uniqueColor,
            ...(isWhite && { boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)' }), // Adding a shadow for white color
          };
          return (
            <span
              key={uniqueColor}
              className={`${classNames} ${isWhite ? borderStyle : ''} ${isSelected ? selectedStyle : ''}`}
              style={colorStyle}
              onClick={() => onColorChange(uniqueColor)}
            >
            </span>
          );
        })}
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
