import {
  IconButton,
  Typography,
  Navbar as MenuNav,
  Collapse,
} from "@material-tailwind/react";
import React from "react";
import logo from "/src/assets/images/logo.jpg";
import Button from "../button/Button";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../select/Dropdown";
import { logout, selectCurrentUser } from "../../redux/features/authSlice";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleLogout = () => {
    dispatch(logout());
  };
  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <NavLink to="/" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <NavLink to="/product" href="#" className="flex items-center">
          Products
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <NavLink to="/about" href="#" className="flex items-center">
          About Us
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-md"
      >
        <NavLink to="/contact" href="#" className="flex items-center">
          Contact
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <MenuNav className="sticky top-0 z-10 max-w-full mx-auto rounded-none h-max lg:px-4 lg:py-2">
      <div className="container flex items-center justify-between mx-auto text-blue-gray-900">
        <Link className="w-20" to="/">
          <img
            className="object-cover object-center rounded-full"
            src={logo}
            alt="nature image"
          />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        {user && user.id ? (
          <Dropdown handleLogout={handleLogout}></Dropdown>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <Button
                className="hidden bg-gray-200 text-blue-gray-800 hover:bg-blue-gray-900 hover:text-gray-300 lg:inline-block"
                outline="text"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                className="hidden text-gray-200 bg-blue-gray-900 hover:bg-gray-300 hover:text-blue-gray-900 lg:inline-block"
                outline="outlined"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
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
          <div className="flex flex-col gap-2 pb-4">
            <Link to="/login">
              <Button
                className="hidden bg-gray-200 text-blue-gray-800 hover:bg-blue-gray-900 hover:text-gray-300 lg:inline-block"
                outline="text"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                className="hidden text-gray-200 bg-blue-gray-900 hover:bg-gray-300 hover:text-blue-gray-900 lg:inline-block"
                outline="outlined"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </Collapse>
    </MenuNav>
  );
};

export default Navbar;
