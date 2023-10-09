import propTypes from "prop-types";
import { Button as ButtonTailWind } from "@material-tailwind/react";
const Button = ({ color = "", className = "w-[100px]", children, outline }) => {
  return (
    <ButtonTailWind variant={outline} className={className} color={color}>
      {children}
    </ButtonTailWind>
  );
};
Button.propTypes = {
  color: propTypes.string,
  className: propTypes.string,
  children: propTypes.element,
  src: propTypes.string,
  outline: propTypes.string
};
export default Button;