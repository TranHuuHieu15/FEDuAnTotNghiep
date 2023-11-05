import { Dialog } from "@material-tailwind/react";
import Heading from "../heading/Heading";
import PropTypes from "prop-types";
import FormCategory from "../../module/category/FormCategory";

const DialogCE = ({ show, isUpdate, handleSubmitCategory, cancel }) => {
  return (
    <>
      <Dialog open={show}>
        {isUpdate ? (
          <Heading className="my-10 text-lg text-center">Edit Category</Heading>
        ) : (
          <Heading className="my-10 text-lg text-center">
            Add New Category
          </Heading>
        )}
        <FormCategory
          handleSubmitCategory={handleSubmitCategory}
          cancel={cancel}
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
};

export default DialogCE;
