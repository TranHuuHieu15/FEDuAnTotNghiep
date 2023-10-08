import Navbar from "../components/Navbar/Navbar";

const SiteLayout = ({ children }) => {
    return (
        <>
            <Navbar></Navbar>
            {children}
        </>
    );
};

export default SiteLayout;