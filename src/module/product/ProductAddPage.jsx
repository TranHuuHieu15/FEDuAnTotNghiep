import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as yup from "yup";
import { useParams } from "react-router";
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
    const [hashtagData, setHashtagData] = useState([]);
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
    const {
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const handleOpenDialogHashtag = () => {
    //     setDialogHashtag(true);
    // };

    const handleAddDiv = () => {
        setDivCount((prevCount) => prevCount + 1);
    };

    const handleRemoveDiv = (index) => {
        setDivCount((prevCount) => prevCount - 1);
    };


    // const handleUseHashtag = (useHashtag) => {
    //     setSelectHashtag([...selectHashtag, useHashtag]);
    // };
    // // console.log("lo", selectHashtag);
    // const handleCloseDialogHashtag = () => {
    //     setDialogHashtag(false);
    // };

    // const handleDeleteHashtag = (useHashtag) => {
    //     setSelectHashtag((prevSelectHashtag) =>
    //         prevSelectHashtag.filter((item) => item.id !== useHashtag.id)
    //     );
    // };

    const handleOpenDialogHashtag = () => {
        setDialogHashtag(true);
    };

    const handleUseHashtag = (useHashtag) => {
        setSelectHashtag([...selectHashtag, useHashtag]);
    };
    // console.log("lo", selectHashtag);
    const handleCloseDialogHashtag = () => {
        setDialogHashtag(false);
    };

    const handleDeleteHashtag = (useHashtag) => {
        setSelectHashtag((prevSelectHashtag) =>
            prevSelectHashtag.filter((item) => item.id !== useHashtag.id)
        );
    };

    useEffect(() => {
        // console.log("Select Hashtags:", selectHashtag);
    }, [selectHashtag]);
    // console.log(typeof productVariantDatas[0].price);



    return (
        <>
            <div className="flex flex-row gap-3 items-center">
                {/* form đầu tiên */}
                <div className="border flex-none w-[500px]">
                    <form>
                        <div className="flex flex-col gap-3 items-center">
                            <ImageUpload
                                name="image"
                                className="w-full"
                                control={control}
                                // isUpdate={isUpdate}
                                errors={errors}
                            />
                            <Input
                                label="Name"
                                name="name"
                                placeholder="Enter name product"
                                className="w-[58%]"
                                control={control}
                                errors={errors}
                            />
                            <div className="flex flex-row items-center justify-center gap-3">
                                <SelectDefault
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Season"
                                    name="season"
                                    options={typeSeason}
                                    control={control}
                                    errors={errors}
                                />
                                <SelectDefault
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Gender"
                                    name="gender"
                                    options={typeGender}
                                    control={control}
                                    errors={errors}
                                />
                            </div>
                            <div className="flex flex-row items-center justify-center gap-3">
                                <Select
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Category"
                                    name="categoryId"
                                    control={control}
                                    errors={errors}
                                    options={categories}
                                />
                                <Select
                                    mainClassName="flex flex-col"
                                    className2="text-sm ml-1 font-normal"
                                    className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                                    title="Brands"
                                    name="brandId"
                                    control={control}
                                    errors={errors}
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
                                    control={control}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                {/* form thứ 2 gồm các form nhỏ */}
                <div className="flex-1 mr-3">
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: divCount }).map((_, index) => (
                            <div className="flex flex-row border items-center p-5" key={index}>
                                <ImageUpload
                                    name="image"
                                    className="w-full"
                                    control={control}
                                    // isUpdate={isUpdate}
                                    errors={errors}
                                />
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-row gap-3">
                                        <SelectDefault
                                            mainClassName="flex flex-col"
                                            className2="text-sm ml-1 font-normal"
                                            className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
                                            title="Size"
                                            name="size"
                                            options={typeSize}
                                            control={control}
                                            errors={errors}
                                        />
                                        <Select
                                            mainClassName="flex flex-col"
                                            className2="text-sm ml-1 font-normal"
                                            className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
                                            title="Category"
                                            name="categoryId"
                                            control={control}
                                            errors={errors}
                                            options={categories}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-28">
                                        <Input
                                            label="Quantity"
                                            name="khsf"
                                            placeholder="Enter quantity product variant"
                                            className="w-[100px]"
                                            control={control}
                                            errors={errors}
                                        />
                                        <Input
                                            label="Price"
                                            name="price"
                                            placeholder="Enter price product variant"
                                            className="w-20"
                                            control={control}
                                            errors={errors}
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
            <DialogHashtag
                show={openDialogHashtag}
                handleCloseDialogHashtag={handleCloseDialogHashtag}
                onUseDialogHashtag={handleOpenDialogHashtag}
                onSelectHashtag={handleUseHashtag}
                selectedHashtag={hashtagData}
            />
        </>
    );
};

export default ProductAddPage;
