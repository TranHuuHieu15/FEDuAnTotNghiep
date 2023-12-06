import {
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  CardBody,
} from "@material-tailwind/react";
import Buttons from "../button/Button";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import axios from "../../config/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";

const DialogVoucher = ({ show, handleCloseVoucher, onUseVoucher }) => {
  const user = useSelector(selectCurrentUser);
  const [voucherData, setVoucherData] = useState([]);
  const [isVoucher, setIsVoucher] = useState(false);
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get("/voucher/account", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setVoucherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVoucher();
  }, [user.accessToken]);

  const calculateRemainingTime = (expirationDate) => {
    const now = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };
  const handleUseVoucher = (usedVoucher) => {
    onUseVoucher(usedVoucher);
    setIsVoucher(!isVoucher);
    handleCloseVoucher();
  };
  return (
    <>
      <Dialog open={show}>
        <DialogHeader className="flex justify-between">
          <span>Choose voucher</span>
          <span className="cursor-pointer" onClick={handleCloseVoucher}>
            <IoMdClose />
          </span>
        </DialogHeader>
        <DialogBody className="flex flex-col-reverse overflow-x-auto max-h-96 scrollbar-thumb-blue-500 scrollbar-track-gray-300">
          <Card className="w-full mb-3 border hover:duration-500">
            {voucherData?.length > 0 &&
              voucherData.map((item) => (
                <CardBody
                  className="grid items-center grid-cols-5 gap-3 p-2"
                  key={item.id}
                >
                  <div className="col-span-1">
                    <img
                      src={item.image}
                      alt="anh"
                      className="w-full max-w-[100px] max-h-[120px] object-cover"
                    />
                  </div>
                  <div className="col-span-3">
                    <div className="text-2xl">
                      Max giảm giá {item.maxDiscount}%
                    </div>
                    <div>{item.description}</div>
                    <div className="text-xs text-red-900">
                      Hạn sử dụng: {calculateRemainingTime(item.expirationDate)}
                    </div>
                  </div>
                  <div className="flex items-center justify-end col-span-1">
                    {isVoucher ? (
                      <Buttons
                        className="text-center bg-black"
                        onClick={() => handleUseVoucher(null)}
                      >
                        Cancel
                      </Buttons>
                    ) : (
                      <Buttons
                        className="text-center bg-black"
                        onClick={() => handleUseVoucher(item)}
                      >
                        Use
                      </Buttons>
                    )}
                  </div>
                </CardBody>
              ))}
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
};
DialogVoucher.propTypes = {
  show: PropTypes.bool,
  handleCloseVoucher: PropTypes.func,
  onUseVoucher: PropTypes.func,
};

export default DialogVoucher;
