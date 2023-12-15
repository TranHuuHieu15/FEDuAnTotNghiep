import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import axios from "../../config/axios.js";
import FormProductVariant from "./FormProductVariant.jsx";
import Button from "../../components/button/Button.jsx";
import { useForm } from "react-hook-form";
import { FcPlus } from "react-icons/fc";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { selectCurrentToken } from "../../redux/features/authSlice.jsx";
import { useSelector } from "react-redux";

const ProductAddPage = () => {
    const [fields, setFields] = useState([{ id: 1 }]);
    const { reset: resetProductForm } = useForm();
    const [categories, setCategories] = useState([]);
    const [fileDatas, setFileDatas] = useState([]);
    const token = useSelector(selectCurrentToken);

    const [productDtoRequest, setProductDtoRequest] = useState({
        productDto: {}, // Assuming fixed form data structure
        hashtagOfProductsDto: [],
        createProductVariant: [],
        deleteProductVariant: [],
        updateProductVariant: [],
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

                const existingIndex = newFileDatas.findIndex((item) => item.id === imageFile.id);

                if (existingIndex !== -1) {
                    // Nếu đã tồn tại, thay thế nó
                    newFileDatas[existingIndex] = imageFile;
                } else {
                    // Nếu không, thêm mới
                    newFileDatas.unshift(imageFile);
                }
                return newFileDatas;
            });

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
        // Thêm file vào mảng fileDatas
        setFileDatas((prevFileDatas) => {
            const newFileDatas = [...prevFileDatas];
            const imageFile = data['image-' + [index]];

            // Đặt ID cho ảnh mới là index
            imageFile.id = index;
            // Kiểm tra xem có phần tử nào có cùng ID không
            const existingIndex = newFileDatas.findIndex((item) => item.id === imageFile.id);

            if (existingIndex !== -1) {
                // Nếu đã tồn tại, thay thế nó
                newFileDatas[existingIndex] = imageFile;
            } else {
                // Nếu không, thêm mới
                newFileDatas.push(imageFile);
            }
            return newFileDatas;
        });


        setProductDtoRequest((prevProductDtoRequest) => {
            const existingIndex = prevProductDtoRequest.createProductVariant.findIndex((variant) => variant.id === index);

            if (existingIndex !== -1) {
                // Nếu tồn tại, cập nhật dữ liệu
                const updatedVariants = [...prevProductDtoRequest.createProductVariant];
                updatedVariants[existingIndex] = {
                    ...updatedVariants[existingIndex],
                    colorId: data['colorId-' + index],
                    size: data['size-' + index],
                    quantity: data['quantity-' + index],
                    price: data['price-' + index],
                };

                return {
                    ...prevProductDtoRequest,
                    createProductVariant: updatedVariants,
                };
            } else {
                // Nếu không tồn tại, thêm mới
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
            }
        });

    };

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
        toast.success("Delete ProductVariant successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };


    const postData = async () => {
        const formData = new FormData();
        formData.append('productDtoRequest', JSON.stringify(productDtoRequest));
        fileDatas.forEach((fileData) => {
            formData.append('files', fileData);
        });

        try {
            const response = await axios.post('/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
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
                setFields([]);
                setFileDatas([]);
                setProductDtoRequest();
            }
        } catch (response) {
            toast.error("Create new product fail!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setFileDatas([]);
            setProductDtoRequest();
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
                />

                <div className="flex-1">
                    <div className="flex flex-col gap-3 h-[450px]  max-h-[600px] overflow-y-auto">
                        {fields.map((field) => (
                            <div className="flex flex-row border p-5" key={field.id}>
                                <FormProductVariant
                                    index={field.id}
                                    onSubmitCallback={handleDynamicFormSubmit}
                                />
                                <Button className="h-[40px] text-2xl" outline="text" onClick={() => handleRemoveField(field.id)}>
                                    <AiTwotoneDelete />
                                </Button>
                            </div>

                        ))}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4 pt-[100px]">
                            <Button
                                className="w-3/4 text-lg flex items-center justify-center"
                                outline="outlined"
                                onClick={handleAddField}
                            >
                                <FcPlus />
                            </Button>
                        </div>
                        <div className="flex items-end justify-end pt-[100px] pr-10">
                            <Button className="text-sm" onClick={postData}>Add New Product</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductAddPage;
