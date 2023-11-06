import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import axios from "../../config/axios.js";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { toast } from "react-toastify";
import DialogCE from "../../components/dialog/DialogCE";

const CategoryManage = () => {
  console.log("re-render");
  const [categoryData, setCategoryData] = useState([]);
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get("/category");
      setCategoryData(response.data);
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
    });
  };

  const handleCreate = async (categoryDto) => {
    try {
      if (showDialogCERef.current.show) {
        const response = await axios.post("/category/create", categoryDto);
        console.log(response);
        handleCloseDialogCE();
        fetchData();
        toast.success("Create category successfully!", {
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
  const handleUpdateTrue = (id) => {
    console.log("ID for update:", id); // In ra ID trước khi cập nhật showDialogCE
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
    });
  };
  const handleUpdate = async (categoryDto) => {
    console.log("In ra id in handleUpdate:", showDialogCERef.current.id);
    try {
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const response = await axios.put(
          `/category/update/${showDialogCERef.current.id}`,
          categoryDto
        );
        console.log(response);
        handleCloseDialogCE();
        fetchData();
        toast.success("Update category successfully!", {
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

  const handleDeleteTrue = (id) => {
    setShowDialog({
      show: true,
      id: id,
    });
  };
  const handleDelete = async () => {
    try {
      if (showDialog.show && showDialog.id) {
        await axios.delete(`/category/delete/${showDialog.id}`);
        setCategoryData(
          categoryData.filter((item) => item.id !== showDialog.id)
        );
        handleCloseDialog();
        toast.success("Delete category successfully!", {
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
      <Button onClick={() => handleCreateTrue()}>Add new Category</Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.length > 0 &&
            categoryData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Button onClick={() => handleUpdateTrue(item.id)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteTrue(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DialogDelete
        show={showDialog.show}
        title="category"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCE
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitCategory={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Category"
      />
    </>
  );
};

export default CategoryManage;
