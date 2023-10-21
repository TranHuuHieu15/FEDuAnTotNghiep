import PropTypes from "prop-types";
import { Input as InputTailWind } from "@material-tailwind/react";

const Input = ({ className, icon = "", color, label, type }) => {
  return (
    <div className={className}>
      <InputTailWind type={type} color={color} label={label} icon={icon} />
    </div>
  );
};
Input.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.any,
};
export default Input;
