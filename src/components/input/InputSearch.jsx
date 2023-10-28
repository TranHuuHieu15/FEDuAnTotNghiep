import { BsSearch } from "react-icons/bs";
import PropTypes from "prop-types";

const InputSearch = ({ maxWidth }) => {
  return (
    <>
      <form
        className={`my-3 w-full ${maxWidth} relative border rounded-full border-gray-900`}
      >
        <input
          type="text"
          className="w-full h-10 px-4 py-4 text-base rounded-full font-eculid"
          placeholder="Search..."
        />
        <button>
          <BsSearch className="absolute rounded-full top-3 right-2" />
        </button>
      </form>
    </>
  );
};

InputSearch.propTypes = {
  maxWidth: PropTypes.string,
};

export default InputSearch;
