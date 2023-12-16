// ProductVariantForm.jsx
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import SelectDefault from "../../components/select/SelectDefault";
import Button from "../../components/button/Button";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import axios from "../../config/axios.js";
import Color from "../../components/color/Color.jsx";

const FormProductVariant = ({ index, onSubmitCallback }) => {
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState(null)
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await axios.get("/color");
                setColors(response.data.map(color => color.id));
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };
        fetchColors();
    }, []);

    const schema = yup.object({
        [`image-${index}`]: yup.mixed().test("file", "Please choose a image file", (value) => {
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
        [`size-${index}`]: yup.string().required("Please choose size"),
        // [`colorId-${index}`]: yup.string().required("Please choose color"),
        [`quantity-${index}`]: yup.number().required("Please enter quantity"),
        [`price-${index}`]: yup.number().required("Please enter price"),
    });

    const {
        formState: { errors: dynamicFormErrors, isValid: dynamicForm },
        control: dynamicFormControl,
        handleSubmit: handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const productVariant = (data, index) => {
        const lastData = {
            ...data,
            [`colorId-${index}`]: color,
        }
        console.log(lastData);
        onSubmitCallback(lastData, index); // Truyền dữ liệu về component gọi ProductVariantForm
    };

    const handleChangeSave = () => {
        if (!dynamicForm) return;
        setIsSaved(!isSaved);
    };

    const handleColorChange = (color) => {
        console.log(color);
        setColor(color);
    };

    return (
        <>
            <form onSubmit={handleSubmit((data) => productVariant(data, index))} className="flex flex-col items-center">
                <div className="flex flex-row gap-3">
                    <div className="flex-col">
                        <ImageUpload name={`image-${index}`} size="w-[350px] h-[200px]" className="w-full" control={dynamicFormControl} errors={dynamicFormErrors} disabled={isSaved} />
                    </div>
                    <div className="flex flex-col min-w-[635px] max-w-[635px]">
                        <div className="flex flex-col gap-3 p-1">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-start justify-start gap-3">
                                        <Input
                                            label="Quantity"
                                            name={`quantity-${index}`}
                                            placeholder="Enter quantity product variant"
                                            className="w-[40%]"
                                            control={dynamicFormControl}
                                            errors={dynamicFormErrors}
                                            disabled={isSaved}
                                        />
                                        <Input
                                            label="Price"
                                            name={`price-${index}`}
                                            placeholder="Enter price product variant"
                                            className="w-[40%]"
                                            control={dynamicFormControl}
                                            errors={dynamicFormErrors}
                                            disabled={isSaved}
                                        />
                                    </div>
                                    <SelectDefault
                                        mainClassName="flex flex-col"
                                        className2="text-sm ml-1 font-normal"
                                        className="p-2 rounded-lg border-blue-gray-300 w-2/5"
                                        title="Size"
                                        selectDefault="Select size"
                                        name={`size-${index}`}
                                        options={[
                                            { id: 0, name: "S", value: "S" },
                                            { id: 1, name: "M", value: "M" },
                                            { id: 2, name: "L", value: "L" },
                                            { id: 3, name: "XL", value: "XL" },
                                            { id: 4, name: "XXL", value: "XXL" },
                                        ]}
                                        control={dynamicFormControl}
                                        errors={dynamicFormErrors}
                                        disabled={isSaved}
                                    />

                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-normal">
                                        Color:
                                    </div>
                                    <div className="flex">
                                        <Color
                                            color={[]}
                                            name={`colorId-${index}`}
                                            selectedColor={color}
                                            availableColors={colors}
                                            onColorChange={handleColorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <div className="p-1">
                        <div className="p-1">
                            <Button
                                className="w-[100px]"
                                type="submit"
                                onClick={handleChangeSave}
                            >
                                {isSaved ? "Edit" : "Save"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
FormProductVariant.propTypes = {
    index: PropTypes.number.isRequired,
    onSubmitCallback: PropTypes.func.isRequired,
};

export default FormProductVariant;
