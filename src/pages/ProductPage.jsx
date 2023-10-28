import ProductCard from "../components/card/ProductCard";
import Pagination from "../components/pagination/Pagination";
import SiteLayout from "../layout/SiteLayout";
import { Checkbox } from "@material-tailwind/react";
import InputSearch from "../components/input/InputSearch";
import Select from "../components/select/Select";
import RadioButton from "../components/radioButton/RadioButton";

const productData = [
  {
    id: 1,
    name: "Denin Jacket Boxy Jeans",
    img: "https://media.istockphoto.com/id/475570206/vi/anh/%C3%A1o-kho%C3%A1c-denim.jpg?s=2048x2048&w=is&k=20&c=iBcYxLt0mx_R-qokCyW83NzmGscIdc0ao-jnQyPN3rs=",
    min_price: 100,
    max_price: 200,
    rating: 3.5,
    orderCount: 2000,
  },
  {
    id: 2,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    min_price: 100,
    max_price: 200,
    rating: 4.7,
    orderCount: 2000,
  },
  {
    id: 3,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    min_price: 100,
    max_price: 200,
    rating: 2,
    orderCount: 2000,
  },
  {
    id: 4,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    min_price: 100,
    max_price: 200,
    rating: 3,
    orderCount: 2000,
  },
  {
    id: 5,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    min_price: 100,
    max_price: 200,
    rating: 3,
    orderCount: 2000,
  },
  {
    id: 6,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    min_price: 100,
    max_price: 200,
    rating: 3,
    orderCount: 2000,
  },
  {
    id: 7,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    min_price: 100,
    max_price: 200,
    rating: 3,
    orderCount: 2000,
  },
];

const ProductPage = () => {
  return (
    <>
      <SiteLayout>
        <div className="flex p-5 mx-20 my-10">
          <div className="mx-6 w-96">
            <div className="flex flex-col h-full w-72">
              <InputSearch maxWidth="max-w-[300px]" />
              <div className="flex flex-col my-5">
                <h3 className="font-normal">FILTERs</h3>
                <RadioButton label="Woman" name="filter" />
                <RadioButton label="Man" name="filter" />
                <RadioButton label="Girls" name="filter" />
                <RadioButton label="Babies" name="filter" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">BRANDS</h3>
                <RadioButton label="Chanel" name="brand" />
                <RadioButton label="Gucci" name="brand" />
                <RadioButton label="D&G" name="brand" />
                <RadioButton label="Zara" name="brand" />
                <RadioButton label="Dior" name="brand" />
                <RadioButton label="Versace" name="brand" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">CATEGORIES</h3>
                <RadioButton label="Dresses" name="category" />
                <RadioButton label="Jacket" name="category" />
                <RadioButton label="Tops" name="category" />
                <RadioButton label="Vintages" name="category" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">SIZES</h3>
                <RadioButton label="Sexy Plus Size" name="size" />
                <RadioButton label="Plus Size" name="size" />
                <RadioButton label="Large" name="size" />
                <RadioButton label="Medium" name="size" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-end w-full pr-[58px] font-eculid">
              <Select
                title="Sort by price:"
                className="px-1 py-1"
                className2="p-2"
              >
                <option value="">price</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="hight">high</option>
              </Select>
            </div>
            <div className="flex flex-wrap gap-3">
              {productData.length > 0 &&
                productData.map((item) => (
                  <ProductCard
                    className="mx-2 my-2 w-72"
                    key={item.id}
                    item={item}
                  ></ProductCard>
                ))}
            </div>
          </div>
        </div>
        <Pagination></Pagination>
      </SiteLayout>
    </>
  );
};

export default ProductPage;
