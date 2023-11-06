import { Dialog } from "@material-tailwind/react";
import Heading from "../heading/Heading";
import PropTypes from "prop-types";
import FormCategory from "../../module/category/FormCategory";

const DialogCE = ({
  show,
  isUpdate,
  handleSubmitCategory,
  cancel,
  title,
  categoryDataToEdit,
}) => {
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
        <FormCategory
          handleSubmitCategory={handleSubmitCategory}
          cancel={cancel}
          categoryDataToEdit={categoryDataToEdit}
        />
      </Dialog>
    </>
  );
};

DialogCE.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitCategory: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  categoryDataToEdit: PropTypes.object,
};

export default DialogCE;
