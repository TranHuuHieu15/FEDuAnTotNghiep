import React from "react";
import PropTypes from "prop-types";
const CustomSelect = ({
  className,
  title,
  options,
  className2 = "text-blue-gray-500 text-sm",
  name,
  value,
  onChange,
}) => {
  const selectClasses = `w-full border-2 p-2 rounded-md ${className}`;
  return (
    <>
      {title && <label className={className2}>{title}</label>}
      <select
        id={name}
        name={name} // Thêm thuộc tính name vào select element
        value={value}
        onChange={onChange}
        className={selectClasses}
      >
        <option value="" disabled>
          {title}
        </option>
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

CustomSelect.propTypes = {
  className: PropTypes.string,
  className2: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  name: PropTypes.string, // Thêm prop "name"
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomSelect;
