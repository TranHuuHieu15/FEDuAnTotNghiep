import Button from "../../components/button/Button.jsx";
import Input from "../../components/input/Input.jsx";
import { useForm } from "react-hook-form";
import axios from "../../config/axios.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";
import { updateUserInfo } from "../../redux/features/authSlice.jsx";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const schema = yup
    .object({
      currentPassword: yup
        .string()
        .required("Please enter your current password"),
      newPassword: yup.string().required("Please enter your new password"),
      password: yup.string().required("Please enter your confirm password"),
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
      currentPassword: "",
      newPassword: "",
      password: "",
    },
  });

  const onSubmitHandler = async (data) => {
    if (!isValid) return;
    await handleUpdateData(data);
    // reset form
    reset({
      currentPassword: "",
      newPassword: "",
      password: "",
    });
  };

  const handleUpdateData = async (data) => {
    console.log("Dữ liệu của data", data);
    try {
      const response = await axios.put("/account/change-password", data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(response);
      toast.success("Update password successfully!", {
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
      toast.error("Update password fail!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Update password error:", error);
    }
  };

  return (
    <>
      <div className="flex-initial w-full border-2 shadow-md rounded-2xl">
        <div className="pt-5 pl-10">
          <p className="text-2xl text-blue-gray-600">Change Password</p>
          <p className="text-gray-600">Manage and protect your account</p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="w-full h-px px-3 mt-3 bg-gray-200"></span>
        </div>

        <form
          className="flex flex-row justify-center gap-4 p-16 pt-10"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex-1">
            <Input
              type="password"
              label="Enter your current password"
              className="w-auto my-4"
              name="currentPassword"
              control={control}
              errors={errors}
            />
            <Input
              type="password"
              label="Enter your new password"
              className="w-auto my-4"
              control={control}
              errors={errors}
              name="newPassword"
            />
            <Input
              type="password"
              label="Enter your confirm password"
              className="w-auto my-4"
              name="password"
              control={control}
              errors={errors}
            />

            <div className="mt-7">
              <Button
                className="bg-blue-gray-900"
                type="submit"
                onClick={() => handleUpdateData()}
              >
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
AccountInfo.propTypes = {
  isUpdate: PropTypes.bool,
};
export default AccountInfo;
