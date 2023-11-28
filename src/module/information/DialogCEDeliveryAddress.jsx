import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Select from "../../components/select/Select";
import CustomSelect from "../../components/select/CustomSelect";

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
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitAddress(data);
    reset({
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

  const handleCityChange = (e) => {
    const selectedCityCode = e.target.value;
    setSelectedCity(selectedCityCode);
    setSelectedDistrict("");
    setSelectedWard("");
    fetchDistricts(selectedCityCode);
    printResult();
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictCode = e.target.value;
    setSelectedDistrict(selectedDistrictCode);
    setSelectedWard("");
    fetchWards(selectedDistrictCode);
    printResult();
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    printResult();
  };
  const printResult = () => {
    if (selectedCity && selectedDistrict && selectedWard) {
      const result = `${selectedCity} | ${selectedDistrict} | ${selectedWard}`;
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
                value={selectedCity}
                onChange={handleCityChange}
              />
            </div>
            <div className="mt-2">
              <CustomSelect
                name="district"
                className="w-full border-2 p-2 rounded-md"
                title="Chọn quận huyện"
                options={districts}
                value={selectedDistrict}
                onChange={handleDistrictChange}
              />
            </div>

            <div className="mt-2">
              <CustomSelect
                name="ward"
                className="w-full border-2 p-2 rounded-md"
                title="Chọn phường xã"
                options={wards}
                value={selectedWard}
                onChange={handleWardChange}
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
