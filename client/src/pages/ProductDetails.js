import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
// Import necessary components


// Import Font Awesome CSS (if you haven't already)



const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [pid, setpid] = useState("");
  const [rate, setRating] = useState("");
  const [quantities, setQuantities] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [original, setOriginl] = useState("");
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating / 2);
    const halfStars =  rating % 2 !== 0;
    const emptyStars = 5 - fullStars - halfStars;
  
    const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="star">&#9733;</span>); // Filled star Unicode character
  }

  // Add half star if necessary
  if (halfStars === 1) {
    stars.push(<span key="half" className="star">&#9734;</span>); // Half star Unicode character
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="star">&#9734;</span>); // Empty star Unicode character
  }

  return <div className="star-rating">{stars}</div>;
};
  
  
const handleIncrement = (productId,q) => {
  const updatedQuantities = { ...quantities };
  const currentQuantity = updatedQuantities[productId] || 0;
  
  if( currentQuantity < q){
  updatedQuantities[productId] = currentQuantity + 1;
  setQuantities(updatedQuantities);
  }
};

// Function to handle decrementing quantity
const handleDecrement = (productId) => {
  const updatedQuantities = { ...quantities };
  const currentQuantity = updatedQuantities[productId] || 0;
  if (currentQuantity > 0) {
    updatedQuantities[productId] = currentQuantity - 1;
    setQuantities(updatedQuantities);
  }
};  
  
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


  const findAverage = async () =>{
    let totalRatings = 0;
    let reviewCount = 0;

// Loop through each review to calculate total ratings and count of reviews
for (const review of reviews) {
  totalRatings += Number(review.Rating);
  reviewCount++;
}

// Calculate the average rating
const averageRating = totalRatings / reviewCount;
     
    setRating(averageRating);
  }
  useEffect(() => {
    getReviews();findAverage();
  }, [pid]); // Fetch reviews when product ID changes


  useEffect(() => {
    findAverage();
  });
  // Add product to cart
  const addToCart = (product) => {
    const quantityToAdd = quantities[product._id] || 1; // Default to 1 if no quantity is specified
    if (quantityToAdd <= product.quantity) {
      product.quantity = quantityToAdd;
      
      setCart([...cart,product]); localStorage.setItem('cart',JSON.stringify([...cart,product]));
      toast.success("Item added to cart");
      navigate(`/cart`);
    } else {
      toast.error("Maximum quantity exceeded for this item");
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
          <input
                        type="number"
                        min="0"
                        max={product.quantity}
                        value={quantities[product._id] || ""}
                        onChange={(e) => setQuantities({ ...quantities, [product._id]: parseInt(e.target.value) })}
                        className="form-control"
                        style={{ width: "80px", display: "inline-block", margin: "5px 0" }}
                      />
                      <button className="plus1" onClick={() => handleIncrement(product._id,product.quantity)}>+</button>
                      <button className="minus1" onClick={() => handleDecrement(product._id)}>-</button>
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
                <h6> Comments: {review.Comments}</h6>
              </div>
              
            ))}
            
          </div>
          
        </div>
        <div>
      <h1> Rating: <StarRating rating={rate} /></h1>
    </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
