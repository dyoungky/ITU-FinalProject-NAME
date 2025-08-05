import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import "./Cart.css";

interface CartItem {
  product_id: number;
  amount: number;
  price: number;
  size: string | null;
}

interface Product extends CartItem {
  product_name: string;
  imgUrls: string[];
}

function Cart() {
  const [items, setBasket] = useState<Product[]>([]);
  const { user } = useAuth();
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let basketId: string | null = user?.username || localStorage.getItem("basketId");

        if (!basketId) {
          throw new Error("No basket ID found for anonymous user");
        }

        const basketResponse = await fetch(`/baskets/${basketId}/products`);

        if (!basketResponse.ok) {
          throw new Error("Failed to fetch basket");
        }
        const basketData = await basketResponse.json();
        const productResponse = await fetch("/products");
        if (!productResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productResponse.json();

        const updatedItems = basketData.products.map((cartItem: CartItem) => {
          const productDetails = productsData.find((product: Product) => product.product_id === cartItem.product_id);
          return { ...cartItem, product_name: productDetails.product_name, imgUrls: productDetails.imgUrls };
        });

        setBasket(updatedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [user]);

  const updateAmount = async (product_id: number, newAmount: number, size: string | null) => {
    if (newAmount < 0) return;

    try {
      let basketId: string | null = user?.username || localStorage.getItem("basketId");

      if (!basketId) {
        throw new Error("No basket ID found for anonymous user");
      }

      const response = await fetch(`/baskets/${basketId}/products/${product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: newAmount, size }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update cart on the server with status: ${response.status}`);
      }

      setBasket((prevItems) => prevItems.map((item) => (item.product_id === product_id && item.size === size ? { ...item, amount: newAmount } : item)));
    } catch (error) {
      console.error("Error updating cart on the server:", error);
    }
  };

  const deleteItem = async (product_id: number, size: string | null) => {
    try {
      let basketId: string | null = user?.username || localStorage.getItem("basketId");

      if (!basketId) {
        throw new Error("No basket ID found for anonymous user");
      }

      const response = await fetch(`/baskets/${basketId}/products/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ size }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete the product from the server with status: ${response.status}`);
      }

      setBasket((prevItems) => prevItems.filter((item) => item.product_id !== product_id || item.size !== size));
    } catch (error) {
      console.error("Error deleting product from the server:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      for (const item of items) {
        await deleteItem(item.product_id, item.size);
      }
      setMessage("Checkout complete");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.amount, 0);
  };

  const handleContinueShopping = () => {
    navigate(-1);
  };

  return (
    <div className="carousel-container">
      <div className="sub-title">Cart</div>
      <div className="" style={{ marginTop: "20px" }}>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {items.length === 0 && !message && <div className="alert alert-info mt-3">Your cart is empty</div>}
        <Row className="mt-3">
          {items.map((item, index) => (
            <Col key={index} sm={12} md={12} lg={12}>
              <div className="product-summary-card d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <Link to={`/products/${item.product_id}`}>
                    <img src={item.imgUrls[0]} alt={item.product_name} style={{ width: "120px", height: "auto", marginRight: "20px" }} />
                  </Link>
                  <div className="cart-product-info">
                    <h5>{item.product_name}</h5>
                    <p>Size: {item.size}</p>
                    <div className="quantity-control d-flex align-items-center">
                      <Button variant="outline-secondary" size="sm" onClick={() => updateAmount(item.product_id, item.amount - 1, item.size)}>
                        -
                      </Button>
                      <input type="text" value={item.amount} readOnly className="text-center" />
                      <Button variant="outline-secondary" size="sm" onClick={() => updateAmount(item.product_id, item.amount + 1, item.size)}>
                        +
                      </Button>
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => deleteItem(item.product_id, item.size)}>
                      <BsTrash />
                    </Button>
                  </div>
                </div>
                <span className="price">{item.price * item.amount} DKK</span>
              </div>
            </Col>
          ))}
        </Row>
        {items.length > 0 && (
          <div className="cart-bottom-section">
            <div className="total-section">
              <p>
                Congratulations! You get <span>FREE delivery</span> 🚚
              </p>
              <h3 className="total-price">
                <span>Total:</span> {calculateTotal()} DKK
              </h3>
              <div className="cart-btn-section">
                <Button className="check-out-btn" variant="outline-dark" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button className="continue-shopping-btn" variant="outline-dark" size="lg" onClick={handleContinueShopping}>
                  Continue shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
