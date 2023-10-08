import propTypes from "prop-types";
import { Button as ButtonTailWind } from "@material-tailwind/react";
const Button = ({ size, color = "", className, outline, children }) => {
  return (
    <ButtonTailWind
      variant={outline}
      className={className}
      size={size}
      color={color}
    >
      {children}
    </ButtonTailWind>
  );
};
Button.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
  className: propTypes.string,
  children: propTypes.string,
  outline: propTypes.string,
};
export default Button;
