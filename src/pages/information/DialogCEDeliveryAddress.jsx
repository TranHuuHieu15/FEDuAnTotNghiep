import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "../../components/textarea/Textarea";

const DialogCEDeliveryAddress = ({
  show,
  isUpdate,
  handleSubmitAddress,
  cancel,
  title,
  addressDataToEdit,
}) => {
  const schema = yup
    .object({
      image: yup.mixed().test("file", "Please choose a image file", (value) => {
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
      }),
      name: yup.string().required("Please enter address"),
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
    if (!show) {
      reset({
        name: "",
        description: "",
      });
    } else {
      reset(addressDataToEdit);
    }
  }, [addressDataToEdit, reset, show]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitAddress(data);
    reset({
      image: "",
      name: "",
      description: "",
    });
  };
  return (
    <>
      <Dialog open={show} size="sm">
        {isUpdate ? (
          <DialogHeader className="text-lg">Edit {title}</DialogHeader>
        ) : (
          <DialogHeader className="text-lg">Add New {title}</DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="grid items-center justify-center grid-cols-2 gap-4">
              <div className="grid gap-1"></div>
              <div className="grid gap-2">
                <Input
                  label="Name"
                  name="name"
                  placeholder="Enter name address"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <div className="w-full mt-2">
                  <Textarea 
                    label="Description"
                    name="description"
                    control={control}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-red-500" onClick={cancel}>
                Cancle
              </Button>
              <Button
                className="ml-2 bg-green-500"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default DialogCEDeliveryAddress;
