import { FaPlusCircle, FaMinusCircle, FaShippingFast } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";
import Button from "../components/button/Button";
import { Collapse, Typography } from "@material-tailwind/react";
import SiteLayout from "../layout/SiteLayout";
import Comment from "../components/comment/Comment";
import { useParams } from "react-router";
import axios from "../config/axios";
import { useEffect } from "react";
import { useState } from "react";
import Color from "../components/color/Color";
import Size from "../components/size/Size";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { useSaveCartMutation } from "../redux/api/cartApi";
const ProductDetailPage = () => {
  const [productDetail, setProductDetail] = useState([]);
  const { createProductVariant, productDto } = productDetail;
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(
    createProductVariant?.length > 0 ? createProductVariant[0].colorId : null
  );
  const [quantity, setQuantity] = useState(1);
  const toggleOpen = () => setOpen((cur) => !cur);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saveCart] = useSaveCartMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/id/${productId}`);
        setProductDetail(response.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = () => {
    const cartItem = {
      productVariantId: selectedVariant?.id,
      quantity,
    };
    if (selectedVariant) {
      if (userInfo) {
        saveCart(cartItem);
      }
      else {
        dispatch(
          addToCart({
            id: selectedVariant.id,
            image: productDto.imageProductDto.url,
            name: productDto.name,
            price: selectedVariant.price,
            quantity,
            color: selectedColor,
            size: selectedSize,
          })
        );
      }
    }
    navigate("/cart");
  };

  const selectedVariant =
    createProductVariant &&
    createProductVariant.find(
      (variant) =>
        variant.size === selectedSize && variant.colorId === selectedColor
    );
  return (
    <SiteLayout>
      <div className="flex gap-3 mx-32 mt-5">
        <div className="flex w-[630px] flex-col gap-5 mt-2">
          <img
            src={productDto?.imageProductDto?.url}
            alt=""
            className="w-full max-w-[600px] h-[540px] object-fill hover:scale-105 hover:duration-500"
          />
          <div className="flex flex-row gap-3 mt-2">
            {createProductVariant?.length > 0 &&
              createProductVariant.map((variant) => (
                <img
                  key={variant.id}
                  src={variant.imageProductDto.url}
                  alt="Image"
                  className="w-[140px] h-[154px] object-fill"
                />
              ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 mt-2">
          <div className="flex flex-col items-start w-full gap-4">
            <div className="gap-3">
              <p className="text-2xl not-italic font-normal font-eculid">
                {productDto?.name}
              </p>
              <span className="text-3xl not-italic font-bold leading-normal font-eculid">
                ${selectedVariant?.price || "12"}
              </span>
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Size:
              </h5>
              <Size
                size={createProductVariant || []}
                onSizeChange={handleSizeChange}
                selectedSize={selectedSize}
              />
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Color:
              </h5>
              <Color
                color={createProductVariant || []}
                onColorChange={handleColorChange}
                selectedColor={selectedColor}
              />
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Quantity:
              </h5>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-2 p-2 h-9">
                  <button onClick={handleDecrease}>
                    <FaMinusCircle />
                  </button>
                  <span
                    type="number"
                    min="0"
                    value="1"
                    className="w-20 text-center"
                  >
                    {quantity}
                  </span>
                  <button onClick={handleIncrease}>
                    <FaPlusCircle />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-[560px] gap-4">
              <Button
                onClick={handleAddToCart}
                className={`w-full shadow-none 'bg-[#1F2937]'} text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100`}>
                Add to Cart
              </Button>
              <Button
                className={`w-full shadow-none 'bg-[#1F2937]'} text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100`}>
                Buy Now
              </Button>
            </div>
            <div className="flex flex-col items-start gap-14">
              <div className="flex gap-3 px-4 py-8 bg-[#F3F4F6] w-[560px]">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-6">
                    <div className="flex items-center justify-center">
                      <FaShippingFast />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-medium">Free shipping</h5>
                      <p className="text-sm">
                        Free standard shipping on orders over 9,00€ Estimated to
                        be delivered on 28/02/2022 - 03/03/2022.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6">
                    <div className="flex items-center justify-center">
                      <MdSecurity />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-medium">Return Policy</h5>
                      <p className="text-sm">Learn More</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-10">
                <div className="flex items-center justify-center gap-[465px]">
                  <p className="text-lg font-semibold font-eculid">
                    Description
                  </p>
                  <button onClick={toggleOpen}>
                    <AiOutlinePlus />
                  </button>
                </div>
                <div>
                  <Collapse
                    open={open}
                    className="flex flex-col items-center justify-center"
                  >
                    <Typography className="w-[480px]">
                      {productDto?.description || "It's perfect"}
                    </Typography>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-32">
        <h3 className="text-2xl font-semibold font-eculid">Customer Reviews</h3>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <div className="flex items-center justify-center my-8">
          <Button className="text-base font-semibold w-60 bg-blue-gray-800 hover:scale-105">
            Load More
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ProductDetailPage;
