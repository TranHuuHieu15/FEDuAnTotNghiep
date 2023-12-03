import PropTypes from "prop-types";
import { useController } from "react-hook-form";
const CustomSelect = ({
  className,
  title,
  options,
  className2 = "text-blue-gray-500 text-sm",
  name,
  value,
  onChange,
  control,
}) => {
  const selectClasses = `w-full border-2 p-2 rounded-md ${className}`;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      {title && <label className={className2}>{title}</label>}
      <select
        id={name}
        value={value}
        name={name} // Thêm thuộc tính name vào select element
        className={selectClasses}
        {...field}
        onChange={(e) => {
          field.onChange(e);
          onChange(e);
        }}
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
      code: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  name: PropTypes.string, // Thêm prop "name"
  value: PropTypes.string,
  onChange: PropTypes.func,
  control: PropTypes.any.isRequired,
};

export default CustomSelect;
