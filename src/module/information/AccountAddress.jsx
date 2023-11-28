import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import axios from "../../config/axios.js";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import DialogCEDeliveryAddress from "./DialogCEDeliveryAddress.jsx";

const AccountAddress = () => {
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    deliveryAddressDataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const [deliveryAddressData, setDeliveryAddressData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/deliveryAddress");
      setDeliveryAddressData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    showDialogCERef.current = showDialogCE;
  }, [showDialogCE]);
  const handleCreateTrue = () => {
    setShowDialogCE({
      show: true,
      id: null,
      isUpdate: false,
      action: handleCreate,
      deliveryAddressDataToEdit: {},
    });
  };
  const handleCreate = async (data) => {
    if (!showDialogCERef.current.show) return;
    const formData = new FormData();
    formData.append("imageFile", data.image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    try {
      await axios.post("/deliveryAddress/create", formData);
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Add new deliveryAddress successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleUpdateTrue = (id) => {
    const dataEdit = deliveryAddressData.find((item) => item.id === id);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      deliveryAddressDataToEdit: dataEdit,
    });
  };
  const handleUpdate = async (data) => {
    if (!showDialogCERef.current.show && !showDialogCERef.current.id) return;

    try {
      await axios.put(`/deliveryAddress/update/${showDialogCERef.current.id}`);
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Edit deliveryAddress successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleDeleteTrue = (id) => {
    setShowDialog({
      show: true,
      id: id,
    });
  };
  const handleDelete = async () => {
    try {
      if (showDialog.show && showDialog.id) {
        await axios.delete(`/deliveryAddress/delete/${showDialog.id}`);
        setDeliveryAddressData(
          deliveryAddressData.filter((item) => item.id !== showDialog.id)
        );
        fetchData();
        handleCloseDialog();
        toast.success("🦄 Delete deliveryAddress successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseDialogCE = () => {
    setShowDialogCE({
      show: false,
      id: null,
      isUpdate: false,
      action: null,
      deliveryAddressDataToEdit: {},
    });
  };

  const handleCloseDialog = () => {
    setShowDialog({
      show: false,
      id: null,
    });
  };
  return (
    <>
      <div className="flex-initial shadow-md border-2 w-full rounded-2xl">
        <div className="flex items-center justify-between mt-2 ml-3 pl-10 pt-5">
          <div>
            <p className="text-2xl text-blue-gray-600">My Addresses</p>
            <p className="text-gray-600">All previously saved addresses</p>
          </div>
          <div>
            <Button
              className="float-right mb-2 mr-2 cursor-pointer bg-light-green-500"
              onClick={handleCreateTrue}
            >
              Add New Address
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="w-full px-3 h-px bg-gray-200 mt-3"></span>
        </div>

        <div className="px-10 mt-5">
          <ul className="mt-3">
            <li className="">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <p className="text-sm">Hieu Tran Huu</p>
                  <p className="ml-2 text-gray-500 text-sm">(+84) 0768757110</p>
                </div>
                <div className="button">
                  <a href="#">Edit</a>
                  <a href="#" className="ml-2">
                    Delete
                  </a>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    K19/11 Nguyễn Lương Băng Hoà Khánh Bắc
                  </p>
                  <p className="text-gray-500 text-sm">
                    Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng
                  </p>
                </div>
                <div>
                  <Button outline="outlined" className="w-120px rounded-none">
                    Set as default
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <Button outline="outlined" className="rounded-none" size="sm">
                  Default
                </Button>
              </div>
              <div className="h-px bg-gray-200 mt-5"></div>
            </li>
            {/* <li className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <p className="text-sm">Hieu Tran Huu</p>
                  <p className="ml-2 text-gray-500 text-sm">(+84) 0768757110</p>
                </div>
                <div className="button">
                  <a href="#">Edit</a>
                  <a href="#" className="ml-2">
                    Delete
                  </a>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    K19/11 Nguyễn Lương Băng Hoà Khánh Bắc
                  </p>
                  <p className="text-gray-500 text-sm">
                    Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng
                  </p>
                </div>
                <div>
                  <Button outline="outlined" className="w-120px rounded-none">
                    Set as default
                  </Button>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-5"></div>
            </li>
            <li className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <p className="text-sm">Hieu Tran Huu</p>
                  <p className="ml-2 text-gray-500 text-sm">(+84) 0768757110</p>
                </div>
                <div className="button">
                  <a href="#">Edit</a>
                  <a href="#" className="ml-2">
                    Delete
                  </a>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    K19/11 Nguyễn Lương Băng Hoà Khánh Bắc
                  </p>
                  <p className="text-gray-500 text-sm">
                    Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng
                  </p>
                </div>
                <div>
                  <Button outline="outlined" className="w-120px rounded-none">
                    Set as default
                  </Button>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-5"></div>
            </li>
            <li className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <p className="text-sm">Hieu Tran Huu</p>
                  <p className="ml-2 text-gray-500 text-sm">(+84) 0768757110</p>
                </div>
                <div className="button">
                  <a href="#">Edit</a>
                  <a href="#" className="ml-2">
                    Delete
                  </a>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    K19/11 Nguyễn Lương Băng Hoà Khánh Bắc
                  </p>
                  <p className="text-gray-500 text-sm">
                    Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng
                  </p>
                </div>
                <div>
                  <Button outline="outlined" className="w-120px rounded-none">
                    Set as default
                  </Button>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-5"></div>
            </li> */}
          </ul>
        </div>
        <DialogDelete
          show={showDialog.show}
          title="Delivery Address"
          confirm={handleDelete}
          cancel={handleCloseDialog}
        />
        <DialogCEDeliveryAddress
          show={showDialogCE.show}
          isUpdate={showDialogCE.isUpdate}
          handleSubmitAddress={showDialogCE.action}
          cancel={handleCloseDialogCE}
          title="Delivery Address"
          deliveryAddressDataToEdit={showDialogCE.deliveryAddressDataToEdit}
        />
      </div>
    </>
  );
};

export default AccountAddress;
