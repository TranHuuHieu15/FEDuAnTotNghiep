import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";
import ProductForm from "./ProductForm";
import FormProductVariant from "./FormProductVariant";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const ProductCEPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [productVariantData, setProductVariantsData] = useState([]);
  const { reset } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`product/id/${id}`);
        setProduct(response.data.productDto);
        setCategories(response.data.categoryDto);
        setProductVariantsData(response.data.productVariantsDto);
        console.log(response.data);
        setHashtags(response.data.hashtagDtos);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);
  const handleProductFormSubmit = async (data) => {
    try {
      const response = await axios.put(`/product/${id}`, {
        updatedProductData: data,
      });

      if (response.status === 200) {
        toast.success("Product updated successfully!", {
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
      reset();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDynamicFormSubmit = async (data, index) => {
    try {
      const response = await axios.put(`/product/${id}/variant/${index}`, {
        updatedVariantData: data,
      });

      if (response.status === 200) {
        toast.success("Product variant updated successfully!", {
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
      console.error("Error updating product variant:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        <ProductForm
          hashtags={hashtags}
          category={categories}
          onSubmitCallback={handleProductFormSubmit}
          onResetForm={reset}
          initialData={product}
        />

        <div className="flex-1">
          <div className="flex flex-col gap-3  max-h-[330px] overflow-y-auto">
            {productVariantData &&
              productVariantData.map((variant, index) => (
                <div
                  className="flex flex-row border items-center p-5"
                  key={index}
                >
                  <FormProductVariant
                    index={index}
                    onSubmitCallback={(data) =>
                      handleDynamicFormSubmit(data, index)
                    }
                    initialData={variant}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCEPage;
