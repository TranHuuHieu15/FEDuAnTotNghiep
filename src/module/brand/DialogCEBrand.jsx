import { Dialog } from "@material-tailwind/react";
import Heading from "../../components/heading/Heading";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Label from "../../components/label/Label";
import Button from "../../components/button/Button";
import Textarea from "../../components/textarea/Textarea";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const DialogCEBrand = ({
  show,
  isUpdate,
  handleSubmitBrand,
  cancel,
  title,
  brandDataToEdit,
}) => {
  const schema = yup
    .object({
      image: yup
        .mixed()
        .test(
          "file",
          "Please choose a valid image file (jpg, jpeg, or png)",
          (value) => {
            if (value instanceof File) {
              const acceptedExtensions = [".jpg", ".jpeg", ".png"];
              const fileExtension = value.name.split(".").pop().toLowerCase();
              return acceptedExtensions.includes(`.${fileExtension}`);
            } else if (typeof value === "string") {
              const imageExtensions = [".jpg", ".jpeg", ".png"];
              return imageExtensions.some((extension) =>
                value.toLowerCase().endsWith(extension)
              );
            }
            return false; // Trường hợp khác không hợp lệ
          }
        ),
      name: yup.string().required("Please enter brand name"),
    })
    .required();
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset(brandDataToEdit);
  }, [brandDataToEdit, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitBrand(data);
    reset({
      image: "",
      name: "",
      description: "",
    });
  };
  return (
    <>
      <Dialog open={show}>
        {isUpdate ? (
          <Heading className="my-10 text-lg text-center">Edit {title}</Heading>
        ) : (
          <Heading className="my-10 text-lg text-center">
            Add New {title}
          </Heading>
        )}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col mb-5 w-[300px]">
              <ImageUpload
                name="image"
                control={control}
                isUpdate={isUpdate}
                errors={errors}
              ></ImageUpload>
            </div>
            <div className="mb-5">
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter name category"
                className="w-[300px]"
                control={control}
                errors={errors}
              />
            </div>
            <div className="flex flex-col mb-5">
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Enter description"
                className="w-[300px] px-2 py-2 text-start my-2 border rounded-md"
                control={control}
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button onClick={cancel}>Cancle</Button>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

DialogCEBrand.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitBrand: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  brandDataToEdit: PropTypes.object,
};

export default DialogCEBrand;
