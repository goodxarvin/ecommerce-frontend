import { vi, it, expect, describe, beforeEach } from "vitest";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { render, screen, waitFor, within } from "@testing-library/react";
import axios from "axios";
import HomePage from "../HomePage";

vi.mock("axios");

function HomePageWrapper() {
  const [products, setProducts] = useState([]);
  return <HomePage products={products} setProducts={setProducts} />;
}

describe("HomePage  component", () => {
  let user;
  let productIds;

  beforeEach(() => {
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });

    user = userEvent.setup();
    productIds = [
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    ];
  });

  it("diplays the product correctlly", async () => {
    render(
      <MemoryRouter>
        <HomePageWrapper />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
  });

  it("adds items to cart with the correct quantity correcly", async () => {
    render(
      <MemoryRouter>
        <HomePageWrapper />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    expect(
      within(productContainers[0]).getByText("Add to Cart"),
    ).toBeInTheDocument();

    for (let i = 0; i <= 1; i++) {
      const addToCartButton = await within(productContainers[i]).findByTestId(
        "add-to-cart",
      );

      const quantitySelector = await within(productContainers[i]).findByRole(
        "combobox",
      );

      await user.selectOptions(quantitySelector, "9");
      expect(quantitySelector).toHaveValue("9");

      await user.click(addToCartButton);
      waitFor(() => {
        expect(axios.post).toHaveBeenNthCalledWith(i + 1, "/api/cart-items", {
          productId: productIds[i],
          quantity: Number(quantitySelector.value),
        });
      });
    }
  });
});
