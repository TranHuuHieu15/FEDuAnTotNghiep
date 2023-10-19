// import { Select as Selectbox } from "@material-tailwind/react";
// import propTypes from "prop-types";

// const Select = ({ label, children, className = "w-[200px]", color }) => {
//   return (
//     <div className={className}>
//       <Selectbox color={color} label={label}>
//         {children}
//       </Selectbox>
//     </div>
//   );
// };

// Select.propTypes = {
//   label: propTypes.string,
//   children: propTypes.any,
//   className: propTypes.string,
//   color: propTypes.string,
// };
// export default Select;
import PropTypes from 'prop-types';

const Select = ({ className, title, color, children }) => {
  const selectClasses = `border rounded px-3 py-2 ${color} ${className}`;

  return (
    <div>
      {title && <label className="block text-sm font-medium text-gray-700">{title}</label>}
      <select className={selectClasses}>
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Select;
