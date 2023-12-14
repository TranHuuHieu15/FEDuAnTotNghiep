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

const FormProductVariant = ({ index, onSubmitCallback, initialData }) => {
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
    [`image`]: yup
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
    [`size`]: yup.string().required("Please choose size"),
    [`colorId`]: yup.string().required("Please choose color"),
    [`quantity`]: yup.string().required("Please enter quantity"),
    [`price`]: yup.string().required("Please enter price"),
  });

  const {
    formState: { errors: dynamicFormErrors },
    control: dynamicFormControl,
    handleSubmit: handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const productVariant = (data, index) => {
    onSubmitCallback(data, index); // Truyền dữ liệu về component gọi ProductVariantForm
    setIsSaved(true);
  };

  useEffect(() => {
    if (initialData) {
      // Populate the form with initialData
      reset(initialData);
      console.log(initialData);
    }
  }, [initialData, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => productVariant(data, index))}
        className="flex flex-row items-center p-5"
      >
        <ImageUpload
          name={`image`}
          className="w-full"
          control={dynamicFormControl}
          errors={dynamicFormErrors}
          disabled={isSaved}
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <SelectDefault
              mainClassName="flex flex-col"
              className2="text-sm ml-1 font-normal"
              className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
              title="Size"
              name={`size`}
              options={[
                { id: 1, name: "S", value: "S" },
                { id: 2, name: "M", value: "M" },
                { id: 3, name: "L", value: "L" },
                { id: 4, name: "XL", value: "XL" },
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
              name={`colorId`} // Đặt tên khác nhau cho từng biểu mẫu động
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              options={colors}
              disabled={isSaved}
            />
          </div>
          <div className="flex flex-row gap-28">
            <Input
              label="Quantity"
              name={`quantity`}
              placeholder="Enter quantity product variant"
              className="w-[100px]"
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              disabled={isSaved}
            />
            <Input
              label="Price"
              name={`price`}
              placeholder="Enter price product variant"
              className="w-20"
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              disabled={isSaved}
            />
          </div>
        </div>
        <div className="p-5 gap-3">
          <div className="p-1">
            <Button className="w-[100px]" type="Submit" disabled={isSaved}>
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
FormProductVariant.propTypes = {
  index: PropTypes.number.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default FormProductVariant;
