import { useEffect, useState } from "react";
import axios from "../../config/axios.js";
// import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { toast } from "react-toastify";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

const BrandManage = () => {
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/brand");
        setBrandData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleDeleteBrand = (id) => {
    setShowDialog({
      show: true,
      id: id,
    });
  };
  const handleDeleteTrue = async () => {
    try {
      if (showDialog.show && showDialog.id) {
        await axios.delete(`/brand/delete/${showDialog.id}`);
        setBrandData(brandData.filter((brand) => brand.id !== showDialog.id));
        handleDeleteFalse();
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
  const handleDeleteFalse = () => {
    setShowDialog({
      show: false,
      id: null,
    });
  };
  return (
    <div className="">
      <table className="w-full table-auto text-center">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {brandData.map((brand) => (
            <tr key={brand.id} className="">
              <td className="p-2 font-medium text-gray-800">{brand.name}</td>
              <td className="p-2 flex items-center justify-center">
                <div></div>
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td className="p-2">{brand.description}</td>
              <td className="p-2">
                <span className="flex items-center justify-center gap-3">
                  <a
                    className="p-3 text-2xl hover:text-blue-500 cursor-pointer"
                    // outline="text"
                    onClick={() => navigate(`/admin/updateBrand?id=${brand.id}`)}
                  >
                    <CiEdit></CiEdit>
                    {/* Edit */}
                  </a>
                  <a
                    className="ml-2 p-2 text-2xl  hover:text-blue-500 cursor-pointer"
                    // outline="text"
                    onClick={() => handleDeleteBrand(brand.id)}
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
        confirm={handleDeleteTrue}
        cancel={handleDeleteFalse}
      />
    </div>
  );
};

export default BrandManage;
