import Label from "../label/Label";
import imageAvail from "../../assets/images/imageAvail.jpg";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const ImageUpload = ({ control, name, errors, isUpdate }) => {
  const {
    field: { onChange, value, ...fieldProps },
  } = useController({
    control,
    name,
    defaultValue: "",
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      onChange(file);
    }
  };

  return (
    <>
      <div className="mx-auto w-[150px] h-[150px]">
        {value ? (
          <img
            src={
              isUpdate && typeof value === "string"
                ? value
                : URL.createObjectURL(value)
            }
            alt=""
            className="object-cover w-full h-full"
          />
        ) : (
          <img src={imageAvail} alt="Image available" />
        )}
      </div>
      <Label>Choose the photo</Label>
      <input
        type="file"
        className="max-w-[100px]"
        onChange={handleImage}
        {...fieldProps}
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}
    </>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object,
  isUpdate: PropTypes.bool,
};

export default ImageUpload;
