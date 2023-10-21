import PropTypes from "prop-types";
import { Button as ButtonTailWind } from "@material-tailwind/react";
const Button = ({ className = "w-[120px]", children, outline }) => {
  return (
    <ButtonTailWind variant={outline} className={className}>
      {children}
    </ButtonTailWind>
  );
};
Button.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  outline: PropTypes.string,
};
export default Button;
