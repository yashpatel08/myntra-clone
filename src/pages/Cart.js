import React, { useEffect, useState } from "react";
import "./cart.css";
import { jwtDecode } from "jwt-decode";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwttoken");

  console.log("Token:", token);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [decodedToken, setDecodedToken] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  useEffect(() => {
    if (token == null) {
      navigate("/users/login");
      return;
    }

    const decoded = jwtDecode(token);
    setDecodedToken(decoded);
  }, [token, navigate]);

  useEffect(() => {
    if (decodedToken) {
      fetchData(decodedToken._id.toString());
    }
  }, [decodedToken]);

  useEffect(() => {
    if (dataLoaded) {
      const calculatedTotalPrice = orders.reduce((total, order) => {
        return (
          total +
          order.products.reduce((productTotal, product) => {
            const productPrice = product.price || 0;
            return productTotal + parseFloat(productPrice) * product.quantity;
          }, 0)
        );
      }, 0);

      setTotalPrice(calculatedTotalPrice);
    }
  }, [dataLoaded, orders]);

  const fetchData = async (userId) => {
    try {
      if (!token) {
        let path = "/users/login";
        navigate(path);
        return;
      }
      const response = await fetch(
        `http://localhost:4000/orders/user/${userId}`
      );
      const data = await response.json();

      if (response.ok && Array.isArray(data.orders)) {
        setOrders(data.orders);

        setAddress(data.orders[0]?.address || "");

        const uniqueProductIds = Array.from(
          new Set(
            data.orders.flatMap((order) =>
              order.products.map((product) => product.productId)
            )
          )
        );
        uniqueProductIds.forEach((productId) => fetchProduct(productId));

        setDataLoaded(true);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const productData = await response.json();
      console.log("Fetched product:", productData);

      if (Object.keys(productData).length > 0) {
        setProducts((prevProducts) => ({
          ...prevProducts,
          [productId]: productData.product,
        }));
      } else {
        console.error("Empty product data received");
      }
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OdukbSDxMHH7tt0LcUi5DGV8WcTkJtCXEQL7R5XIES7EjG63L979jKDw2EK4u21Sr9TaEXDcYzE68c9yvkfQsaf00MQU7CnUD"
    );

    const body = {
      products: orders.flatMap((order) =>
        order.products.map((product) => ({
          ...product,
          name: products[product.productId]?.name,
          quantity: product.quantity,
        }))
      ),
      totalPrice,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    console.log("Request Body:", body);

    const response = await fetch(
      "http://localhost:4000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const handleRemoveProduct = async (orderId, productId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/orders/${orderId}/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Update state or fetch data again if needed
        console.log("Product removed successfully");
      } else {
        console.error("Failed to remove product:", response);
      }
    } catch (error) {
      console.error("Error removing product:", error.message);
    }
  };

  const handleRemoveButtonClick = async (orderId, productId) => {
    await handleRemoveProduct(orderId, productId);
  };

  const cutDescription = (description, wordLimit) => {
    if (typeof description !== "string") return "";
    const words = description.split(" ");
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="cart">
      <div className="product-card">
        <div className="cart-items">
          {orders.map((order) => (
            <div className="product-container" key={order._id}>
              {order.products.map((productInOrder) => (
                <div className="cproduct" id={productInOrder.productId} key={productInOrder.productId} >
                  {products[productInOrder.productId] && (
                    <div>
                      <img
                        className="product-img"
                        src={products[productInOrder.productId].imageUrl}
                        alt={order.name}
                      />
                      <p>{products[productInOrder.productId].name}</p>
                      <p className="product-description">
                        {cutDescription(
                          products[productInOrder.productId].description,
                          2
                        )}
                      </p>
                      <p>{order.name}</p>
                      <div className="icons">
                        <p className="cprice">Rs. {productInOrder.price}</p>
                        <p className="quantity">
                          Qty {productInOrder.quantity}
                        </p>
                      </div>
                      <p>Size - {order.size}</p>
                      <button className="cart-rem"
                        onClick={() =>
                          handleRemoveButtonClick(
                            order._id,
                            productInOrder.productId
                          )
                        }
                      >
                     
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="border"></p>
      <div className="flex">
        <div className="checkout-section">
          <div className="total-price">
            <p>Total Price: Rs. {totalPrice.toFixed(2)}</p>
            <p>Address : {address}</p>
          </div>
          <div>
            <div className="payment-section">
              <button className={`pay-btn selected`} onClick={makePayment}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
