import propTypes from "prop-types";
import { Input as InputTailWind} from "@material-tailwind/react";

const Input = ({ className, name = "input",icon,color,variant }) =>{
    return (
        <InputTailWind className={className} name={name} variant={variant} color={color} icon={icon}>
        </InputTailWind>
      );
};
Input.prototype ={
    className:propTypes.string,
    name:propTypes.string,
    variant:propTypes.string,
    color:propTypes.string,
    icon:propTypes.node
}
export default Input;