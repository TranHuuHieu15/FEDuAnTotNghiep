import PropTypes from "prop-types";
import { Input as InputTailWind } from "@material-tailwind/react";
import { useController } from "react-hook-form";

const Input = ({
  control,
  className,
  icon = "",
  color,
  label,
  type = "text",
  errors,
  ...props
}) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <>
      <div className={className}>
        <InputTailWind
          type={type}
          color={color}
          label={label}
          icon={icon}
          {...field}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
    </>
  );
};
Input.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  className: PropTypes.string,
  icon: PropTypes.any,
  errors: PropTypes.object,
};
export default Input;
