// ProductForm.jsx
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import SelectDefault from "../../components/select/SelectDefault";
import Button from "../../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Select from "../../components/select/Select";
import axios from "../../config/axios";
import Textarea from "../../components/textarea/Textarea.jsx";
import DialogHashtag from "../../components/dialog/DialogHashtag.jsx";
import PropTypes from "prop-types";

const ProductForm = ({ category, onSubmitCallback }) => {

    const [brands, setBrands] = useState([]);
    const [selectHashTag, setSelectHashtag] = useState([]);
    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const [openDialogHashtag, setDialogHashtag] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

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

    const schema = yup.object({
        image: yup
            .mixed()
            .test("file", "Please choose a valid image file", (value) => {
                console.log(typeof value);
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
    })
        .required();


    const {
        formState: { errors },
        control,
        handleSubmit: handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(schema),

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

    const handleFormSubmit = (data, e) => {
        e.preventDefault();
        const extractedData = selectHashTag.map((item) => ({
            hashtagId: item.id,
        }));
        const finalData = {
            ...data,
            hashtags: extractedData,
        };
        onSubmitCallback(finalData);
        setIsSaved(true); // Đặt trạng thái đã lưu khi nút "Save" được nhấn
    }

    const handleOpenDialogHashtag = () => {
        setDialogHashtag(true);
    };

    const handleCloseDialogHashtag = () => {
        setDialogHashtag(false);
    };

    const handleUseHashtag = (useHashtag) => {
        // Thêm hashtag vào trạng thái của component
        setSelectHashtag([...selectHashTag, useHashtag]);
        setSelectedHashtags([...selectedHashtags, useHashtag]);
    }

    const handleDeleteHashtag = (useHashtag) => {
        // Loại bỏ hashtag khỏi trạng thái của component
        setSelectHashtag((prevSelectHashtag) =>
            prevSelectHashtag.filter((item) => item.id !== useHashtag.id)
        );
        setSelectedHashtags((prevSelectedHashtags) =>
            prevSelectedHashtags.filter((item) => item.id !== useHashtag.id)
        );
    }

    return (
        <div className="flex-none w-[500px]">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col gap-3 items-center">
                    <ImageUpload
                        name="image"
                        className="w-full"
                        control={control}
                        errors={errors}
                        disabled={isSaved}
                    />
                    <Input
                        label="Name"
                        name="name"
                        placeholder="Enter name product"
                        className="w-[70%]"
                        control={control}
                        errors={errors}
                        disabled={isSaved}
                    />
                    <div className="flex flex-row items-center justify-center gap-3">
                        <SelectDefault
                            mainClassName="flex flex-col"
                            className2="text-sm ml-1 font-normal"
                            className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                            selectDefault="Select season"
                            title="Season"
                            name="season"
                            options={typeSeason}
                            control={control}
                            errors={errors}
                            disabled={isSaved}
                        />
                        <SelectDefault
                            mainClassName="flex flex-col"
                            className2="text-sm ml-1 font-normal"
                            className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                            selectDefault="Select gender"
                            title="Gender"
                            name="gender"
                            options={typeGender}
                            control={control}
                            errors={errors}
                            disabled={isSaved}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-center gap-3">
                        <Select
                            mainClassName="flex flex-col"
                            className2="text-sm ml-1 font-normal"
                            className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                            selectDefault="Select category"
                            title="Category"
                            name="categoryId"
                            control={control}
                            errors={errors}
                            options={category}
                            disabled={isSaved}
                        />
                        <Select
                            mainClassName="flex flex-col"
                            className2="text-sm ml-1 font-normal"
                            className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                            selectDefault="Select brand"
                            title="Brands"
                            name="brandId"
                            control={control}
                            errors={errors}
                            options={brands}
                            disabled={isSaved}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex w-[350px] flex-wrap gap-3">
                            {selectHashTag.map((item) => (
                                <Button
                                    className="w-auto rounded-full"
                                    onClick={() => handleDeleteHashtag(item)}
                                    key={item.id}
                                    variant="outlined"
                                    disabled={isSaved}
                                >
                                    {item.name}
                                </Button>
                            ))}
                            <Button
                                className="w-[100px] rounded-full"
                                variant="outlined"
                                onClick={handleOpenDialogHashtag}
                                disabled={isSaved}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                    <div className="mt-2 w-[70%]">
                        <Textarea
                            label="Description"
                            name="description"
                            control={control}
                            errors={errors}
                            disabled={isSaved}
                        />
                    </div>
                    <Button type="Submit" disabled={isSaved}>{isSaved ? "Saved" : "Save"}</Button>
                </div>
            </form>
            <DialogHashtag
                show={openDialogHashtag}
                handleCloseDialogHashtag={handleCloseDialogHashtag}
                onUseDialogHashtag={handleOpenDialogHashtag}
                onSelectHashtag={handleUseHashtag}
                selectedHashtag={selectHashTag}
            />
        </div>

    );
};

ProductForm.propTypes = {
    category: PropTypes.array,
    onSubmitCallback: PropTypes.func,
}
export default ProductForm;
