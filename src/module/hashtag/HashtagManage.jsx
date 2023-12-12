import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button.jsx";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import DialogCEHashtag from "./DialogCEHashtag.jsx";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";

const HashtagManage = () => {
  const user = useSelector(selectCurrentUser);
  const [hashtagData, setHashtagData] = useState([]);
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    hashtagDataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get("/hashtag");
      setHashtagData(response.data);
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
      hashtagDataToEdit: {},
    });
  };

  const handleCreate = async (hashtagDto) => {
    try {
      if (showDialogCERef.current.show) {
        const response = await axios.post("/hashtag/create", hashtagDto, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Create hashtag successfully!", {
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
    const dataEdit = hashtagData.find((item) => item.id === id);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      hashtagDataToEdit: dataEdit,
    });
  };
  const handleUpdate = async (hashtagDto) => {
    console.log("In ra id in handleUpdate:", showDialogCERef.current.id);
    try {
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const response = await axios.put(
          `/hashtag/update/${showDialogCERef.current.id}`,
          hashtagDto,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Update hashtag successfully!", {
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
        await axios.delete(`/hashtag/delete/${showDialog.id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setHashtagData(hashtagData.filter((item) => item.id !== showDialog.id));
        handleCloseDialog();
        toast.success("Delete hashtag successfully!", {
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
      hashtagDataToEdit: {},
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
      <Button
        className="cursor-pointer float-right mr-2 mb-2 bg-light-green-500"
        onClick={handleCreateTrue}
      >
        Add new Hashtag
      </Button>
      <table className="w-full table-auto text-center">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {hashtagData.length > 0 &&
            hashtagData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">{item.name}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">
                  <span className="flex items-center justify-center gap-3">
                    <a
                      className="p-3 text-2xl hover:text-blue-500 cursor-pointer"
                      onClick={() => handleUpdateTrue(item.id)}
                    >
                      <CiEdit />
                    </a>
                    <a
                      className="ml-2 p-2 text-2xl  hover:text-blue-500 cursor-pointer"
                      onClick={() => handleDeleteTrue(item.id)}
                    >
                      <BsTrash3 />
                    </a>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DialogDelete
        show={showDialog.show}
        title="hashtag"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEHashtag
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitHashtag={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Hashtag"
        hashtagDataToEdit={showDialogCE.hashtagDataToEdit}
      />
    </>
  );
};

export default HashtagManage;
