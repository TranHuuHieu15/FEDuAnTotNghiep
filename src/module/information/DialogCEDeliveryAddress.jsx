import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Input from "../../components/input/Input";
import CustomSelect from "../../components/select/CustomSelect";

const DialogCEDeliveryAddress = ({
  show,
  isUpdate,
  handleSubmitAddress,
  cancel,
  title,
  deliveryAddressDataToEdit,
}) => {
  //! Cái ni để call api tỉnh thành ở việt nam
  const host = "https://provinces.open-api.vn/api/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityCode, setCityCode] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [wardCode, setWardCode] = useState();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

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
    if (!show && !isUpdate) {
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
      reset(deliveryAddressDataToEdit);
    }
  }, [deliveryAddressDataToEdit, show, reset, isUpdate]);
  useEffect(() => {
    // Fetch initial data for cities
    axios.get(`${host}?depth=1`).then((response) => {
      setCities(response.data);
      setCityCode(response.data);
      // console.log("Tỉnh ", response.data);
      // axios.get(`${host}p/${cityCode}?depth=2`).then((response) => {
      //   setDistricts(response.data.districts);
      //   setDistrictCode(response.data.districts);
      //   console.log("Huyện ", response.data.districts);
      //   axios.get(`${host}d/${districtCode}?depth=2`).then((response) => {
      //     setWards(response.data.wards);
      //     setWardCode(response.data.wards);
      //     console.log("Xã", response.data.wards);
      //   });
      // });
    });
  }, []);
  const onSubmitHandler = (data) => {
    // Log regardless of form validity
    console.log("Form data submitted:", data);

    if (!isValid) return;

    // handleSubmitAddress(data);
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
    const selectedCityOption = e.target.options[e.target.selectedIndex];
    const selectedCityName = selectedCityOption.text;
    const selectedCityCode = selectedCityOption.value;
    setSelectedCity(selectedCityName);
    setCityCode(selectedCityCode);
    fetchDistricts(selectedCityCode);
    printResult(selectedCityName);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictOption = e.target.options[e.target.selectedIndex];
    const selectedDistrictName = selectedDistrictOption.text;
    const selectedDistrictCode = selectedDistrictOption.value;
    setSelectedDistrict(selectedDistrictName);
    setDistrictCode(selectedDistrictCode);
    fetchWards(selectedDistrictCode);
    printResult(selectedCity, selectedDistrictName);
  };

  const handleWardChange = (e) => {
    const selectedWardOption = e.target.options[e.target.selectedIndex];
    const selectedWardName = selectedWardOption.text;
    setSelectedWard(selectedWardName);
    setWardCode(selectedWardOption.value);
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
                name="city"
                className="w-full border-2 p-2 rounded-md"
                title="Chọn tỉnh thành phố"
                options={cities}
                value={cityCode}
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
                value={districtCode}
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
                value={wardCode}
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
