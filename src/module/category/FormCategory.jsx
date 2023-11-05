import Button from "../../components/button/Button.jsx";
import Input from "../../components/input/Input.jsx";
import Label from "../../components/label/Label.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const FormCategory = ({ handleSubmitCategory, cancel }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    // resolver: yupResolver(schema),
    // mode: "onChange",
  });

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitCategory)}>
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
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </>
  );
};

FormCategory.propTypes = {
  handleSubmitCategory: PropTypes.func,
  cancel: PropTypes.func,
};

export default FormCategory;
