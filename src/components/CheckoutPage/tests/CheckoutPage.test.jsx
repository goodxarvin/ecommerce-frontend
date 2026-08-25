import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import ChechoutPage from "../CheckoutPage";

function CheckoutWrapper({ cart }) {
  const getCartItemsData = vi.fn();
  const [testCart, setTestCart] = useState(cart);
  return (
    <MemoryRouter>
      <ChechoutPage
        getCartItemsData={getCartItemsData}
        cart={testCart}
        setCart={setTestCart}
      />
    </MemoryRouter>
  );
}

const mockNavigate = vi.fn();

vi.mock("axios");
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("PaymentSummary component", () => {
  let cart;
  let user;

  beforeAll(() => {});
  beforeEach(() => {
    axios.get.mockImplementation((urlPath) => {
      if (urlPath === "/api/payment-summary") {
        return {
          data: {
            totalItems: 2,
            productCostCents: 4298,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 4298,
            taxCents: 430,
            totalCostCents: 4728,
          },
        };
      }

      if (urlPath === "/api/delivery-options?expand=estimatedDeliveryTime") {
        return {
          data: [
            {
              id: "1",
              deliveryDays: 7,
              priceCents: 0,
              createdAt: "2026-08-23T18:17:09.150Z",
              updatedAt: "2026-08-23T18:17:09.150Z",
              estimatedDeliveryTimeMs: 1788294402035,
            },
            {
              id: "2",
              deliveryDays: 3,
              priceCents: 499,
              createdAt: "2026-08-23T18:17:09.151Z",
              updatedAt: "2026-08-23T18:17:09.151Z",
              estimatedDeliveryTimeMs: 1787948802035,
            },
            {
              id: "3",
              deliveryDays: 1,
              priceCents: 999,
              createdAt: "2026-08-23T18:17:09.152Z",
              updatedAt: "2026-08-23T18:17:09.152Z",
              estimatedDeliveryTimeMs: 1787776002035,
            },
          ],
        };
      }
    });

    cart = [
      {
        id: 7,
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
        deliveryOptionId: "1",
        createdAt: "2026-08-23T19:36:38.919Z",
        updatedAt: "2026-08-23T19:58:31.956Z",
        product: {
          keywords: ["tshirts", "apparel", "mens"],
          id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
          name: "Adults Plain Cotton T-Shirt - 2 Pack",
          rating: {
            stars: 4.5,
            count: 56,
          },
          priceCents: 799,
          createdAt: "2026-08-23T18:17:09.152Z",
          updatedAt: "2026-08-23T18:17:09.152Z",
        },
      },
      {
        id: 8,
        productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        quantity: 1,
        deliveryOptionId: "1",
        createdAt: "2026-08-23T23:13:59.464Z",
        updatedAt: "2026-08-23T23:13:59.464Z",
        product: {
          keywords: ["kitchen", "cookware"],
          id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
          image: "images/products/3-piece-cooking-set.jpg",
          name: "3 Piece Non-Stick, Black Cooking Pot Set",
          rating: {
            stars: 4.5,
            count: 175,
          },
          priceCents: 3499,
          createdAt: "2026-08-23T18:17:09.155Z",
          updatedAt: "2026-08-23T18:17:09.155Z",
        },
      },
    ];

    user = userEvent.setup();
  });

  it("checks the price amounts", async () => {
    render(<CheckoutWrapper cart={cart} />);

    const PaymentSummaryComponent = (
      await screen.findByText("Payment Summary")
    ).closest(".payment-summary");

    expect(
      within(PaymentSummaryComponent).getByText("$4.30"),
    ).toBeInTheDocument();

    expect(
      within(PaymentSummaryComponent).getByText("$47.28"),
    ).toBeInTheDocument();

    expect(
      within(PaymentSummaryComponent).getAllByText("$42.98")[0],
    ).toBeInTheDocument();

    expect(
      within(PaymentSummaryComponent).getByText("$0.00"),
    ).toBeInTheDocument();
  });

  it("places the order", async () => {
    render(<CheckoutWrapper cart={cart} />);

    const PaymentSummaryComponent =
      await screen.findByTestId("payment-summary");

    const orderPlaceButton = within(PaymentSummaryComponent).getByRole(
      "button",
      {
        name: /place your order/i,
      },
    );

    await user.click(orderPlaceButton);
    await waitFor(() => {
      expect(axios.post).toBeCalledWith("/api/orders");
    });

    expect(mockNavigate).toBeCalledWith("/orders");
  });
});
