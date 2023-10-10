import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Button from "../../components/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Heading from "../../components/heading/Heading";

const rating = 5;
const HomeCard = () => {
  return (
    <>
      <Heading className="my-2 text-center">Popular this week</Heading>
      <div className="mx-24">
        <Card className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
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
              Blazer
            </Typography>
            <div className="flex items-center justify-between mb-2">
              <Typography color="blue-gray" className="font-medium">
                <span className="mr-2">$100.00</span>
                <span className="text-[#9CA3AF] line-through">$95.00</span>
              </Typography>
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="text-yellow-500"
                  />
                ))}
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="w-full shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default HomeCard;
