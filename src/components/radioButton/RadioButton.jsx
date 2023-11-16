import PropTypes from "prop-types";
import { Radio } from "@material-tailwind/react";
import { useController } from "react-hook-form";
const RadioButton = ({
  color = "blue-gray",
  label,
  labelRadio,
  className,
  name,
  ripple,
  value,
  errors,
  control,
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className={className}>
      <div>{labelRadio}</div>
      <Radio
        color={color}
        label={label}
        name={name}
        ripple={ripple}
        {...field}
        value={value}
      ></Radio>
      {errors.name && (
        <p className="mt-2 ml-1 text-xs text-red-500">{errors.name.message}</p>
      )}
    </div>
  );
};
RadioButton.propTypes = {
  errors: PropTypes.object,
  color: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool,
  name: PropTypes.string,
  ripple: PropTypes.bool,
  label: PropTypes.string,
  labelRadio: PropTypes.string,
  control: PropTypes.any.isRequired,
};

export default RadioButton;
