import React from 'react';
import { Radio as RadioButton } from "@material-tailwind/react";
import propTypes from "prop-types";

const Radio = ({ className, name = "type", icon, color, variant, label }) => {
    return (
        <RadioButton className={className} name={name} label={label} variant={variant} color={color} icon={icon}>
        </RadioButton>
    );
};
Radio.prototype = {
    className: propTypes.string,
    name: propTypes.string,
    variant: propTypes.string,
    color: propTypes.string,
    icon: propTypes.string,
    label: propTypes.string
}
export default Radio;