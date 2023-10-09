
import propTypes from "prop-types";
import { Input as InputTailWind } from "@material-tailwind/react";

const Input = ({ className, color, children, icon, size, label, type }) => {
  return (
    <div className={className}>
      <InputTailWind type={type} color={color} icon={icon} size={size} label={label}>
        {children}
      </InputTailWind>
    </div>
  );
};
Input.propTypes = {
  className: propTypes.string,
  color: propTypes.string,
  icon: propTypes.string,
  children: propTypes.element,
  size: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
};
export default Input;