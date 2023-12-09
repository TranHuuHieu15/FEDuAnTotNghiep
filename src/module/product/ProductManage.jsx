import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";

import axios from "../../config/axios.js";
// import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductManage = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  //Call api
  const fetchData = async () => {
    try {
      const response = await axios.get("/product");
      setProductData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button
        className="cursor-pointer float-right mr-2 mb-2 bg-light-green-500"
      // onClick={handleCreateTrue}
      >
        Add new product
      </Button>
      <table className="w-full table-auto text-center">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Min Price</th>
            <th className="px-6 py-4 font-medium text-gray-900">Max Price</th>
            <th className="px-6 py-4 font-medium text-gray-900">Quantity</th>
            <th className="px-6 py-4 font-medium text-gray-900">Discount</th>
            <th className="px-6 py-4 font-medium text-gray-900">Order Count</th>
            <th className="px-6 py-4 font-medium text-gray-900">Rate</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {productData.length > 0 &&
            productData.map((item) => (
              <tr key={item.id}>
                <td className="w-9">
                  <img src={item.main_image} alt="" />
                </td>
                <td className="p-2 font-medium text-gray-800">{item.name}</td>
                <td className="">{item.min_price}</td>
                <td className="">{item.max_price}</td>
                <td className="">{item.quantity}</td>
                <td className="">{item.discount}</td>
                <td className="">{item.order_count}</td>
                <td className="">{item.rate}</td>
                <td className="p-2">
                  <span className="flex items-center justify-center gap-3">
                    <a
                      className="p-3 text-2xl hover:text-blue-500 cursor-pointer"
                      onClick={() => navigate(`/admin/product/edit/${item.id}`)}
                    >
                      <CiEdit />
                    </a>
                    <a
                      className="ml-2 p-2 text-2xl  hover:text-blue-500 cursor-pointer"
                    // onClick={() => handleDeleteTrue(item.id)}
                    >
                      <BsTrash3 />
                    </a>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductManage;
