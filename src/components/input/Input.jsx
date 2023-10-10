import propTypes from "prop-types";
import { Input as InputTailWind } from "@material-tailwind/react";

const Input = ({ className, icon = "", color, label, type }) => {
  return (
    <div className={className}>
      <InputTailWind type={type} color={color} label={label} icon={icon} />
    </div>
  );
};
Input.propTypes = {
  color: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  className: propTypes.string,
  icon: propTypes.any,
};
export default Input;
