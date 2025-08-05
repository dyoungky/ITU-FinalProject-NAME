import { Link } from "react-router-dom";

import "./ShopNowBtn.css";

function ShopNowBtn() {
  return (
    <div>
      <Link to="/new-arrivals" className="shop-now-btn" data-back="Click" data-front="SHOP NOW"></Link>
    </div>
  );
}

export default ShopNowBtn;
