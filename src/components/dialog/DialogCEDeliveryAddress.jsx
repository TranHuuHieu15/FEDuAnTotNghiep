import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import CustomSelect from "../select/CustomSelect";

const DialogCEDeliveryAddress = ({
  show,
  isUpdate,
  handleSubmitAddress,
  cancel,
  title,
  deliveryAddressDataToEdit,
}) => {
  const schema = yup
    .object({
      phoneNumber: yup.string().required("Please enter your phone number"),
      apartmentNumber: yup
        .string()
        .required("Please enter your apartment number"),
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
  useEffect(() => {
    if (!show) {
      reset({
        phoneNumber: "",
        apartmentNumber: "",
        city: "",
        district: "",
        ward: "",
      });
    } else {
      reset(deliveryAddressDataToEdit);
    }
  }, [deliveryAddressDataToEdit, reset, show]);
  const onSubmitHandler = () => {
    const lastData = {
      ...formData,
      selectedCity,
      selectedDistrict,
      selectedWard,
    };

    if (!isValid) return;
    handleSubmitAddress(lastData);

    // Reset only the formData, not the entire form
    setFormData({
      phoneNumber: "",
      apartmentNumber: "",
      city: "",
      district: "",
      ward: "",
    });
  };

  //! Cái ni để call api tỉnh thành ở việt nam
  const host = "https://provinces.open-api.vn/api/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  useEffect(() => {
    // Fetch initial data for cities
    axios.get(`${host}?depth=1`).then((response) => {
      setCities(response.data);
    });
  }, []);

  const fetchDistricts = (cityCode) => {
    axios.get(`${host}p/${cityCode}?depth=2`).then((response) => {
      setDistricts(response.data.districts);
    });
  };

  const fetchWards = (districtCode) => {
    axios.get(`${host}d/${districtCode}?depth=2`).then((response) => {
      setWards(response.data.wards);
    });
  };

  // Thêm state formData để lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    phoneNumber: "",
    apartmentNumber: "",
    city: "",
    district: "",
    ward: "",
  });

  // Sử dụng useEffect để set dữ liệu vào formData khi có thay đổi trong deliveryAddressDataToEdit
  useEffect(() => {
    if (show && isUpdate && deliveryAddressDataToEdit) {
      setFormData({
        phoneNumber: deliveryAddressDataToEdit.phoneNumber || "",
        apartmentNumber: deliveryAddressDataToEdit.apartmentNumber || "",
        city: deliveryAddressDataToEdit.city || "",
        district: deliveryAddressDataToEdit.district || "",
        ward: deliveryAddressDataToEdit.ward || "",
      });
      setSelectedCity(deliveryAddressDataToEdit.city || "");
      setSelectedDistrict(deliveryAddressDataToEdit.district || "");
      setSelectedWard(deliveryAddressDataToEdit.ward || "");
    }
  }, [show, isUpdate, deliveryAddressDataToEdit]);

  const handleCityChange = (e) => {
    const selectedCityOption = e.target.options[e.target.selectedIndex];
    const selectedCityName = selectedCityOption.text;
    const selectedCityCode = selectedCityOption.value;
    setSelectedCity(selectedCityName);
    setSelectedDistrict("");
    setSelectedWard("");
    fetchDistricts(selectedCityCode);
    printResult(selectedCityName);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictOption = e.target.options[e.target.selectedIndex];
    const selectedDistrictName = selectedDistrictOption.text;
    const selectedDistrictCode = selectedDistrictOption.value;
    setSelectedDistrict(selectedDistrictName);
    setSelectedWard("");
    fetchWards(selectedDistrictCode);
    printResult(selectedCity, selectedDistrictName);
  };

  const handleWardChange = (e) => {
    const selectedWardOption = e.target.options[e.target.selectedIndex];
    const selectedWardName = selectedWardOption.text;
    setSelectedWard(selectedWardName);
    printResult(selectedCity, selectedDistrict, selectedWardName);
  };
  const printResult = (
    selectedCityName,
    selectedDistrictName,
    selectedWardName
  ) => {
    if (selectedCityName && selectedDistrictName && selectedWardName) {
      const result = `${selectedCityName} | ${selectedDistrictName} | ${selectedWardName}`;
      console.log(result);
    }
  };
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
                type="text"
                label="Enter your phone number"
                className="w-[355px]"
                name="phoneNumber"
                errors={errors}
                control={control}
              />
              <Input
                type="text"
                label="Enter your apartment number"
                className="w-[355px] ml-3"
                name="apartmentNumber"
                errors={errors}
                control={control}
              />
            </div>
            <div className="mt-2">
              <CustomSelect
                name="city"
                className="w-full border-2 p-2 rounded-md"
                title="Chọn tỉnh thành phố"
                options={cities}
                value={formData.city}
                onChange={handleCityChange}
                control={control}
                errors={errors}
              />
            </div>
            <div className="mt-2">
              <CustomSelect
                name="district"
                className="w-full border-2 p-2 rounded-md"
                title="Chọn quận huyện"
                options={districts}
                value={formData.district}
                onChange={handleDistrictChange}
                control={control}
                errors={errors}
              />
            </div>

            <div className="mt-2">
              <CustomSelect
                name="ward"
                className="w-full border-2 p-2 rounded-md"
                title="Chọn phường xã"
                options={wards}
                value={formData.ward}
                onChange={handleWardChange}
                control={control}
                errors={errors}
              />
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
  deliveryAddressDataToEdit: PropTypes.object,
};

export default DialogCEDeliveryAddress;
