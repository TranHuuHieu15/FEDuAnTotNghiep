import PropTypes from "prop-types";

const OrderCard = ({ orders }) => {
  const { orderDto, orderDetailsDto } = orders;
  const { purchaseDate, total } = orderDto;
  return (
    <>
      <div className="flex flex-col items-start justify-center gap-5 p-5 border border-blue-gray-400">
        <div className="flex items-center justify-between w-full gap-5 p-3 border">
          <div className="flex items-start justify-center gap-20">
            <div className="flex flex-col items-start justify-center gap-2">
              <span className="font-semibold">Purchased Date</span>
              <span className="text-blue-gray-400">{purchaseDate}</span>
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <span className="font-semibold">Total Amount</span>
              <span className="text-blue-gray-400">${total}</span>
            </div>
          </div>

          <div className="mr-10">
            <span>Status</span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-[660px] gap-5">
          {orderDetailsDto.map((item) => (
            <OrderItem key={item.id} orderItems={item} />
          ))}
        </div>
      </div>
    </>
  );
};
const OrderItem = ({ orderItems }) => {
  const { color, size, quantity, name, image, price } = orderItems;
  return (
    <div className="flex items-start justify-around w-full gap-3 ">
      <img src={image} alt="" className="w-40 h-32" />
      <div className="flex flex-col gap-5">
        <span className="text-xl font-medium font-eculid">{name}</span>
        <span className="text-lg font-eculid">{price}</span>
      </div>
      <div className="flex flex-col gap-5">
        <p className="flex gap-2 text-lg font-eculid">
          Color:
          <span
            className="w-5 h-5 mt-1 border-none rounded-full outline-none cursor-pointer hover:opacity-100"
            style={{ backgroundColor: color }}
          ></span>
        </p>
        <p className="text-lg font-eculid">Size: {size}</p>
        <p className="text-lg font-eculid">Quantity: {quantity}</p>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  orders: PropTypes.object,
};
OrderItem.propTypes = {
  orderItems: PropTypes.object,
};
export default OrderCard;
