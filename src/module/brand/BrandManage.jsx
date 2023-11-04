import { useEffect, useState } from "react";
import axios from "../../config/axios.js";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { toast } from "react-toastify";

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
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {brandData.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.name}</td>
              <td>
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{brand.description}</td>
              <td>
                <Button
                  onClick={() => navigate(`/admin/updateBrand?id=${brand.id}`)}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDeleteBrand(brand.id)}>
                  Delete
                </Button>
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
