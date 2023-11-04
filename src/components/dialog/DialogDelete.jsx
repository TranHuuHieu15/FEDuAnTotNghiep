import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

const DialogDelete = ({ title, show, confirm, cancel }) => {
  return (
    <>
      <Dialog open={show}>
        <DialogHeader>{`Delete this ${title}`}</DialogHeader>
        <DialogBody>{`Do you want to delete this ${title}`}</DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={cancel} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={confirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

DialogDelete.propTypes = {
  title: PropTypes.string,
  confirm: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
};

export default DialogDelete;
