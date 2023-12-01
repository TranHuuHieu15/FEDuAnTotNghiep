import {
    Dialog,
    DialogHeader,
    DialogBody,
    Card,
    CardBody,
} from "@material-tailwind/react";

import img from "../../assets/images/hl1.png";
import Buttons from "../button/Button";
import PropTypes from "prop-types";

const DialogVoucher = ({ show }) => {
    return (
        <>
            <Dialog open={show}>
                <DialogHeader color="">Vouchers</DialogHeader>
                <DialogBody className="overflow-x-auto max-h-96 flex flex-col-reverse scrollbar-thumb-blue-500 scrollbar-track-gray-300">
                    <Card className="w-full border mb-3 hover:duration-500">
                        <CardBody className="grid grid-cols-5 items-center gap-3 p-2">
                            <div className="col-span-1">
                                <img src={img} alt="anh" className="w-full max-w-[100px] max-h-[120px] object-cover" />
                            </div>
                            <div className="col-span-3">
                                <div className="text-2xl">Max giảm giá 30%</div>
                                <div>Giảm giá toàn bộ sản phẩm áo sơ mi</div>
                                <div className="text-red-900 text-xs">Hạn sử dụng: 70h</div>
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                                <Buttons className="text-center bg-black">Use</Buttons>
                            </div>
                        </CardBody>
                    </Card>
                </DialogBody>
            </Dialog>
        </>
    );
}
DialogVoucher.propTypes = {
    show: PropTypes.bool,
};

export default DialogVoucher;