"use client";
import Hero from "../components/hero/Hero";
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      axios({
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
        url: "http://10.89.84.42:8080/cart",
      })
        .then((res) => {
          setCart(res.data.cartList);
        })
        .catch((error) => {});
    };
    fetchCart();
  }, []);
  return (
    <div>
      <Hero
        title="cart"
        desc=""
        url="https://global-uploads.webflow.com/605826c62e8de87de744596e/6262973b8506afd8751ba150_April%2013%2B%20Cart%20Page%20Designs%20to%20Increase%20Your%20Store%20Conversions%20%20%20High%20Abandonment%20Rate%20.jpg"
      />
      <div>
        {cart?.map((cartItem) => (
          <section>
            <img src={cartItem.idProduct.url} alt="tra sua" width="100px" />
            <div>{cartItem.idProduct.name}</div>
            <div>{cartItem.quantity}</div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default page;
