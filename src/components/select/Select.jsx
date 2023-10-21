// import { Select as Selectbox } from "@material-tailwind/react";
// import propTypes from "prop-types";

import PropTypes from 'prop-types';

const Select = ({ className, title, children, className2 }) => {
  const selectClasses = `border rounded-md ${className}`;

  return (
    <>
      {title && <label className={className2}>{title}</label>}
      <select className={selectClasses}>
        {children}
      </select>
    </>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  className2: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default Select;
