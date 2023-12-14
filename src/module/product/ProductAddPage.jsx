import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import axios from "../../config/axios.js";
// import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import FormProductVariant from "./FormProductVariant.jsx";
import Button from "../../components/button/Button.jsx";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";
import { useSelector } from "react-redux";

// import { useSelector } from "react-redux";

// ProductAddPage.jsx
const ProductAddPage = () => {
    const [fields, setFields] = useState([{ id: 1 }]);
    const { reset: resetProductForm } = useForm();
    const [categories, setCategories] = useState([]);
    const [fileDatas, setFileDatas] = useState([]);
    const user = useSelector(selectCurrentUser);

    // const user = useSelector(selectCurrentUser);
    const [productDtoRequest, setProductDtoRequest] = useState({
        productDto: {}, // Assuming fixed form data structure
        hashtagOfProductsDto: [],
        createProductVariant: [],
        deleteProductVariant: [null],
        updateProductVariant: [null],
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/category");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    console.log("tổng form: ", fields);

    // 
    const handleProductFormSubmit = async (data) => {
        try {
            // Thực hiện các bước xử lý dữ liệu ở đây
            // console.log("Handling product form data:", data);

            setFileDatas((prevFileDatas) => {
                const newFileDatas = [...prevFileDatas];
                const imageFile = data.image;

                // Đặt ảnh mới với ID là 0
                imageFile.id = 0;

                newFileDatas.unshift(imageFile);
                return newFileDatas;
            });
            // console.log("đấy file", fileDatas);
            // Lưu trữ phần còn lại của dữ liệu vào productDto trong productDtoRequest
            setProductDtoRequest((prevData) => ({
                ...prevData,
                productDto: {
                    name: data.name,
                    season: data.season,
                    gender: data.gender,
                    categoryId: data.categoryId,
                    brandId: data.brandId,
                    description: data.description,
                    // Thêm các trường khác nếu cần
                },
                hashtagOfProductsDto: data.hashtags,
            }));
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error("Error handling product form:", error);
        }
    };

    const handleDynamicFormSubmit = async (data, index) => {
        // console.log("Data Product Variant:", data);
        // Thêm file vào mảng fileDatas
        setFileDatas((prevFileDatas) => {
            const newFileDatas = [...prevFileDatas];
            const imageFile = data['image-' + [index]];

            // Đặt ID cho ảnh mới là index
            imageFile.id = index;

            newFileDatas.push(imageFile);
            return newFileDatas;
        });


        setProductDtoRequest((prevProductDtoRequest) => {
            return {
                ...prevProductDtoRequest,
                createProductVariant: [
                    ...prevProductDtoRequest.createProductVariant,
                    {
                        id: index,
                        colorId: data['colorId-' + index],
                        size: data['size-' + index],
                        quantity: data['quantity-' + index],
                        price: data['price-' + index],
                    },
                ],
            };
        });

    };


    console.log("file ảnh: ", fileDatas);

    const handleAddField = () => {
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        const newFields = [...fields, { id: randomNumber }];
        setFields(newFields);
    };

    const handleRemoveField = (index) => {
        const newFiles = fileDatas.filter((file) => file.id !== index);
        const newFields = [...fields];

        // Xóa đối tượng từ createProductVariant theo Id
        const newVariants = productDtoRequest.createProductVariant.filter((variant) => variant.id !== index);
        setProductDtoRequest({
            ...productDtoRequest,
            createProductVariant: newVariants,
        });

        // Tìm vị trí của phần tử cần xóa trong newFields dựa trên id
        const fieldIndex = newFields.findIndex((field) => field.id === index);

        if (fieldIndex !== -1) {
            // Xóa phần tử tại vị trí fieldIndex
            newFields.splice(fieldIndex, 1);

            // Cập nhật state với newFields mới
            setFields([...newFields]);
        }
        setFileDatas(newFiles);
        setFields(newFields);
    };

    console.log("data sau khi xóa: ", productDtoRequest.createProductVariant);
    const postData = async () => {
        // console.log("dataa form: ", productDtoRequest);
        const formData = new FormData();
        formData.append('productDtoRequest', JSON.stringify(productDtoRequest));
        // Thêm toàn bộ fileDatas vào FormData với tên 'files'
        // console.log("file ảnh: ", fileDatas);
        fileDatas.forEach((fileData) => {
            formData.append('files', fileData);
        });

        try {
            const response = await axios.post('/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            if (response.status === 200) {
                toast.success("Create product successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setProductDtoRequest();
            }
        } catch (response) {
            console.log(response);
        }
    }

    return (
        <>
            <div className="flex flex-row gap-2">
                {/* form product  */}
                <ProductForm
                    category={categories}
                    onSubmitCallback={handleProductFormSubmit}
                    onResetForm={resetProductForm}
                // control={productFormControl}
                // errors={productFormErrors}
                />

                <div className="flex-1">
                    <div className="flex flex-col gap-3  max-h-[330px] overflow-y-auto">
                        {fields.map((field) => (
                            <div className="flex flex-col border items-center p-5" key={field.id}>
                                <FormProductVariant
                                    index={field.id}
                                    onSubmitCallback={handleDynamicFormSubmit}
                                />
                                <div>
                                    <Button onClick={() => handleRemoveField(field.id)}>Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end justify-center p-2">
                        <Button
                            className="w-3/4 text-6xl h-[250px] flex items-center justify-center"
                            outline="outlined"
                            onClick={handleAddField}
                        >
                            <IoAdd />
                        </Button>
                    </div>
                    <div className="flex items-center justify-center p-0">
                        <Button onClick={postData}>Add New Product</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductAddPage;
