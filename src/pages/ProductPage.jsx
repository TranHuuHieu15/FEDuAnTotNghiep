import ProductCard from "../components/card/ProductCard";
import SiteLayout from "../layout/SiteLayout";
import InputSearch from "../components/input/InputSearch";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/axios";
import Filter from "../components/filter/Filter";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <>
      <SiteLayout>
        <div className="flex justify-center gap-10 mx-20 my-10">
          <div className="mx-6 w-96">
            <div className="flex flex-col h-full gap-2 w-72">
              <InputSearch maxWidth="max-w-[300px]" />
              <Filter />
            </div>
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
        <Typography
          variant="small"
          color="black"
          className="w-full text-xl font-medium"
        >
          <LoadingSkeleton height="20px" />
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center justify-start gap-2 py-2 text-xl font-medium"
        >
          <LoadingSkeleton height="20px" width="50%" />
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center justify-between gap-8 font-medium"
        >
          <LoadingSkeleton height="10px" width="100%" />
          <LoadingSkeleton height="10px" width="50%" />
        </Typography>
      </CardBody>
    </Card>
  );
};

export default ProductPage;
