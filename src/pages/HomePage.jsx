import SiteLayout from "../layout/SiteLayout";
import HomeBanner from "../module/home/HomeBanner";
import HomeHighlight from "../module/home/HomeHighlight";

const HomePage = () => {
  return (
    <>
      <SiteLayout>
        <HomeBanner></HomeBanner>
        <HomeHighlight></HomeHighlight>
      </SiteLayout>
    </>
  );
};

export default HomePage;
