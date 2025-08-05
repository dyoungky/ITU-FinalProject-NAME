import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import "./NewArrivalsCarousel.css";
import { Link } from "react-router-dom";
import styles from "./NewArriavalsCarousel.module.css";
import AddToCartButton from "../Basket/AddToCartButton";

interface Product {
  product_id: number;
  product_name: string;
  imgUrls: string[];
  color: string;
  price: number;
  isNew: boolean;
  colorBox: string;
  selectedSize: string | null;
  isAdded: boolean;
}

function NewArrivalsCarousel() {
  const { product_id } = useParams<{ product_id: string }>();
  const [productsData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const productsWithAddedStatus = data.map((product: Product) => ({ ...product, isAdded: false }));
        setProductData(productsWithAddedStatus);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSizeSelection = (productId: number, size: string) => {
    setProductData((prevProducts) => prevProducts.map((product) => (product.product_id === productId ? { ...product, selectedSize: size } : { ...product, selectedSize: null })));
  };

  const handleAddToCart = (productId: number) => {
    // Set isAdded to true
    setProductData((prevProducts) => prevProducts.map((product) => (product.product_id === productId ? { ...product, isAdded: true } : product)));

    // After 1 second
    setTimeout(() => {
      // Reset selectedSize to null
      setProductData((prevProducts) => prevProducts.map((product) => (product.product_id === productId ? { ...product, isAdded: false, selectedSize: null } : product)));
    }, 1000);
  };

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Container>
        <div className="sub-title">New arrivals</div>
        <Slider {...settings}>
          {productsData
            .filter((product) => product.isNew === true)
            .map((product) => (
              <div key={product.product_id} className="product-box">
                <Link to={`/products/${product.product_id}`} className="product">
                  <div className="product-img">
                    <img src={`${product.imgUrls[0]}`} alt={product.product_name} />
                    <span className="is-new">NEW</span>
                  </div>
                  <div className="product-contents">
                    <p className="product-price">{product.price} DKK</p>
                    <p className="product-name">{product.product_name}</p>
                    <span className="color-box" style={{ backgroundColor: product.colorBox }}></span>
                  </div>
                </Link>

                <div className={styles.size_select}>
                  <button className={`${styles.size_btn} ${product.selectedSize === "XS" ? styles.selected : ""}`} onClick={() => handleSizeSelection(product.product_id, "XS")}>
                    XS
                  </button>

                  <button className={`${styles.size_btn} ${product.selectedSize === "S" ? styles.selected : ""}`} onClick={() => handleSizeSelection(product.product_id, "S")}>
                    S
                  </button>

                  <button className={`${styles.size_btn} ${product.selectedSize === "M" ? styles.selected : ""}`} onClick={() => handleSizeSelection(product.product_id, "M")}>
                    M
                  </button>
                  <button className={`${styles.size_btn} ${product.selectedSize === "L" ? styles.selected : ""}`} onClick={() => handleSizeSelection(product.product_id, "L")}>
                    L
                  </button>
                  <button className={`${styles.size_btn} ${product.selectedSize === "XL" ? styles.selected : ""}`} onClick={() => handleSizeSelection(product.product_id, "XL")}>
                    XL
                  </button>
                </div>

                <div className="button">
                  <AddToCartButton
                      product={product}
                      selectedSize={product.selectedSize}
                  />
                </div>
              </div>
            ))}
        </Slider>
      </Container>
    </div>
  );
}

export default NewArrivalsCarousel;
