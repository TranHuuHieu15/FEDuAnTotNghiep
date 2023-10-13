import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Button from "../../components/button/Button";
import propTypes from "prop-types";

const ProductCard = ({ item, className }) => {
  const { name, rating, img, price, discount } = item;
  return (
    <Card className={className}>
      <CardHeader shadow={false} floated={false} className="h-80">
        <img
          src={img}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <Typography
          variant="small"
          color="gray"
          className="text-xl font-medium"
        >
          {name}
        </Typography>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium">
            <span className="mr-2">${(price * discount) / 100}</span>
            <span className="text-[#9CA3AF] line-through">${price}</span>
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {rating}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="w-full shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

ProductCard.propTypes = {
  name: propTypes.string,
  role: propTypes.string,
  item: propTypes.object,
  img: propTypes.string,
  rating: propTypes.number,
  discount: propTypes.number,
  className: propTypes.string,
};

export default ProductCard;
