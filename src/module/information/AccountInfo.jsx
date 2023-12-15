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
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import { updateUserInfo } from "../../redux/features/authSlice.jsx";
import { useDispatch } from "react-redux";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const schema = yup
    .object({
      fullName: yup.string().required("Please enter your fullname"),
      birthday: yup.date().required("Please enter your birthday"),
      sex: yup.boolean().required("Please select your gender"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
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
    try {
      const formData = new FormData();
      typeof data.image === "string"
        ? formData.append("image", data.image)
        : formData.append("imageFile", data.image);
      formData.append("fullName", data.fullName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("birthday", data.birthday);
      formData.append("address", data.address);
      formData.append("sex", data.sex);
      await axios.put("/account/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedBirthday = data.birthday.toISOString().split("T")[0];
      const userInfo = {
        image: data.image,
        username: user.username,
        typeAccount: user.typeAccount,
        path: user.path,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        birthday: formattedBirthday,
        address: data.address,
        sex: data.sex,
      };
      dispatch(updateUserInfo(userInfo));
      toast.success("Update infomation successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        address: user.address,
        sex: user.sex,
      });
    } catch (error) {
      toast.error("Update user fail! (Do not duplicate phone numbers)", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
    reset({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      address: user.address,
      sex: user.sex,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="pt-5 pl-10">
          <p className="text-2xl text-blue-gray-600">Information</p>
          <p className="text-gray-600">Manage and protect your account</p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="w-full h-px px-3 mt-3 bg-gray-200"></span>
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
                isUpdate={true}
                isInfo={true}
                errors={errors}
              ></ImageUpload>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-3 w-[323px]">
            <Input
              type="email"
              label="Enter your email"
              className="w-full"
              disabled={true}
              name="email"
              control={control}
              errors={errors}
            />
            <Input
              type="text"
              label="Enter your fullname"
              className="w-full"
              name="fullName"
              control={control}
              errors={errors}
            />
            <Input
              type="text"
              label="Enter your phone number"
              className="w-full"
              name="phoneNumber"
              control={control}
              errors={errors}
            />
            <Input
              type="date"
              name="birthday"
              label="Enter your birthday"
              className="w-full"
              control={control}
              errors={errors}
            />
            <Textarea
              name="address"
              label="Address"
              control={control}
              errors={errors}
            />

            <div className="flex items-center gap-4">
              <p className="text-gray-600">Gender</p>
              <RadioButton
                label="Nam"
                name="sex"
                ripple={true}
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountInfo;
