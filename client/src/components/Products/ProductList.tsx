import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductList.css";
import styles from "./ProductList.module.css";
import { useAuth } from "../../contexts/AuthContext";
import FilterPanel from "../FilterPanel/FilterPanel";
import AddToCartButton from "../Basket/AddToCartButton";

interface Product {
  product_id: number;
  product_name: string;
  imgUrls: string[];
  color: string;
  price: number;
  isNew: boolean;
  type: string;
  colorBox: string;
  gender: string;
  materials: string[];
  selectedSize: string | null;
  isAdded: boolean;
}

interface ProductListProps {
  filter: string;
}

const ProductList: React.FC<ProductListProps> = ({ filter }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const allProducts: Product[] = await response.json();
        const productsWithLowercaseColor = allProducts.map((product) => ({
          ...product,
          color: product.color.toLowerCase(),
        }));

        setProducts(productsWithLowercaseColor);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      let filtered: Product[];

      if (filter.toLowerCase() === "women") {
        filtered = products.filter((product) => product.gender === "women");
      } else if (filter.toLowerCase() === "men") {
        filtered = products.filter((product) => product.gender === "men");
      } else if (filter.toLowerCase() === "new-arrivals") {
        filtered = products.filter((product) => product.isNew === true);
      } else if (filter.toLowerCase() === "all") {
        filtered = products;
      } else {
        filtered = products.filter((product) => product.type.toLowerCase() === filter.toLowerCase());
      }

      setFilteredProducts(filtered);
    };

    applyFilter();
  }, [filter, products]);

  const handleSizeSelection = (productId: number, size: string) => {
    setFilteredProducts((prevFilteredProducts) => prevFilteredProducts.map((product) => (product.product_id === productId ? { ...product, selectedSize: size } : product)));
  };

  const postProduct = async (product: Product) => {
    try {
      if (user) {
        const newBasketProduct = {
          product_id: product.product_id,
          product_name: product.product_name,
          price: product.price,
          type: product.type,
          color: product.color,
          amount: 1,
          size: product.selectedSize,
        };

        const response = await fetch(`/baskets/${user.username}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBasketProduct),
        });

        if (!response.ok) {
          throw new Error("Failed to add product to basket");
        }
      }
    } catch (error) {
      console.error("Error adding product to basket:", error);
    }
  };

  const handleAddToCart = async (productId: number) => {
    const product = filteredProducts.find((product) => product.product_id === productId);
    if (product) {
      await postProduct(product);
      setFilteredProducts((prevFilteredProducts) => prevFilteredProducts.map((product) => (product.product_id === productId ? { ...product, isAdded: true } : product)));

      setTimeout(() => {
        setFilteredProducts((prevFilteredProducts) => prevFilteredProducts.map((product) => (product.product_id === productId ? { ...product, isAdded: false, selectedSize: null } : product)));
      }, 1000);
    }
  };

  const handleFilterChange = (filters: { type: string[]; color: string[]; material: string[] }) => {
    const { type, color, material } = filters;
    const filtered = products.filter((product) => {
      const typeMatch = type.length === 0 || type.includes(product.type);
      const colorMatch = color.length === 0 || color.includes(product.color);
      const materialMatch = material.length === 0 || material.some((m) => product.materials.includes(m));
      const isNewMatch = filter.toLowerCase() === "new-arrivals" ? product.isNew === true : true;
      return (
        typeMatch &&
        colorMatch &&
        materialMatch &&
        isNewMatch &&
        ((filter !== "Women" && filter !== "Men") || (filter === "Women" && product.gender === "women") || (filter === "Men" && product.gender === "men"))
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="page-container">
      <div className="sub-title">{filter === "Women" ? "Women" : filter === "Men" ? "Men" : filter === "new-arrivals" ? "New Arrivals" : "All"}</div>

      <Row>
        <Col sm={12}>
          <FilterPanel onFilterChange={handleFilterChange} />
        </Col>
        <div>
          <Col sm={12}>
            <Row>
              {filteredProducts.map((product) => (
                <Col key={product.product_id} sm={6} md={4} lg={3} className="product">
                  <Link key={product.product_id} to={`/products/${product.product_id}`}>
                    <div className="product-img">
                      <img src={`${product.imgUrls[0]}`} alt={product.product_name} />
                      {product.isNew && <span className="is-new">NEW</span>}
                    </div>
                    <div className="product-contents">
                      <p className="product-price">{product.price} DKK</p>
                      <p className="product-name">{product.product_name}</p>
                      <span className="color-box" style={{ backgroundColor: product.colorBox }}></span>
                    </div>
                  </Link>
                  <div className={styles.size_select}>
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button key={size} className={`${styles.size_btn} ${product.selectedSize === size ? styles.selected : ""}`} onClick={() => handleSizeSelection(product.product_id, size)}>
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="button">
                    <AddToCartButton
                        product={product}
                        selectedSize={product.selectedSize}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default ProductList;
