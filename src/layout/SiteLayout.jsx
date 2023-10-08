import Navbar from "../components/site/Navbar";

const SiteLayout = ({ children }) => {
    return (
        <>
            <Navbar></Navbar>
            {children}
        </>
    );
};

export default SiteLayout;