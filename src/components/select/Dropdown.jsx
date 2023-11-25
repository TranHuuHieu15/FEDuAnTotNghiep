import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Dropdown = (handleLogout) => {
  const handleLogoutDropdown = () => {
    handleLogout();
  };
  return (
    <>
      <Menu>
        <MenuHandler>
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 cursor-pointer"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </MenuHandler>
        <MenuList>
          <Link to="/user">
            <MenuItem>My Profile</MenuItem>
          </Link>
          <Link>
            <MenuItem>Help</MenuItem>
          </Link>
          <Link onClick={handleLogoutDropdown}>
            <MenuItem>Log out</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </>
  );
};

export default Dropdown;
