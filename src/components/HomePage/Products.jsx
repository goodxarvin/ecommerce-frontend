import { useState } from "react";
import axios from "axios";
import getStandardPrice from "../../utils/money";

export default function Products({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const quantityChangeHandler = (event) => {
    setQuantity(Number(event.target.value));
  };
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: quantity,
    });
    const cartChannel = new BroadcastChannel("cart_channel");
    await cartChannel.postMessage("CART_UPDATED");
    cartChannel.close();
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };
  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          data-testid="product-image"
          className="product-image"
          src={`${product.image}`}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid="rating-image"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {getStandardPrice(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={quantityChangeHandler}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div style={{ opacity: addedToCart ? 1 : 0 }} className="added-to-cart">
        <img src="src/assets/images/icons/checkmark.png" />
        Added
      </div>

      <button
        data-testid="add-to-cart"
        className="add-to-cart-button button-primary"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
