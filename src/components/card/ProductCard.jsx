import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";

const ProductCard = ({ item, className }) => {
  const { name, rating, img, min_price, max_price, orderCount } = item;
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
          className="w-full text-xl font-medium"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center justify-start gap-2 py-2 text-xl font-medium"
        >
          <span>${min_price} ~</span>
          <span>${max_price}</span>
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center justify-between gap-8 font-medium"
        >
          <span className="flex items-center gap-1">
            <Rating
              name="half-rating-read"
              value={rating}
              precision={0.1}
              readOnly
              size="small"
            />
            <span className="text-sm">{rating}</span>
          </span>
          <span className="text-xs">Purchased: {orderCount}</span>
        </Typography>
      </CardBody>
    </Card>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string,
  item: PropTypes.object.isRequired,
  img: PropTypes.string,
  min_price: PropTypes.number,
  max_price: PropTypes.number,
  rating: PropTypes.number,
  className: PropTypes.string,
  orderCount: PropTypes.number,
};

export default ProductCard;
