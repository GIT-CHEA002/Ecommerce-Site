import { it, describe, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Product from "./Product";
vi.mock("axios");
describe("Product", () => {
  it("display product detail correctly", () => {
    const loadCart = vi.fn();
    render(
      <Product
        product={{
          id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
          image: "images/products/athletic-skateboard-shoes-gray.jpg",
          name: "Athletic Skateboard Shoes - Gray",
          rating: {
            stars: 4,
            count: 89,
          },
          priceCents: 3390,
          keywords: ["shoes", "running shoes", "footwear"],
        }}
        loadCart={loadCart}
      />,
    );
    expect(
      screen.getByText("Athletic Skateboard Shoes - Gray"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-skateboard-shoes-gray.jpg",
    );
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-40.png",
    );
    expect(screen.getByText("89")).toBeInTheDocument();
  });
  it("user interaction correctly", async () => {
    const loadCart = vi.fn();
    render(
      <Product
        product={{
          id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
          image: "images/products/athletic-skateboard-shoes-gray.jpg",
          name: "Athletic Skateboard Shoes - Gray",
          rating: {
            stars: 4,
            count: 89,
          },
          priceCents: 3390,
          keywords: ["shoes", "running shoes", "footwear"],
        }}
        loadCart={loadCart}
      />,
    );
    const user = userEvent.setup();
    const addToCart = screen.getByTestId("add-to-cart");
    await user.click(addToCart);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
