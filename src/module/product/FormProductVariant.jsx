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
import Select from "../../components/select/Select.jsx";

const FormProductVariant = ({ index, onSubmitCallback }) => {
  const [colors, setColors] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

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

  const schema = yup.object({
    [`image-${index}`]: yup
      .mixed()
      .test("file", "Please choose a image file", (value) => {
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
    [`colorId-${index}`]: yup.string().required("Please choose color"),
    [`quantity-${index}`]: yup.string().required("Please enter quantity"),
    [`price-${index}`]: yup.string().required("Please enter price"),
  });

  const {
    formState: { errors: dynamicFormErrors, isValid: dynamicForm },
    control: dynamicFormControl,
    handleSubmit: handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const productVariant = (data, index) => {
    onSubmitCallback(data, index); // Truyền dữ liệu về component gọi ProductVariantForm
  };

  const handleChangeSave = () => {
    if (!dynamicForm) return;
    setIsSaved(!isSaved);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => productVariant(data, index))}
        className="flex flex-row items-center"
      >
        <ImageUpload
          name={`image-${index}`}
          className="w-full"
          control={dynamicFormControl}
          errors={dynamicFormErrors}
          disabled={isSaved}
        />
        <div className="flex flex-col gap-3 p-1">
          <div className="flex flex-row gap-3">
            <SelectDefault
              mainClassName="flex flex-col"
              className2="text-sm ml-1 font-normal"
              className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
              title="Size"
              selectDefault="Select size"
              name={`size-${index}`}
              options={[
                { id: 0, name: "S", value: "S" },
                { id: 1, name: "M", value: "M" },
              ]}
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              disabled={isSaved}
            />
            <Select
              mainClassName="flex flex-col"
              className2="text-sm ml-1 font-normal"
              className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
              title="Color"
              selectDefault="Select color"
              name={`colorId-${index}`} // Đặt tên khác nhau cho từng biểu mẫu động
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              options={colors}
              disabled={isSaved}
            />
          </div>
          <div className="flex flex-row gap-28">
            <Input
              label="Quantity"
              name={`quantity-${index}`}
              placeholder="Enter quantity product variant"
              className="w-[100px]"
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              disabled={isSaved}
            />
            <Input
              label="Price"
              name={`price-${index}`}
              placeholder="Enter price product variant"
              className="w-20"
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              disabled={isSaved}
            />
          </div>
        </div>
        <div className="p-2 gap-3">
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
