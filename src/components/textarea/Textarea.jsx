import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Textarea = ({ className, control, name }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div>
      <textarea className={className} {...field}></textarea>
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  className: PropTypes.string,
};
export default Textarea;
