import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Select = ({ className, title, options, className2, control, name }) => {
  const selectClasses = `border rounded-md ${className}`;

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      {title && <label className={className2}>{title}</label>}
      <select className={selectClasses} {...field}>
        {options.map((item) => (
          <option value={item.name} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  className2: PropTypes.string,
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
