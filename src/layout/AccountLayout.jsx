import SideBarAccount from "../module/dashboard/SideBarAccount";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
const AccountLayout = () => {
  return (
    <>
      <div className="">
        <Navbar></Navbar>
        <div className="flex flex-row pt-10 px-20 gap-7">
          <SideBarAccount></SideBarAccount>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default AccountLayout;
