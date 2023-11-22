import PropTypes from "prop-types";

const Color = ({ color }) => {
  const classNames = `w-8 h-8 border-none rounded-full outline-none cursor-pointer hover:opacity-100`;
  console.log(
    "Dynamic classes:",
    color.map((item) => `bg-[${item.code}]`)
  );
  return (
    <>
      <div className="flex gap-4">
        {color &&
          color.length > 0 &&
          color.map((item) => (
            <span
              key={item.id}
              className={`${classNames}`}
              style={{ backgroundColor: item.code }}
            ></span>
          ))}
      </div>
    </>
  );
};

Color.propTypes = {
  color: PropTypes.array.isRequired,
};

export default Color;
