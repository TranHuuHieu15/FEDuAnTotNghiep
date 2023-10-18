import ProductCard from "../components/card/ProductCard";
import Pagination from "../components/pagination/Pagination";
import SiteLayout from "../layout/SiteLayout";
import { Checkbox } from "@material-tailwind/react";

const productData = [
  {
    id: 1,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 100,
    discount: 5,
    rating: 4,
  },
  {
    id: 2,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 100,
    discount: 5,
    rating: 5,
  },
  {
    id: 3,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 100,
    discount: 5,
    rating: 2,
  },
  {
    id: 4,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 100,
    discount: 5,
    rating: 3,
  },
  {
    id: 5,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 100,
    discount: 5,
    rating: 3,
  },
  {
    id: 6,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 100,
    discount: 5,
    rating: 3,
  },
  {
    id: 7,
    name: "Airpod Pro 15",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 100,
    discount: 5,
    rating: 3,
  },
];

const ProductPage = () => {
  return (
    <>
      <SiteLayout>
        <div className="flex p-5 mx-20 my-10">
          <div className="mx-6 w-96">
            <div className="flex flex-col h-full w-72">
              <div className="my-5 bg-blue-gray-600 w-44">asdsa</div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">FILTERs</h3>
                <Checkbox label="Woman" />
                <Checkbox label="Man" />
                <Checkbox label="Girls" />
                <Checkbox label="Babies" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">BRANDS</h3>
                <Checkbox label="Chanel" />
                <Checkbox label="Gucci" />
                <Checkbox label="D&G" />
                <Checkbox label="Zara" />
                <Checkbox label="Dior" />
                <Checkbox label="Versace" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">CATEGORIES</h3>
                <Checkbox label="Dresses" />
                <Checkbox label="Jacket" />
                <Checkbox label="Tops" />
                <Checkbox label="Vintages" />
              </div>
              <div className="flex flex-col my-5">
                <h3 className="font-normal">SIZES</h3>
                <Checkbox label="Sexy Plus Size" />
                <Checkbox label="Plus Size" />
                <Checkbox label="Large" />
                <Checkbox label="Medium" />
              </div>
            </div>
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
        <Pagination></Pagination>
      </SiteLayout>
    </>
  );
};

export default ProductPage;