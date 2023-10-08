import propTypes from "prop-types";
import { Button as ButtonTailWind } from "@material-tailwind/react";
const Button = ({ size, color = "", className, nameButton = "Button", src, outline }) => {
    return (
        <ButtonTailWind variant={outline} className={className} size={size} color={color}>
            <img src={src} alt={nameButton} className="h-6 w-6" />
            {nameButton}
        </ButtonTailWind>
    );
};
Button.propTypes = {
    size: propTypes.string,
    color: propTypes.string,
    className: propTypes.string,
    nameButton: propTypes.string,
    src: propTypes.string,
    outline: propTypes.string
};
export default Button;