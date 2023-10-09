
import propTypes from "prop-types";
import { Input as InputTailWind } from "@material-tailwind/react";

const Input = ({ className, name, variant, color, children, icon }) => {
  return (
    <InputTailWind className={className} name={name} variant={variant} color={color} icon={icon}>
      {children}
    </InputTailWind>
  );
};
Input.propTypes = {
  className: propTypes.string,
  name: propTypes.string.isRequired,
  variant: propTypes.string,
  color: propTypes.string,
  icon: propTypes.node,
  children: propTypes.element
};
export default Input;