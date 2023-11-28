import SideBarAccount from "../module/dashboard/SideBarAccount";
import Navbar from "../components/navbar/Navbar";
import AccountInfo from "../module/information/AccountInfo";
import Footer from "../components/footer/Footer";
const AccountLayout = () => {
  return (
    <>
      <div className="">
        <Navbar></Navbar>
        <div className="flex flex-row px-20 pt-10 gap-7">
          <SideBarAccount></SideBarAccount>
          <AccountInfo></AccountInfo>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default AccountLayout;
