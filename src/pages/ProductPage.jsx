import ProductCard from "../components/card/ProductCard";
// import Pagination from "../components/pagination/Pagination";
import SiteLayout from "../layout/SiteLayout";
// import { Checkbox } from "@material-tailwind/react";
import InputSearch from "../components/input/InputSearch";
import RadioButton from "../components/radioButton/RadioButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/axios";
import Pagination from "../components/pagination/Pagination";


const ProductPage = () => {
  const [productData, setProductData] = useState([]);

  const [currentPage, setCurrentPage] = useState([]); // Thêm state trang hiện tại

  const [totalPages, setTotalPages] = useState(0); // Thêm state tổng số trang
  useEffect(() => {
    const fetchData = async () => {
      const page = currentPage === 0
      const response = await axios.get(`/product?page=${currentPage}`);
      console.log(currentPage);
      setProductData(response.data);

      const totalPages = Math.ceil(response['all-item'] / response.size);

      setTotalPages(totalPages); // Cập nhật tổng số trang
    };
    fetchData();
  }, [currentPage]);

  // Hàm để thay đổi trang

  const handleChangePage = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  return (
    <>
      <SiteLayout>
        <div className="flex p-5 mx-20 my-10">
          <div className="mx-6 w-96">
            {/* <div className="flex flex-col h-full w-72">
              <InputSearch maxWidth="max-w-[300px]" />
              <div className="flex flex-col my-5">
                <h3 className="font-normal">FILTERs</h3>
                <RadioButton label="Woman" name="filter" />
                <RadioButton label="Man" name="filter" />
                <RadioButton label="Girls" name="filter" />
                <RadioButton label="Babies" name="filter" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">BRANDS</h3>
                <RadioButton label="Chanel" name="brand" />
                <RadioButton label="Gucci" name="brand" />
                <RadioButton label="D&G" name="brand" />
                <RadioButton label="Zara" name="brand" />
                <RadioButton label="Dior" name="brand" />
                <RadioButton label="Versace" name="brand" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">CATEGORIES</h3>
                <RadioButton label="Dresses" name="category" />
                <RadioButton label="Jacket" name="category" />
                <RadioButton label="Tops" name="category" />
                <RadioButton label="Vintages" name="category" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">SIZES</h3>
                <RadioButton label="Sexy Plus Size" name="size" />
                <RadioButton label="Plus Size" name="size" />
                <RadioButton label="Large" name="size" />
                <RadioButton label="Medium" name="size" />
              </div>
            </div> */}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-end w-full pr-[58px] font-eculid">
              {/* <Select
                title="Sort by price:"
                className="px-1 py-1"
                className2="p-2"
                control={control}
                options={options}
                errors={errors}
              >
               <option value="">price</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="hight">high</option>
              </Select> 
              */}
            </div>
            <div className="flex flex-wrap gap-3">
              {productData.length > 0 &&
                productData.map((item) => (
                  <ProductCard
                    className="mx-2 my-2 cursor-pointer w-72 hover:scale-105 focus:scale-105 active:scale-100"
                    key={item.id}
                    item={item}
                  ></ProductCard>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center  gap-3">
          <Pagination

            currentPage={currentPage}

            totalPages={totalPages}

            onChange={handleChangePage}

          ></Pagination>
        </div>

      </SiteLayout>
    </>
  );
};

export default ProductPage;
