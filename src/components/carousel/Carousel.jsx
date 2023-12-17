import { Carousel } from "@material-tailwind/react";
import axios from "../../config/axios";
import { useEffect, useState } from "react";

export function CarouselTransition() {
  const [discount, setDiscountData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/discount/is-active");
        setDiscountData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Carousel
      transition={{ duration: 2 }}
      className="rounded-xl"
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
    >
      {discount &&
        discount.length > 0 &&
        discount.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt="image 1"
            className="object-fill w-full h-[300px]"
          />
        ))}
    </Carousel>
  );
}
