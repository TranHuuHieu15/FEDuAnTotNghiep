import InputSearch from "../../components/input/InputSearch";

const Header = () => {
  return (
    <div className="grid grid-cols-3 gap-10">
      <h1 className="flex items-center justify-center text-3xl font-semibold font-eculid">
        The Trendy Fashionista
      </h1>
      <div className="flex justify-end w-full col-span-2 gap-4 pr-28">
        <InputSearch maxWidth="max-w-[600px]" />
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZSUyMGFzaWElMjBnaXJsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-12 h-12 mt-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
