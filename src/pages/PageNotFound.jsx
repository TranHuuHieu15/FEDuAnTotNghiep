import { Link } from "react-router-dom";
import page404 from "../assets/images/page404.jpg";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#F7C59F]">
      <div className="flex items-center justify-center w-[700px] pr-5 shadow-3xl bg-white h-[400px] rounded-3xl">
        <img src={page404} alt="" />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold font-eculid text-[#F7C59F]">
            Page Not Found
          </h1>
          <p className="font-normal text-md font-eculid">
            Oops! It looks like you've stumbled upon a page that no longer
            exists, or perhaps there was a typo in the URL. Don't worry, though.
            We can help you get back on track:
          </p>
          <Link
            to="/"
            className="text-xl font-semibold bg-[#F7C59F] text-gray-800 p-2 text-center rounded-full w-[180px] font-eculid"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
