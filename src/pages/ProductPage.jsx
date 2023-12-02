import ProductCard from "../components/card/ProductCard";
import SiteLayout from "../layout/SiteLayout";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/axios";
import Filter from "../components/filter/Filter";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import useDebounce from "../hook/useDebounce";

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [query, setQuery] = useState("");
  const queryDebounce = useDebounce(query, 2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/product");
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/product/search?key=${queryDebounce}`
        );
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [queryDebounce]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/product?season=${season}&gender=${gender}&category=${category}&brand=${brand}`
        );
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [brand, category, gender, season]);
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSeasonValue = (e) => {
    setSeason(e.target.value);
  };
  const handleGenderValue = (e) => {
    setGender(e.target.value);
  };
  const handleCategoryValue = (e) => {
    setCategory(e.target.value);
  };
  const handleBrandValue = (e) => {
    setBrand(e.target.value);
  };
  return (
    <>
      <SiteLayout>
        <div className="flex justify-center gap-10 mx-20 my-10">
          <div className="mx-6 w-96">
            <Filter
              handleSearchChange={handleSearchChange}
              handleSeasonValue={handleSeasonValue}
              handleGenderValue={handleGenderValue}
              handleCategoryValue={handleCategoryValue}
              handleBrandValue={handleBrandValue}
            />
          </div>
          <div className="flex flex-col justify-start">
            {loading && (
              <div className="flex flex-wrap items-center gap-3">
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {productData.length > 0 &&
                productData.map((item) => (
                  <ProductCard
                    className="mx-2 my-2 cursor-pointer w-72 hover:scale-105 focus:scale-105 active:scale-100"
                    key={item.id}
                    item={item}
                  ></ProductCard>
                ))}
            </div>
          </div>
        </div>
        {/* <Pagination></Pagination> */}
      </SiteLayout>
    </>
  );
};

const ProductCardLoading = () => {
  return (
    <Card className="mx-2 my-2 cursor-pointer w-72 hover:scale-105 focus:scale-105 active:scale-100">
      <CardHeader shadow={false} floated={false} className="h-80">
        <LoadingSkeleton height="100%" />
      </CardHeader>
      <CardBody>
        <LoadingSkeleton height="20px" />
        <div
          color="blue-gray"
          className="flex items-center justify-start gap-2 py-2 text-xl font-medium"
        >
          <LoadingSkeleton height="20px" width="50%" />
        </div>
        <div
          color="blue-gray"
          className="flex items-center justify-between gap-8 font-medium"
        >
          <LoadingSkeleton height="10px" width="100%" />
          <LoadingSkeleton height="10px" width="50%" />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductPage;
