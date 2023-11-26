import SideBarAccount from "../module/dashboard/SideBarAccount";
import Navbar from "../components/navbar/Navbar";
import AccountInfo from "../pages/information/AccountInfo";
import Footer from "../components/footer/Footer";
const AccountLayout = () => {
  return (
    <>
      <div className="">
        <Navbar></Navbar>
        <div className="flex flex-row pt-10 px-20 gap-7">
          <SideBarAccount></SideBarAccount>
          <AccountInfo></AccountInfo>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default AccountLayout;
