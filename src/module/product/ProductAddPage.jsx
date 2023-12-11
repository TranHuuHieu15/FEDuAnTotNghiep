import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SelectDefault from "../../components/select/SelectDefault";
import Select from "../../components/select/Select.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import Input from "../../components/input/Input.jsx";
import DialogHashtag from "../../components/dialog/DialogHashtag.jsx";
import Button from "../../components/button/Button";
import { IoAdd } from "react-icons/io5";
import axios from "../../config/axios.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";

const ProductAddPage = () => {
    const [divCount, setDivCount] = useState(1);
    const [selectHashtag, setSelectHashtag] = useState([]);
    const [openDialogHashtag, setDialogHashtag] = useState(false);
    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [dynamicFormData, setDynamicFormData] = useState([]);
    const [fileDatas, setFileDatas] = useState([]);
    const user = useSelector(selectCurrentUser);
    const [productDtoRequest, setProductDtoRequest] = useState({
        productDto: {}, // Assuming fixed form data structure
        hashtagOfProductsDto: [],
        createProductVariant: [],
        deleteProductVariant: [],
        updateProductVariant: [],
    });

    const typeGender = [
        {
            id: 1,
            name: "MALE",
            value: "MALE",
        },
        {
            id: 2,
            name: "FEMALE",
            value: "FEMALE",
        },
        {
            id: 3,
            name: "OTHER",
            value: "OTHER",
        },
    ];
    const typeSeason = [
        {
            id: 1,
            name: "SUMMER",
            value: "SUMMER",
        },
        {
            id: 2,
            name: "WINTER",
            value: "WINTER",
        },
    ];

    const typeSize = [
        {
            id: 1,
            name: "S",
            value: "S",
        },
        {
            id: 2,
            name: "M",
            value: "M",
        },
        {
            id: 3,
            name: "L",
            value: "L",
        },
        {
            id: 4,
            name: "XL",
            value: "XL",
        },
        {
            id: 5,
            name: "XXL",
            value: "XXL",
        },
    ];

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

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("/brand");
                // console.log(response.data);
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await axios.get("/color");
                setColors(response.data);
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };
        fetchColors();
    }, []);

    const createFormSchema = () => {
        return yup.object({
            image: yup
                .mixed()
                .test("file", "Please choose a valid image file", (value) => {
                    if (value instanceof File) {
                        const acceptedExtensions = [".jpg", ".jpeg", ".png"];
                        const fileExtension = value.name.split(".").pop().toLowerCase();
                        return acceptedExtensions.includes(`.${fileExtension}`);
                    } else if (typeof value === "string") {
                        const imageExtensions = [".jpg", ".jpeg", ".png"];
                        return imageExtensions.some((extension) =>
                            value.toLowerCase().endsWith(extension)
                        );
                    }
                    return false;
                }),
            name: yup.string().required("Please enter product name"),
            season: yup.string().required("Please enter product season"),
            gender: yup.string().required("Please enter product gender"),
            categoryId: yup.string().required("Please enter product category"),
            brandId: yup.string().required("Please enter product brand"),
            description: yup.string().required("Please enter product description"),
        });
    };
    const schema = createFormSchema();

    const {
        handleSubmit: handleSubmitFixedForm,
        formState: { errors: errorsFixedForm },
        control: controlFixedForm,
        // setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });


    // const createFormDynamicSchema = (divCount) => {
    //     const schemas = Array.from({ length: divCount }).map((_, index) => {
    //         return yup.object({
    //             image: yup
    //                 .mixed()
    //                 .test("file", "Please choose a valid image file", (value) => {
    //                     if (value instanceof File) {
    //                         const acceptedExtensions = [".jpg", ".jpeg", ".png"];
    //                         const fileExtension = value.name.split(".").pop().toLowerCase();
    //                         return acceptedExtensions.includes(`.${fileExtension}`);
    //                     } else if (typeof value === "string") {
    //                         const imageExtensions = [".jpg", ".jpeg", ".png"];
    //                         return imageExtensions.some((extension) =>
    //                             value.toLowerCase().endsWith(extension)
    //                         );
    //                     }
    //                 }),
    //             name: yup.string().required("Vui lòng nhập tên sản phẩm"),
    //             size: yup.string().required("Vui lòng chọn kích thước"),
    //             colorId: yup.string().required("Vui lòng chọn màu sắc"),
    //             quantity: yup.number().required("Vui lòng nhập số lượng"),
    //             price: yup.number().required("Vui lòng nhập giá"),
    //         });
    //     });

    //     return yup.array().of(schemas);
    // };

    // // // Ví dụ sử dụng
    // const dynamicFormSchema = createFormDynamicSchema(divCount);

    const {
        formState: { errors: errorsDynamicForm },
        control: controlDynamicForm,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const postData = async () => {
        // console.log("dataa form: ", productDtoRequest);
        const formData = new FormData();
        formData.append('productDtoRequest', JSON.stringify(productDtoRequest));
        // Thêm toàn bộ fileDatas vào FormData với tên 'files'
        // console.log("file ảnh: ", fileDatas);
        fileDatas.forEach((fileData) => {
            alert("ảnh ", fileData.length);
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
                setProductDtoRequest()
            }
        } catch (response) {
            console.log(response);
        }
        // console.log(response.data);
    }
    const handleFormSubmit = async (data) => {
        // Thêm file vào mảng fileDatas
        setFileDatas((prevFileDatas) => {
            const newFileDatas = [...prevFileDatas];
            const imageFile = data.image;
            newFileDatas.push(imageFile);
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
        }));
    };

    const handleDynamicFormSubmit = (data) => {

        // Thêm file vào mảng fileDatas
        setFileDatas((prevFileDatas) => {
            const newFileDatas = [...prevFileDatas];
            // Assuming data.image là file hoặc dữ liệu ảnh
            const imageFile = data.image;
            // Thêm file vào mảng fileDatas
            newFileDatas.push(imageFile);
            return newFileDatas;
        });
        // Lưu trữ dữ liệu của productvariant vào mảng dynamicFormData

        setDynamicFormData((prevData) => {
            const newData = [...prevData];
            // Tạo một bản sao của dữ liệu biểu mẫu động không bao gồm trường ảnh
            const productVariantData = { ...data };
            delete productVariantData.image;
            newData.push(productVariantData);
            return newData;
        });

        // Update createProductVariant in productDtoRequest state
        setProductDtoRequest((prevProductDtoRequest) => {
            const newCreateProductVariant = [...prevProductDtoRequest.createProductVariant];
            // Assuming productVariantData is an object with the structure you need
            const productVariantData = {
                ...data,
            };
            newCreateProductVariant.push(productVariantData);
            return {
                ...prevProductDtoRequest,
                createProductVariant: newCreateProductVariant,
            };
        });
    };

    const handleAddDiv = () => {
        setDivCount((prevCount) => prevCount + 1);
    };

    const handleRemoveDiv = () => {
        setDivCount((prevCount) => prevCount - 1);
    };

    const handleOpenDialogHashtag = () => {
        setDialogHashtag(true);
    };

    const handleCloseDialogHashtag = () => {
        setDialogHashtag(false);
    };

    const handleUseHashtag = (useHashtag) => {
        // Thêm hashtag vào trạng thái của component
        setSelectHashtag([...selectHashtag, useHashtag]);
        setSelectedHashtags([...selectedHashtags, useHashtag]);

        // Create a new object with the hashtagId field
        const newHashtagObject = {
            hashtagId: useHashtag.id,
        };

        // Cập nhật hashtagOfProductsDto trong productDtoRequest
        setProductDtoRequest((prevProductDtoRequest) => ({
            ...prevProductDtoRequest,
            hashtagOfProductsDto: [
                ...prevProductDtoRequest.hashtagOfProductsDto,
                newHashtagObject,
            ],
        }));
    };

    const handleDeleteHashtag = (useHashtag) => {
        // Loại bỏ hashtag khỏi trạng thái của component
        setSelectHashtag((prevSelectHashtag) =>
            prevSelectHashtag.filter((item) => item.id !== useHashtag.id)
        );
        setSelectedHashtags((prevSelectedHashtags) =>
            prevSelectedHashtags.filter((item) => item.id !== useHashtag.id)
        );

        // Cập nhật hashtagOfProductsDto trong productDtoRequest
        setProductDtoRequest((prevProductDtoRequest) => ({
            ...prevProductDtoRequest,
            hashtagOfProductsDto: prevProductDtoRequest.hashtagOfProductsDto.filter(
                (item) => item.id !== useHashtag.id
            ),
        }));
    };

    // console.log(productDtoRequest);
    return (
        <>
            <div className="flex flex-row gap-2">
                <div className="flex-none w-[500px]">
                    <form onSubmit={handleSubmitFixedForm((data) => handleFormSubmit(data, 0))}>
                        <div className="flex flex-col gap-3 items-center">
                            <ImageUpload
                                name="image"
                                className="w-full"
                                control={controlFixedForm}
                                errors={errorsFixedForm}
                            />
                            <Input
                                label="Name"
                                name="name"
                                placeholder="Enter name product"
                                className="w-[58%]"
                                control={controlFixedForm}
                                errors={errorsFixedForm}
                            />
                            <div className="flex flex-row items-center justify-center gap-3">
                                <SelectDefault
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Season"
                                    name="season"
                                    options={typeSeason}
                                    control={controlFixedForm}
                                    errors={errorsFixedForm}
                                />
                                <SelectDefault
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Gender"
                                    name="gender"
                                    options={typeGender}
                                    control={controlFixedForm}
                                    errors={errorsFixedForm}
                                />
                            </div>
                            <div className="flex flex-row items-center justify-center gap-3">
                                <Select
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Category"
                                    name="categoryId"
                                    control={controlFixedForm}
                                    errors={errorsFixedForm}
                                    options={categories}
                                />
                                <Select
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Brands"
                                    name="brandId"
                                    control={controlFixedForm}
                                    errors={errorsFixedForm}
                                    options={brands}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex w-[350px] flex-wrap gap-3">
                                    {selectHashtag.map((item) => (
                                        <Button
                                            className="w-auto rounded-full"
                                            onClick={() => handleDeleteHashtag(item)}
                                            key={item.id}
                                            variant="outlined"
                                        >
                                            {item.name}
                                        </Button>
                                    ))}
                                    <Button
                                        className="w-[100px] rounded-full"
                                        variant="outlined"
                                        onClick={handleOpenDialogHashtag}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-2 w-[58%]">
                                <Textarea
                                    label="Description"
                                    name="description"
                                    control={controlFixedForm}
                                />
                            </div>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </div>

                <div className="flex-1">
                    <div className="flex flex-col gap-3  max-h-[330px] overflow-y-auto">
                        {Array.from({ length: divCount }).map((_, index) => (
                            <div className="flex flex-row border items-center p-5" key={index}>
                                <form
                                    className="flex flex-row items-center p-5"
                                    onSubmit={(e) => {
                                        e.preventDefault(); // Ngăn chặn việc gửi mẫu theo cách mặc định
                                        const formData = new FormData(e.target);

                                        // Trích xuất dữ liệu từ biểu mẫu với tên trường chứa chỉ số
                                        const data = {};
                                        formData.forEach((value, key) => {
                                            // Kiểm tra xem tên trường có chứa chỉ số hiện tại không
                                            if (key.includes(`-${index}`)) {
                                                // Trích xuất tên trường gốc mà không có chỉ số
                                                const originalKey = key.replace(`-${index}`, '');
                                                data[originalKey] = value;
                                            }
                                        });

                                        // Xử lý việc gửi biểu mẫu động với dữ liệu trích xuất và chỉ số
                                        handleDynamicFormSubmit(data, index);
                                    }}
                                >
                                    <ImageUpload
                                        name={`image-${index}`}
                                        className="w-full"
                                        control={controlDynamicForm}
                                        errors={errorsDynamicForm}
                                    />

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row gap-3">
                                            <SelectDefault
                                                mainClassName="flex flex-col"
                                                className2="text-sm ml-1 font-normal"
                                                className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
                                                title="Size"
                                                name={`size-${index}`} // Đặt tên khác nhau cho từng biểu mẫu động
                                                options={typeSize}
                                                control={controlDynamicForm}
                                                errors={errorsDynamicForm}
                                            />
                                            <Select
                                                mainClassName="flex flex-col"
                                                className2="text-sm ml-1 font-normal"
                                                className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
                                                title="Color"
                                                name={`colorId-${index}`} // Đặt tên khác nhau cho từng biểu mẫu động
                                                control={controlDynamicForm}
                                                errors={errorsDynamicForm}
                                                options={colors}
                                            />
                                        </div>
                                        <div className="flex flex-row gap-28">
                                            <Input
                                                label="Quantity"
                                                name={`quantity-${index}`} // Đặt tên khác nhau cho từng biểu mẫu động
                                                placeholder="Enter quantity product variant"
                                                className="w-[100px]"
                                                control={controlDynamicForm}
                                                errors={errorsDynamicForm}
                                            />
                                            <Input
                                                label="Price"
                                                name={`price-${index}`} // Đặt tên khác nhau cho từng biểu mẫu động
                                                placeholder="Enter price product variant"
                                                className="w-20"
                                                control={controlDynamicForm}
                                                errors={errorsDynamicForm}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-5 gap-3">
                                        <div className="p-1">
                                            <Button className="w-[100px]" onClick={() => handleRemoveDiv(index)}>Remove</Button>
                                        </div>
                                        <div className="p-1">
                                            <Button className="w-[100px]" type="Submit">
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center p-2">
                        <Button
                            className="w-3/4 text-6xl h-[250px] flex items-center justify-center"
                            outline="outlined"
                            onClick={handleAddDiv}
                        >
                            <IoAdd />
                        </Button>
                    </div>
                    <div className="flex items-center justify-center p-0">
                        <Button onClick={postData}>Add</Button>
                    </div>
                </div>
            </div>

            <DialogHashtag
                show={openDialogHashtag}
                handleCloseDialogHashtag={handleCloseDialogHashtag}
                onUseDialogHashtag={handleOpenDialogHashtag}
                onSelectHashtag={handleUseHashtag}
                selectedHashtag={selectHashtag}
            />
        </>
    );
};

export default ProductAddPage;
