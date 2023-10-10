import React from 'react';
import { Radio as RadioButton } from "@material-tailwind/react";
import propTypes from "prop-types";

const Radio = ({ className, color = 'black', label, children, name }) => {
    return (
        <RadioButton className={className} label={label} name={name} color={color}>
            {children}
        </RadioButton>
    );
};
Radio.prototype = {
    className: propTypes.string,
    color: propTypes.string,
    label: propTypes.string,
    children: propTypes.element
}
export default Radio;