import Label from "../label/Label";
import imageAvail from "../../assets/images/imageAvail.jpg";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const ImageUpload = ({
  control,
  name,
  errors,
  isUpdate,
  size = "w-[200px] h-[150px]",
}) => {
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
    <div className="flex flex-col gap-1">
      <div className="">
        {value ? (
          <img
            src={
              isUpdate && typeof value === "string"
                ? value
                : URL.createObjectURL(value)
            }
            alt=""
            className={`object-cover rounded-md ${size}`}
          />
        ) : (
          <img
            src={imageAvail}
            alt="Image available"
            className="object-cover w-[200px] h-[150px] rounded-md"
          />
        )}
      </div>
      <Label className="text-gray-500 mt-6">Choose the photo</Label>

      <input
        type="file"
        className="max-w-[100px]"
        onChange={handleImage}
        {...fieldProps}
      />
      {errors.image && (
        <p className="text-red-500 mt-1 text-xs ml-1">{errors.image.message}</p>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object,
  isUpdate: PropTypes.bool,
  size: PropTypes.string,
};

export default ImageUpload;
