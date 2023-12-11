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
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";

const ProductAddPage = () => {
    const [divCount, setDivCount] = useState(0);
    const [selectHashtag, setSelectHashtag] = useState([]);
    const [openDialogHashtag, setDialogHashtag] = useState(false);
    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const [hashtagChoose, setHashTagChoose] = useState({});
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
        });
    };

    const schema = createFormSchema();

    const {
        handleSubmit: handleSubmitFixedForm,
        formState: { errors: errorsFixedForm },
        control: controlFixedForm,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            categoryId: categories.length > 0 ? categories[0].id : "", // Chọn một giá trị mặc định từ mảng categories nếu có
            brandId: brands.length > 0 ? brands[0].name : "", // Chọn một giá trị mặc định từ mảng brands nếu có
            gender: typeGender[0].name,
            season: typeSeason[0].name
        },
    });
    // Bạn cũng có thể sử dụng useEffect để thiết lập giá trị mặc định dựa trên API call hoặc dữ liệu động khác
    useEffect(() => {
        if (categories.length > 0) {
            setValue("categoryId", categories[0].id);
        }
        if (brands.length > 0) {
            setValue("brandId", brands[0].id);
        }
        if (typeGender.length > 0) {
            setValue("gender", typeGender[0].name);
        }
        if (typeSeason.length > 0) {
            setValue("season", typeSeason[0].name);
        }
    }, [categories, brands, typeGender, typeSeason, setValue]);

    // Thêm hàm handleAddImage vào component
    const handleAddImage = (image) => {
        setFileDatas((prevFileDatas) => [...prevFileDatas, image]);
    };

    const handleFormSubmit = async (data) => {
        try {
            const { name, season, gender, categoryId, brandId, description } = data;

            const productDto = {
                name,
                season,
                gender,
                categoryId,
                brandId,
                description,
            };

            setProductDtoRequest((prevData) => ({
                ...prevData,
                productDto: productDto,
            }));

            console.log(productDtoRequest);
            console.log("List Files: ", fileDatas);
            const formData = new FormData();

            formData.append('productDtoRequest', JSON.stringify(productDtoRequest));

            // Thêm toàn bộ fileDatas vào FormData với tên 'files'
            fileDatas.forEach((fileData) => {
                formData.append('files', fileData); // Thêm từng file vào FormData
            });

            console.log(formData.getAll('files'));

            const response = await axios.post('/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });

            console.log("API Response:", response.data);
        } catch (error) {
            console.error("Error posting data to API:", error);
            // Add additional error handling or user feedback here
        }
    };

    const {

        formState: { errors: errorsDynamicForm },
        control: controlDynamicForm,
    } = useForm({
        resolver: yupResolver(schema),
    });


    const handleDynamicFormSubmit = (data, index) => {
        // Lưu trữ dữ liệu của productvariant vào mảng dynamicFormData
        setDynamicFormData((prevData) => {
            const newData = [...prevData];
            // Tạo một bản sao của dữ liệu biểu mẫu động không bao gồm trường ảnh
            const productVariantData = { ...data };
            delete productVariantData.image;
            newData[index] = productVariantData;
            return newData;
        });

        // Update createProductVariant in productDtoRequest state
        setProductDtoRequest((prevProductDtoRequest) => {
            const newCreateProductVariant = [...prevProductDtoRequest.createProductVariant];

            // Assuming productVariantData is an object with the structure you need
            const productVariantData = {
                ...data,
            };

            newCreateProductVariant[index] = productVariantData;

            return {
                ...prevProductDtoRequest,
                createProductVariant: newCreateProductVariant,
            };
        });

        // Thực hiện các xử lý khác nếu cần
        console.log(`Dynamic Form ${index} Data:`, data);
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
        console.log(hashtagChoose);
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
            <div className="flex flex-row gap-3">
                <div className="flex-none w-[500px]">
                    <form onSubmit={handleSubmitFixedForm((data) => handleFormSubmit(data))}>
                        <div className="flex flex-col gap-3 items-center">
                            <ImageUpload
                                name="image"
                                className="w-full"
                                control={controlFixedForm}
                                errors={errorsFixedForm}
                                onAddImage={handleAddImage}
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
                            <Button type="submit">Submit Fixed Form</Button>
                        </div>
                    </form>
                </div>

                <div className="flex-1 max-h-[600px] overflow-y-auto">
                    <div className="flex flex-col gap-3">
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
                                        onAddImage={handleAddImage}
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
                                    {/* <div className="p-2 gap-2">
                                        <div className="p-1">
                                            <Button className="w-[100px]" onClick={() => handleRemoveDiv(index)}>Remove</Button>
                                        </div>
                                    </div>
                                    <div className="p-2 gap-2">
                                        <div className="p-1">
                                            <Button className="w-[100px]" type="Submit">
                                                Save
                                            </Button>
                                        </div>
                                    </div> */}
                                </form>
                            </div>
                        ))}
                        <Button
                            className="w-full text-6xl h-[250px] flex items-center justify-center"
                            outline="outlined"
                            onClick={handleAddDiv}
                        >
                            <IoAdd />
                        </Button>
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
