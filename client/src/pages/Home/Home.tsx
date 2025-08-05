import ShopNowBtn from "../../components/Button/ShopNowBtn";
import NewArrivalsCarousel from "../../components/Carousel/NewArrivalsCarousel";

import "./Home.css";

function Home() {
  return (
    <>
      <div className="main-banner-box">
        <img src="images/homepage/main-banner.webp" alt="New Arrivals" />
        <div className="new-arrivals-box">
          <span className="new-promotion-text">
            <p>New arrivals</p>
            <p>New styles are on sale, shop now!</p>
            <ShopNowBtn />
          </span>
        </div>
      </div>
      <NewArrivalsCarousel />
    </>
  );
}

export default Home;
