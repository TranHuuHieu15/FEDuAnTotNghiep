import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const CustomSelect = ({
  className,
  title,
  options,
  className2,
  control,
  name,
  onChange,
}) => {
  const selectClasses = `border ${className}`;

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <>
      {title && <label className={className2}>{title}</label>}
      <select
        className={selectClasses}
        {...field}
        onChange={(e) => {
          field.onChange(e); // Gọi hàm onChange của useController
          onChange && onChange(e.target.value, e); // Gọi hàm onChange của prop
        }}
      >
        {options &&
          options.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
      </select>
    </>
  );
};

CustomSelect.propTypes = {
  className: PropTypes.string,
  className2: PropTypes.string,
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default CustomSelect;
