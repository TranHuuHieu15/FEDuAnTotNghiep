import { BsBell, BsGear } from "react-icons/bs";
import InputSearch from "../../components/input/InputSearch";

const Header = () => {
  return (
    <div className="flex items-center justify-around">
      <div>
        <h1 className="text-2xl font-semibold font-eculid text-blue-gray-700">
          The Trendy Fashionista
        </h1>
      </div>
      <div className="flex items-center justify-center w-[500px]">
        <InputSearch maxWidth="max-w-[500px]" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <BsGear />
          <BsBell />
        </div>
        <p>|</p>
        <div className="flex items-center justify-center gap-3">
          <p className="text-base font-medium text-blue-gray-600 font-eculid">
            Annette Black
          </p>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZSUyMGFzaWElMjBnaXJsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="rounded-full h-11 w-11"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
