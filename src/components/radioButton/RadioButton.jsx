import PropTypes from "prop-types";
import { Radio } from "@material-tailwind/react";
const RadioButton = ({ color = "black", label, labelRadio, className, name, ripple }) => {
    return (
        <div className={className}>
            <div>{labelRadio}</div>
            <Radio color={color} label={label} name={name} ripple={ripple}></Radio>
        </div>
    );
};
RadioButton.propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    ripple: PropTypes.bool,
    label: PropTypes.string,
    labelRadio: PropTypes.string,
};

export default RadioButton;