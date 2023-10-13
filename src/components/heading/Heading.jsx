import propTypes from "prop-types";
const Heading = ({ className = "", children }) => {
  return (
    <h2
      className={`font-eculid text-[#374151] font-semibold uppercase text-[24px] mt-5 ${className}`}
    >
      {children}
    </h2>
  );
};

Heading.propTypes = {
  className: propTypes.string,
  children: propTypes.any,
};
export default Heading;
