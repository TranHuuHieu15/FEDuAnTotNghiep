import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import RadioButton from "../../components/radioButton/RadioButton";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import axios from "../../config/axios.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";

const AccountInfo = () => {
  const user = useSelector(selectCurrentUser);
  console.log(user);
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
      username: yup.string().required("Please enter your username"),
      fullname: yup.string().required("Please enter your fullname"),
      email: yup.string().required("Please enter your email"),
      phoneNumber: yup.string().required("Please enter your phone number"),
      birthday: yup
        .date()
        .transform((originalValue) => {
          return isNaN(Date.parse(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid date for birthday")
        .required("Please enter your birthday"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      address: user.address,
      sex: user.sex,
    },
  });

  const onSubmitHandler = async (data) => {
    if (!isValid) return;
    await handleUpdateData(data);
    // reset form
    reset({
      phoneNumber: "",
      email: "",
      username: "",
      fullname: "",
      birthday: "",
      address: "",
    });
  };

  const handleUpdateData = async (data) => {
    try {
      const formData = new FormData();
      typeof data.image === "string"
        ? formData.append("image", data.image)
        : formData.append("imageFile", data.image);
      formData.append("username", data.username);
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("birthday", data.birthday);
      formData.append("address", data.address);
      const response = await axios.put("/user/update", formData);
      console.log(response);
      toast.success("Update discount successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex-initial shadow-md border-2 w-full rounded-2xl">
        <div className="pl-10 pt-5">
          <p className="text-2xl text-blue-gray-600">Information</p>
          <p className="text-gray-600">Manage and protect your account</p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="w-full px-3 h-px bg-gray-200 mt-3"></span>
        </div>

        <form
          className="flex flex-row justify-center gap-4 mt-5"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex-none">
            <div className="mt-6 w-[300px]">
              <ImageUpload
                name="image"
                control={control}
                // isUpdate={isUpdate}
                errors={errors}
              ></ImageUpload>
            </div>
          </div>
          <div className="flex-1 mr-16">
            <Input
              type="text"
              label="Enter your username"
              className="w-auto my-4"
              control={control}
              errors={errors}
              name="username"
            />
            <Input
              type="text"
              label="Enter your fullname"
              className="w-auto my-4"
              name="fullName"
              control={control}
              errors={errors}
            />
            <Input
              type="email"
              label="Enter your email"
              className="w-auto my-4"
              name="email"
              control={control}
              errors={errors}
            />
            <Input
              type="string"
              label="Enter your phone number"
              className="w-auto my-4"
              name="phoneNumber"
              control={control}
              errors={errors}
            />
            <Input
              type="date"
              label="Enter your birthday"
              className="w-auto my-4"
              name="birthday"
              control={control}
              errors={errors}
            />

            <div className="flex items-center gap-4">
              <p className="text-gray-600">Gender</p>
              <RadioButton
                label="Nam"
                name="sex"
                ripple={true}
                // checked={true}
                control={control}
                errors={errors}
                value={true}
              ></RadioButton>
              <RadioButton
                label="Nữ"
                name="sex"
                ripple={true}
                control={control}
                errors={errors}
                value={false}
              ></RadioButton>
            </div>
            <div className="mt-2">
              <Button className="bg-blue-gray-900" type="submit">
                Update
              </Button>
              <Button className="ml-5" outline="outlined">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountInfo;
