import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [pid, setpid] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setpid(data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get reviews for the product
  const getReviews = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/get-reviews/${pid}`);
      setReviews(data?.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [pid]); // Fetch reviews when product ID changes

  // Add product to cart
  const addToCart = (product) => {
    if (product.quantity > 0) {
      const existingCartItem = cart.find((item) => item._id === product._id);
      const existingCartItem_quantity = cart.filter(
        (item) => item._id === product._id
      ).length;
      if (!existingCartItem || existingCartItem_quantity < product.quantity) {
        setCart([...cart, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
        toast.success("Item added to cart");
      } else {
        toast.error("Maximum quantity reached for this item");
      }
    } else {
      toast.error("Item is out of stock");
    }
  };

  const submitReview = () => {
    navigate(`/dashboard/customer/reviews/${params.slug}`);
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${pid}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-5 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Fabric Type: {product.fabric_type}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Quantity: {product.quantity}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => addToCart(product)}
            disabled={product.quantity === 0}
          >
            ADD TO CART
          </button>
          <button className="btn btn-secondary ms-2" onClick={submitReview}>
            Submit Review
          </button>
          <div>
            {reviews.map((review, index) => (
              <div key={index}>
                <h4>Review {index + 1}</h4>
                <h6> Comments: {review.Comments} . Rating: {review.Rating}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
