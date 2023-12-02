import { Radio } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const RadioButtonFilter = ({
  color = "blue-gray",
  label,
  labelRadio,
  className,
  name,
  ripple,
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
      ></Radio>
    </div>
  );
};
RadioButtonFilter.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  ripple: PropTypes.bool,
  label: PropTypes.string,
  labelRadio: PropTypes.string,
  control: PropTypes.any.isRequired,
};

export default RadioButtonFilter;
