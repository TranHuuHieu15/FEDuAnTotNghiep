import PropTypes from "prop-types";

const Label = ({ children }) => {
  return (
    <label htmlFor="htmlFor" className="text-base font-medium">
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.any,
};

export default Label;
