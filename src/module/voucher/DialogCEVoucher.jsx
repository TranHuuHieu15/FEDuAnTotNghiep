import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Textarea from "../../components/textarea/Textarea";
import Input from "../../components/input/Input";
import { useEffect } from "react";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Select from "../../components/select/Select";

const DialogCEVoucher = ({
  show,
  isUpdate,
  handleSubmitVoucher,
  cancel,
  title,
  dataToEdit,
}) => {
  const typeDiscount = [
    {
      id: 1,
      name: "PERCENT",
    },
    {
      id: 2,
      name: "FIXED",
    },
  ];
  const schema = yup
    .object({
      name: yup.string().required("Please enter voucher name"),
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
      reset(dataToEdit);
    }
  }, [dataToEdit, show, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitVoucher(data);
    console.log(data);
    reset({
      name: "",
      description: "",
    });
  };
  return (
    <>
      <Dialog open={show}>
        {isUpdate ? (
          <DialogHeader className="text-lg text-center">
            Edit {title}
          </DialogHeader>
        ) : (
          <DialogHeader className="text-lg text-center">
            Add New {title}
          </DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col items-center justify-center">
              <ImageUpload
                name="image"
                control={control}
                isUpdate={isUpdate}
                errors={errors}
              ></ImageUpload>
              <Input
                name="name"
                label="Name"
                placeholder="Enter name voucher"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Input
                name="discount"
                label="Discount"
                placeholder="Enter discount"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Input
                name="quantity"
                label="Quantity"
                placeholder="Enter quantity"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Textarea
                name="description"
                label="Description"
                placeholder="Enter description"
                control={control}
              />
              <Input
                type="date"
                name="registerDate"
                label="Register Date"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Input
                type="date"
                name="expirationDate"
                label="Expiration Date"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Input
                name="minTotal"
                label="Min Total"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Input
                name="maxDiscount"
                label="Max Discount"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Select
                title="Type Voucher"
                name="typeVoucher"
                options={typeDiscount}
                control={control}
              />
            </div>
            <DialogFooter className="float-right">
              <div className="flex items-center justify-center gap-2">
                <Button className="bg-red-500" onClick={cancel}>
                  Cancle
                </Button>
                <Button
                  className="bg-green-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

DialogCEVoucher.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitVoucher: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  dataToEdit: PropTypes.object,
};

export default DialogCEVoucher;
