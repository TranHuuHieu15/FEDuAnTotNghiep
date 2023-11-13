import PropTypes from "prop-types";
import { Input as InputTailWind } from "@material-tailwind/react";
import { useController } from "react-hook-form";

const Input = ({
  variant = "outlined",
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
          variant={variant}
          {...field}
          value={
            type === "datetime-local" ? field.value.slice(0, 16) : field.value
          }
        />
        {errors.name && (
          <p className="mt-2 ml-1 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
    </>
  );
};
Input.propTypes = {
  variant: PropTypes.string,
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
