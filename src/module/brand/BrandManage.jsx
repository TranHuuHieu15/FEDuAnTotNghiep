import { useEffect, useRef, useState } from "react";
import axios from "../../config/axios.js";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { toast } from "react-toastify";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import DialogCEBrand from "./DialogCEBrand.jsx";
import Button from "../../components/button/Button.jsx";

const BrandManage = () => {
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    brandDataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const [brandData, setBrandData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/brand");
      setBrandData(response.data);
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
      brandDataToEdit: {},
    });
  };
  const handleCreate = async (data) => {
    if (!showDialogCERef.current.show) return;
    const formData = new FormData();
    formData.append("imageFile", data.image);
    const brand = {
      name: data.name,
      description: data.description,
    };
    formData.append("brandDto", JSON.stringify(brand));
    console.log(formData);
    try {
      const response = await axios.post("/brand/create", formData);
      console.log(response);
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Add new brand successfully", {
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
    console.log("ID for update:", id); // In ra ID trước khi cập nhật showDialogCE
    const dataEdit = brandData.find((item) => item.id === id);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      brandDataToEdit: dataEdit,
    });
  };
  const handleUpdate = async (data) => {
    if (!showDialogCERef.current.show && !showDialogCERef.current.id) return;
    const formData = new FormData();
    typeof data.image === "string"
      ? formData.append("image", data.image)
      : formData.append("imageFile", data.image);
    const brand = {
      id: showDialogCERef.current.id,
      name: data.name,
      description: data.description,
    };
    formData.append("brandDto", JSON.stringify(brand));
    try {
      const response = await axios.put(
        `/brand/update/${showDialogCERef.current.id}`,
        formData
      );
      console.log(response.data);
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Edit brand successfully", {
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
        await axios.delete(`/brand/delete/${showDialog.id}`);
        setBrandData(brandData.filter((item) => item.id !== showDialog.id));
        fetchData();
        handleCloseDialog();
        toast.success("🦄 Delete brand successfully!", {
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
      brandDataToEdit: {},
    });
  };

  const handleCloseDialog = () => {
    setShowDialog({
      show: false,
      id: null,
    });
  };
  return (
    <div className="">
      <Button className="cursor-pointer float-right mr-2 mb-2 bg-light-green-500" onClick={handleCreateTrue}>Add</Button>
      <table className="w-full text-center table-auto">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {brandData.map((item) => (
            <tr key={item.id} className="">
              <td className="p-2 font-medium text-gray-800">{item.name}</td>
              <td className="flex items-center justify-center p-2">
                <div></div>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">
                <span className="flex items-center justify-center gap-3">
                  <a
                    className="p-3 text-2xl cursor-pointer hover:text-blue-500"
                    // outline="text"
                    onClick={() => handleUpdateTrue(item.id)}
                  >
                    <CiEdit></CiEdit>
                    {/* Edit */}
                  </a>
                  <a
                    className="p-2 ml-2 text-2xl cursor-pointer hover:text-blue-500"
                    // outline="text"
                    onClick={() => handleDeleteTrue(item.id)}
                  >
                    <BsTrash3 />
                    {/* Delete */}
                  </a>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DialogDelete
        show={showDialog.show}
        title="brand"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEBrand
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitBrand={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Category"
        brandDataToEdit={showDialogCE.brandDataToEdit}
      />
    </div>
  );
};

export default BrandManage;
