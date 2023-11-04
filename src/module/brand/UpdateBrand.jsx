import Heading from "../../components/heading/Heading";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { useForm } from "react-hook-form";
import Textarea from "../../components/textarea/Textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../config/axios.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UpdateBrand = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const brandId = params.get("id");

  const schema = yup
    .object({
      image: yup
        .mixed()
        .test(
          "file",
          "Please choose a valid image file (jpg, jpeg, or png)",
          (value) => {
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
          }
        ),
      name: yup.string().required("Please enter brand name"),
    })
    .required();
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/brand/id/${brandId}`);
        reset(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [brandId, reset]);

  const onSubmitHandler = async (values) => {
    if (!isValid) return;
    console.log(brandId);
    const formData = new FormData();
    formData.append("file", values.image);
    const brand = {
      id: brandId,
      name: values.name,
      description: values.description,
    };
    formData.append("brandDto", JSON.stringify(brand));
    try {
      const response = await axios.put(`/brand/update/${brandId}`, formData);
      console.log(response.data);
      reset({
        image: "",
        name: "",
        description: "",
      });
      navigate("/admin/brand");
      toast.success("🦄 Edit brand successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div className="h-screen min-h-full shadow-lg">
      <Heading className="my-10 text-lg text-center">Edit Brand</Heading>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col mb-5 w-[300px]">
            <ImageUpload
              name="image"
              control={control}
              isUpdate={true}
              errors={errors}
            ></ImageUpload>
          </div>
          <div className="mb-5">
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Enter name category"
              className="w-[300px]"
              control={control}
              errors={errors}
            />
          </div>
          <div className="flex flex-col mb-5">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Enter description"
              className="w-[300px] px-2 py-2 text-start my-2 border rounded-md"
              control={control}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBrand;
