import React, { useState, useEffect } from 'react';
import styles from './AddToCartButton.module.css';
import { useAuth } from "../../contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';

interface AddToCartButtonProps {
    product: {
        product_id: number;
        selectedSize: string | null;
        isAdded: boolean;
        product_name: string;
        price: number;
        imgUrls: string[];
        color: string;
        colorBox: string;
    };
    selectedSize: string | null;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, selectedSize }) => {
    const [isAdded, setIsAdded] = useState(product.isAdded);
    const { user } = useAuth();

    useEffect(() => {
        setIsAdded(product.isAdded);
    }, [product.isAdded]);

    const ensureBasketExists = async (basketId: string) => {
        try {
            const basketResponse = await fetch(`/baskets/${basketId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ products: [] })
            });

            if (!basketResponse.ok) {
                const errorText = await basketResponse.text();
                throw new Error(`Failed to create basket: ${errorText}`);
            }

            console.log('Basket created successfully:', await basketResponse.json());
        } catch (error) {
            console.error("Error ensuring basket exists:", error);
        }
    };

    const addToBasket = async (basketId: string) => {
        try {

                const newBasketProduct = {
                    product_id: product.product_id,
                    product_name: product.product_name,
                    price: product.price,
                    color: product.color,
                    amount: 1,
                    size: selectedSize,
                };

                const response = await fetch(`/baskets/${basketId}/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newBasketProduct),
                });

                if (!response.ok) {
                    throw new Error("Failed to add product to basket");

            }
        } catch (error) {
            console.error("Error adding product to basket:", error);
        }
    };

    const handleAddToCartClick = async () => {
        let basketId: string | undefined = user?.username;

        if (!basketId) {
            basketId = localStorage.getItem('basketId') || undefined;
            if (!basketId) {
                basketId = uuidv4();
                localStorage.setItem('basketId', basketId);
            }
        }

        await ensureBasketExists(basketId);
        await addToBasket(basketId);
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 1000);
    };

    return (
        <div>
            <button className={styles.select_size_btn} style={{ display: selectedSize || isAdded ? 'none' : 'block' }}>
                Select size
            </button>
            <button className={styles.add_cart_btn} style={{ display: selectedSize && !isAdded ? 'block' : 'none' }} onClick={handleAddToCartClick}>
                Add to cart
            </button>
            <button className={styles.add_cart_btn_added} style={{ display: isAdded ? 'block' : 'none' }}>
                Added
            </button>
        </div>
    );
};

export default AddToCartButton;
