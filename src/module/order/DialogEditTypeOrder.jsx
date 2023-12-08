import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import SelectDefault from "../../components/select/SelectDefault";
import { useEffect } from "react";

const typeOrder = [
  {
    id: 1,
    value: "PENDING",
    name: "PENDING",
  },
  {
    id: 2,
    value: "PAID",
    name: "PAID",
  },
  {
    id: 3,
    value: "DELIVERING",
    name: "DELIVERING",
  },
  {
    id: 4,
    value: "SUCCESSFUL",
    name: "SUCCESSFUL",
  },
  {
    id: 5,
    value: "CANCELLED",
    name: "CANCELLED",
  },
  {
    id: 6,
    value: "RETURNED",
    name: "RETURNED",
  },
];
const DialogEditTypeOrder = ({
  show,
  handleCancelClick,
  dataToEdit,
  handleChangeTypeOrder,
}) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm();
  useEffect(() => {
    if (!show && dataToEdit) {
      reset({
        id: null,
        typeOrder: "",
      });
    } else {
      reset({
        id: dataToEdit?.orderDto?.id,
        typeOrder: dataToEdit?.orderDto?.typeOrder,
      });
    }
  }, [show, dataToEdit, reset]);
  const onSubmitHandler = (data) => {
    handleChangeTypeOrder(data);
    reset({
      id: null,
      typeOrder: "",
    });
    handleCancelClick();
  };
  return (
    <>
      <Dialog open={show} size="xs">
        <DialogHeader>{`Select the appropriate order type.`}</DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogBody>
            <div className="flex flex-col items-center justify-center gap-2">
              <Input
                type="number"
                name="id"
                label="Id"
                className="hidden w-full"
                control={control}
                errors={errors}
              />
              <SelectDefault
                className2="text-sm ml-1 font-normal"
                className="p-[10px] rounded-lg border-blue-gray-300 w-[150px]"
                title="Type Order"
                name="typeOrder"
                control={control}
                errors={errors}
                options={typeOrder}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button className="mr-1 bg-red-500" onClick={handleCancelClick}>
              <span>Cancel</span>
            </Button>
            <Button
              className="bg-green-500"
              type="submit"
              disabled={isSubmitting}
            >
              <span>Change</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

DialogEditTypeOrder.propTypes = {
  show: PropTypes.bool,
  handleCancelClick: PropTypes.func,
  handleChangeTypeOrder: PropTypes.func,
  dataToEdit: PropTypes.object.isRequired,
};

export default DialogEditTypeOrder;
