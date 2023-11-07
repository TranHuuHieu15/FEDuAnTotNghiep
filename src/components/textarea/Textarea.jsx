import PropTypes from "prop-types";
// import { useController } from "react-hook-form";
import { Textarea as TestArea } from "@material-tailwind/react";

const Textarea = ({ className, label }) => {
  return (
    <div>
      <TestArea className={className} label={label}></TestArea>
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  className: PropTypes.string,
};
export default Textarea;
