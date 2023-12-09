import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import SelectDefault from "../../components/select/SelectDefault";
import { useEffect, useState } from "react";
import axios from "../../config/axios.js";
import Select from "../../components/select/Select.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import Input from "../../components/input/Input.jsx";
import DialogHashtag from "../../components/dialog/DialogHashtag.jsx";
import Button from "../../components/button/Button";
import { IoAdd } from "react-icons/io5";

const ProductAddPage = () => {
    const [divCount, setDivCount] = useState(1);
    const [selectHashtag, setSelectHashtag] = useState([]);
    const [openDialogHashtag, setDialogHashtag] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dynamicFormData, setDynamicFormData] = useState([]);
    const [selectedHashtags, setSelectedHashtags] = useState([]);


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
    // * Lấy dữ liệu từ api của category
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // Gọi API để lấy danh sách category
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

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        // Gọi API để lấy danh sách category
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/brand");
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchCategories();
    }, []);

    const [colors, setColors] = useState([]);
    useEffect(() => {
        // Gọi API để lấy danh sách category
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/color");
                setColors(response.data);
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };

        fetchCategories();
    }, []);


    useEffect
    const schema = yup
        .object({
            image: yup.mixed().test("file", "Please choose a image file", (value) => {
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
                return false; // Trường hợp khác không hợp lệ
            }),
            name: yup.string().required("Please enter payment name"),
        })
        .required();
    // State cho biểu mẫu cố định
    const {
        handleSubmit: handleSubmitFixedForm,
        formState: { errors: errorsFixedForm },
        control: controlFixedForm,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // State cho biểu mẫu động
    const {
        handleSubmit: handleSubmitDynamicForm,
        formState: { errors: errorsDynamicForm },
        control: controlDynamicForm,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const handleOpenDialogHashtag = () => {
    //     setDialogHashtag(true);
    // };


    const handleFormSubmit = (data, index) => {
        setDynamicFormData((prevData) => {
            const newData = [...prevData];
            newData[index] = data;
            return newData;
        });
    };

    const onSubmitAllForms = async () => {
        setIsSubmitting(true);

        try {
            // Lấy dữ liệu từ biểu mẫu cố định
            const fixedFormData = await handleSubmitFixedForm();

            // Gửi dữ liệu từ cả hai loại biểu mẫu lên API
            const response = await axios.post("/api/saveForms", {
                fixedFormData,
                dynamicFormData,
            });

            // Xử lý thành công, ví dụ: reset form
            // resetFixedForm();
            // resetDynamicForm();
            setDynamicFormData([]);
            console.log("Forms saved successfully:", response.data);
        } catch (error) {
            // Xử lý lỗi
            console.error("Error saving forms:", error);
        }
    };

    const handleAddDiv = () => {
        setDivCount((prevCount) => prevCount + 1);
    };

    const handleRemoveDiv = (index) => {
        setDivCount((prevCount) => prevCount - 1);
    };

    const handleOpenDialogHashtag = () => {
        setDialogHashtag(true);
    };

    const handleUseHashtag = (useHashtag) => {
        setSelectHashtag([...selectHashtag, useHashtag]);
        setSelectedHashtags([...selectedHashtags, useHashtag]);
    };
    const handleCloseDialogHashtag = () => {
        setDialogHashtag(false);
    };

    const handleDeleteHashtag = (useHashtag) => {
        setSelectHashtag((prevSelectHashtag) =>
            prevSelectHashtag.filter((item) => item.id !== useHashtag.id)
        );

        setSelectedHashtags((prevSelectedHashtags) =>
            prevSelectedHashtags.filter((item) => item.id !== useHashtag.id)
        );
    };
    useEffect(() => {
    }, [selectHashtag]);
    return (
        <>

            <div className="flex flex-row gap-3">
                {/* form đầu tiên */}
                <div className="flex-none w-[500px]">
                    <form onSubmit={handleSubmitFixedForm((data) => handleFormSubmit(data, 0))}>
                        <div className="flex flex-col gap-3 items-center">
                            <ImageUpload
                                name="image"
                                className="w-full"
                                control={controlFixedForm}
                                // isUpdate={isUpdate}
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
                        </div>
                    </form>

                </div>
                {/* form thứ 2 gồm các form nhỏ */}
                <div className="flex-1 p-1 max-h-[600px] overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: divCount }).map((_, index) => (
                            <div className="flex flex-row border items-center p-5" key={index}>
                                <form className="flex flex-row items-center p-5" onSubmit={handleSubmitDynamicForm((data) => handleFormSubmit(data, index))}>
                                    <ImageUpload
                                        name={`image-${index}`} // Đặt tên khác nhau cho từng biểu mẫu động
                                        className="w-full"
                                        control={controlDynamicForm}
                                        // isUpdate={isUpdate}
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
                                                name={`categoryId-${index}`} // Đặt tên khác nhau cho từng biểu mẫu động
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
                                            <Button className="w-[100px]" onClick={() => handleRemoveDiv(index)}>Save</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ))}

                        <Button
                            className="w-full text-6xl h-[250px] flex items-center justify-center"
                            outline="outlined" onClick={handleAddDiv}
                        >
                            <IoAdd />
                        </Button>
                    </div>
                </div>

            </div>
            {/* <div className="flex items-end justify-end"> */}
            <Button
                className="text-sm flex items-end justify-end"
                outline="outlined"
                onClick={onSubmitAllForms}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            {/* </div> */}
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
