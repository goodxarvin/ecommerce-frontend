import { vi, it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "../Products";
import axios from "axios";

/* 
these are integration tests which used to test 
multiple sections of a code like component.
*/

vi.mock("axios");

describe("product component", () => {
  let product;
  let user;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    user = userEvent.setup();
  });

  it("diplays the product details correctly", () => {
    render(<Products product={product} />);
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("rating-image")).toHaveAttribute(
      "src",
      `images/ratings/rating-${product.rating.stars * 10}.png`,
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    render(<Products product={product} />);

    const addToCartButton = screen.getByTestId("add-to-cart");

    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
  });

  it("selects different quantities", async () => {
    render(<Products product={product} />);

    const addToCartButton = screen.getByTestId("add-to-cart");
    const quantitySelector = await screen.findByRole("combobox");
    expect(quantitySelector).toHaveValue("1");

    await user.selectOptions(quantitySelector, "10");
    expect(quantitySelector).toHaveValue("10");
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 10,
    });
  });
});
