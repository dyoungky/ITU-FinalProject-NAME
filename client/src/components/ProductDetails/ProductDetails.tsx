import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import Accordion from "./Accordion";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useAuth } from "../../contexts/AuthContext";
import AddToCartButton from "../Basket/AddToCartButton";

interface Product {
  product_id: number;
  product_name: string;
  imgUrls: string[];
  isAdded: boolean;
  color: string;
  price: number;
  colorBox: string;
  info: string;
  materialinfo: string;
  selectedSize: string | null;
}

function Product() {
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/products/${product_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
      <div className="slider-container">
        <div className="productdisplay">
          <div className="productdisplay-left">
            <div className="product-gallery">
              <ImageGallery imgUrls={product.imgUrls} />
            </div>
          </div>

          <div className="productdisplay-right">
            <div className="product_info">
              <h1 className="product_name">{product.product_name}</h1>
              <p className="product_price">{product.price} DKK</p>

              <div className="color_info">
                <p className="product_color">{product.color}</p>
                <div className="color_option" style={{ background: product.colorBox }}></div>
              </div>

              <div className="size_select">
                <p className="select_size">Select size</p>
                <button className={`size_button ${selectedSize === "XS" ? "selected" : ""}`} onClick={() => handleSizeSelection("XS")}>
                  XS
                </button>
                <button className={`size_button ${selectedSize === "S" ? "selected" : ""}`} onClick={() => handleSizeSelection("S")}>
                  S
                </button>
                <button className={`size_button ${selectedSize === "M" ? "selected" : ""}`} onClick={() => handleSizeSelection("M")}>
                  M
                </button>
                <button className={`size_button ${selectedSize === "L" ? "selected" : ""}`} onClick={() => handleSizeSelection("L")}>
                  L
                </button>
                <button className={`size_button ${selectedSize === "XL" ? "selected" : ""}`} onClick={() => handleSizeSelection("XL")}>
                  XL
                </button>
              </div>
              <div className="button">
                <AddToCartButton
                    product={product}
                    selectedSize={selectedSize}
                />
                <div className="not_available_info">
                  <div className="circle"></div>
                  <span className="not_available">Not available in stores</span>
                </div>
              </div>

              <div className="product_description">
                <Accordion title="Description" content={product.info} />
                <Accordion title="Material" content={product.materialinfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Product;
