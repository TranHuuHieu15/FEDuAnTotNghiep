import Navbar from "../components/navbar/Navbar";

const SiteLayout = ({ children }) => {
    return (
        <>
            <Navbar></Navbar>
            {children}
        </>
    );
};

export default SiteLayout;