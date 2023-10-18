import {
  IconButton,
  Typography,
  Navbar as MenuNav,
  Collapse,
} from "@material-tailwind/react";
import React from "react";
import logo from "/src/assets/images/logo.jpg";
import Button from "../button/Button";

const Navbar = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <a href="#" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <a href="#" className="flex items-center">
          Products
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <a href="#" className="flex items-center">
          About Us
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <a href="#" className="flex items-center">
          Contact
        </a>
      </Typography>
    </ul>
  );

  return (
    <MenuNav className="max-w-full px-0 py-0 mx-auto">
      <div className="container flex items-center justify-between mx-auto text-blue-gray-900">
        <div className="w-20">
          <img
            className="object-cover object-center rounded-full"
            src={logo}
            alt="nature image"
          />
        </div>
        <div className="hidden lg:block">{navList}</div>
        <Button
          className="hidden text-gray-200 bg-blue-gray-900 hover:bg-gray-300 hover:text-blue-gray-900 lg:inline-block"
          outline="outlined"
        >
          Sign In
        </Button>
        <IconButton
          variant="text"
          className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button
            className=" hover:bg-gray-300 hover:text-blue-gray-900"
            outline="outlined"
          >
            Sign In
          </Button>
        </div>
      </Collapse>
    </MenuNav>
  );
};

export default Navbar;
