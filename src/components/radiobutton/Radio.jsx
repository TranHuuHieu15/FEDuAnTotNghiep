import React from 'react';
import { Radio as RadioButton } from "@material-tailwind/react";
import propTypes from "prop-types";

const Radio = ({ className, name, color, label, children }) => {
    return (
        <RadioButton className={className} name={name} label={label} color={color}>
            {children}
        </RadioButton>
    );
};
Radio.prototype = {
    className: propTypes.string,
    name: propTypes.string,
    color: propTypes.string,
    label: propTypes.string,
    children: propTypes.element
}
export default Radio;