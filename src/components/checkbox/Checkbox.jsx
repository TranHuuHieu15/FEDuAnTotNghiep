import PropTypes from "prop-types";
import { Checkbox as CheckButton } from "@material-tailwind/react";
const Checkbox = ({ label, ripple, className }) => {
    return (
        <>
            <CheckButton
                label={label}
                ripple={ripple}
                className={className}
            />
        </>
    );
};
Checkbox.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    ripple: PropTypes.bool,
};
export default Checkbox;