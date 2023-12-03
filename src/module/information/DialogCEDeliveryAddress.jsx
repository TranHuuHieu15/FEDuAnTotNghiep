import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Input from "../../components/input/Input";
import { useState } from "react";
import CustomSelect from "../../components/select/CustomSelect";

const DialogCEDeliveryAddress = ({
  show,
  isUpdate,
  handleSubmitAddress,
  cancel,
  title,
  dataToEdit,
}) => {
  //TODO hiển thị lỗi
  const schema = yup.object({
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .matches(/^[0-9]+$/, "Please enter a valid phone number"),
    apartmentNumber: yup
      .string()
      .required("Please enter your apartment number"),
  });
  //TODO submit hiển thị lỗi
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  //TODO: lấy dữ liệu từ dataToEdit
  useEffect(() => {
    if (!show) {
      reset({
        phoneNumber: "",
        apartmentNumber: "",
        city: "",
        district: "",
        ward: "",
        cityCode: "",
        districtCode: "",
        wardCode: "",
      });
    } else {
      reset(dataToEdit);
    }
  }, [dataToEdit, show, reset]);

  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitAddress(data);
    reset({
      phoneNumber: "",
      apartmentNumber: "",
      city: "",
      district: "",
      ward: "",
      cityCode: "",
      districtCode: "",
      wardCode: "",
    });
  };

  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const handleProvinceChange = (selectedOption) => {
    // Lưu ID và Name của tỉnh vào state
    setSelectedProvince({ id: selectedOption.id, name: selectedOption.name });

    // Gọi API để lấy danh sách quận huyện dựa trên ID của tỉnh
    fetchDistricts(selectedOption.id);
  };

  //* Lấy dữ liệu từ province
  const [province, setProvinces] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh sách category
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://vapi.vnappmob.com/api/province/"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching province:", error);
      }
    };

    fetchProvinces();
  }, []);

  //Lấy dữ liệu từ district
  const [district, setDistrict] = useState([]);
  console.log(district);
  const fetchDistricts = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      );
      setDistrict(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };
  useEffect(() => {
    if (selectedProvince.id) {
      fetchDistricts(selectedProvince.id);
    }
  }, [selectedProvince.id]);

  //Lấy dữ liệu từ ward
  const [ward, setWard] = useState([]);
  const fetchWards = async (districtId) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${districtId}`
      );
      setWard(response.data);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };
  useEffect(() => {
    if (district.id) {
      fetchWards(district.id);
    }
  }, [district.id]);
  return (
    <>
      <Dialog open={show} size="sm">
        {isUpdate ? (
          <DialogHeader className="text-lg">Edit {title}</DialogHeader>
        ) : (
          <DialogHeader className="text-lg">Add New {title}</DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex items-center">
              <Input
                name="phoneNumber"
                label="Phone Number"
                className="w-[355px] ml-3"
                control={control}
                errors={errors}
              />
              <Input
                type="text"
                name="apartmentNumber"
                label="Enter your apartment number"
                className="w-[355px] ml-3"
                control={control}
                errors={errors}
              />
            </div>
            <div className="mt-2">
              <CustomSelect
                className2="text-sm ml-1 font-normal"
                className="p-[10px] rounded-lg border-blue-gray-300"
                title="Province :"
                name="city"
                options={province}
                onChange={handleProvinceChange}
                control={control}
                errors={errors}
              ></CustomSelect>
            </div>
            <div className="mt-2">
              <CustomSelect
                className2="text-sm ml-1 font-normal"
                className="p-[10px] rounded-lg border-blue-gray-300"
                title="District :"
                name="district"
                control={control}
                errors={errors}
                options={district}
              ></CustomSelect>
            </div>
            <div className="mt-2">
              <CustomSelect
                className2="text-sm ml-1 font-normal"
                className="p-[10px] rounded-lg border-blue-gray-300"
                title="Ward :"
                name="ward"
                control={control}
                errors={errors}
                options={ward}
              ></CustomSelect>
            </div>
            <DialogFooter>
              <Button className="bg-red-500" onClick={cancel}>
                Cancle
              </Button>
              <Button
                className="ml-2 bg-green-500"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};
DialogCEDeliveryAddress.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitAddress: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  dataToEdit: PropTypes.object,
};

export default DialogCEDeliveryAddress;
