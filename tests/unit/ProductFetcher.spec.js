/** @format */

import { shallowMount } from "@vue/test-utils";
import ProductComponent from "../../src/components/ProductViewer.vue";
import axios from "axios";

jest.mock("axios");

describe("ProductComponent.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProductComponent);
  });

  it("fetches a product and updates state correctly", async () => {
    // Mock API response
    axios.get.mockResolvedValue({
      data: {
        category: "men's clothing",
        title: "Sample Product",
        price: 19.99,
        rating: { rate: 4.5 },
        image: "sample.jpg",
      },
    });

    await wrapper.vm.nextProduct(); // Call method

    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.product).not.toBeNull();
    expect(wrapper.vm.product.category).toBe("men's clothing");
  });

  it("sets product to null if category is not valid", async () => {
    axios.get.mockResolvedValue({
      data: { category: "electronics" },
    });

    await wrapper.vm.nextProduct();

    expect(wrapper.vm.product).toBeNull();
  });

  it("increments index correctly", async () => {
    wrapper.vm.index = 19;
    axios.get.mockResolvedValue({
      data: { category: "men's clothing" },
    });

    await wrapper.vm.nextProduct();

    expect(wrapper.vm.index).toBe(20);
  });

  it("resets index to 1 after reaching 20", async () => {
    wrapper.vm.index = 20;
    axios.get.mockResolvedValue({
      data: { category: "men's clothing" },
    });

    await wrapper.vm.nextProduct();

    expect(wrapper.vm.index).toBe(1);
  });
});
