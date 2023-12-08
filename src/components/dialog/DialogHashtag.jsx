import {
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../redux/features/authSlice";
// import { useEffect, useState } from "react";
// import axios from "../../config/axios";
import PropTypes from "prop-types";
import Button from "../button/Button";
import { useEffect, useState } from "react";

const DialogHashtag = ({
  show,
  onUseDialogHashtag,
  handleCloseDialogHashtag,
  onSelectHashtag,
  selectedHashtag,
}) => {

  // const [disabledHashtags, setDisabledHashtags] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState(selectedHashtag);
  console.log("Dữ liệu còn lại : ", selectedHashtag);
  // console.log("tryền", selectedHashtag);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/hashtag");
  //       console.log(response.data);
  //       setHashtagData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [user.accessToken]);
  const handleUseDialogHashtag = (useHashtag) => {
    onUseDialogHashtag(useHashtag);
    handleCloseDialogHashtag();
  };
  const handleHashtagClick = (hashtag) => {
    onSelectHashtag(hashtag);

    // Filter out the clicked hashtag from the array
    const updatedHashtags = selectedHashtag.filter((item) => item.id !== hashtag.id);

    // Update the state with the filtered array
    setSelectedHashtags(updatedHashtags);
  };

  useEffect(() => {
    // console.log("Select Hashtags:", selectHashtag);
  }, [selectedHashtags]);
  return (
    <>
      <Dialog open={show}>
        <DialogHeader className="flex justify-between">
          <span>Choose your hashtag</span>
          <span className="cursor-pointer" onClick={handleCloseDialogHashtag}>
            <IoMdClose />
          </span>
        </DialogHeader>
        <DialogBody className="mb-5">
          <div>
            {selectedHashtag.map((item) => (
              <Button
                className="w-auto rounded-full"
                onClick={() => handleHashtagClick(item)}
                outline="outlined"
                key={item.id}
              >
                {item.name}
              </Button>
            ))}
            {/* {selectedHashtag.map((item) => (
              <Button className="w-auto rounded-full" onClick={() => handleHashtagClick(item)} outline="outlined" key={item.id}>{item.name}</Button>
            ))} */}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

DialogHashtag.propTypes = {
  show: PropTypes.bool,
  handleCloseDialogHashtag: PropTypes.func,
  onUseDialogHashtag: PropTypes.func,
  onSelectHashtag: PropTypes.func,
  selectedHashtag: PropTypes.array,
};

export default DialogHashtag;
