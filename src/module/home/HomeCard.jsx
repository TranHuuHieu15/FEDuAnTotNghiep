import ProductCard from "../../components/card/ProductCard";
import Heading from "../../components/heading/Heading";

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
];

const HomeCard = () => {
  return (
    <>
      <Heading className="text-center">Popular this week</Heading>
      <div className="flex items-center justify-center gap-5">
        {productData.length > 0 &&
          productData.map((item) => (
            <ProductCard
              className="w-96"
              key={item.id}
              item={item}
            ></ProductCard>
          ))}
      </div>
    </>
  );
};

export default HomeCard;
