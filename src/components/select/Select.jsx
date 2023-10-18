import { Select as Selectbox } from "@material-tailwind/react";
import propTypes from "prop-types";

const Select = ({ label, children, className = "w-[200px]", color }) => {
  return (
    <div className={className}>
      <Selectbox size="md" color={color} label={label}>
        {children}
      </Selectbox>
    </div>
  );
};

Select.propTypes = {
  label: propTypes.string,
  children: propTypes.any,
  className: propTypes.string,
  color: propTypes.string,
};
export default Select;
