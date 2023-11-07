import { Dialog } from "@material-tailwind/react";
import Heading from "../../components/heading/Heading";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Label from "../../components/label/Label";
import Button from "../../components/button/Button";
import Textarea from "../../components/textarea/Textarea";
import Input from "../../components/input/Input";
import { useEffect } from "react";

const DialogCECategory = ({
  show,
  isUpdate,
  handleSubmitCategory,
  cancel,
  title,
  categoryDataToEdit,
}) => {
  const schema = yup
    .object({
      name: yup.string().required("Please enter category name"),
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
    reset(categoryDataToEdit);
  }, [categoryDataToEdit, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitCategory(data);
    reset({
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
            <div className="flex flex-col items-center justify-center">
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter name category"
                className="w-[300px]"
                control={control}
                errors={errors}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
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

DialogCECategory.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitCategory: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  categoryDataToEdit: PropTypes.object,
};

export default DialogCECategory;
