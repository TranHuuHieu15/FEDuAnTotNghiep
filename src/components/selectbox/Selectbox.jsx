import { Option, Select } from '@material-tailwind/react';
import propTypes from "prop-types";

const Selectbox = ({ nameSelect, option, className, color }) => {
    return (
        <div className={className}>
            <Select color={color} label={nameSelect}>
                <Option>{option}</Option>
            </Select>
        </div>
    );
};

Selectbox.propTypes = {
    nameSelect: propTypes.string,
    option: propTypes.string,
    className: propTypes.string,
    color: propTypes.string,
};
export default Selectbox;