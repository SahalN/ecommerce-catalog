<!-- @format -->

<template>
  <div :class="['page-wrapper', pageClass]">
    <div v-if="loading" class="loader"></div>

    <div v-else-if="product" class="hero">
      <div class="image">
        <img :src="product.image" alt="product image" class="product-img" />
      </div>
      <div>
        <h1 :class="['product-title', themeClass]">{{ product.title }}</h1>
        <div class="sub-desc">
          <div class="product-category">
            <div>
              <p aria-label="category">
                {{ product.category }}
              </p>
            </div>
          </div>
          <div class="product-rating">
            <div class="rate">
              <p aria-label="rating">{{ product.rating.rate }}/5</p>
              <template v-for="n in Math.round(product.rating.rate)">
                <img
                  :key="'filled-' + n"
                  :src="ellipseFilled"
                  class="class"
                  aria-hidden="true" />
              </template>
              <template v-for="n in 5 - Math.round(product.rating.rate)">
                <img
                  :key="'empty-' + n"
                  :src="ellipseEmpty"
                  class="class"
                  aria-hidden="true" />
              </template>
            </div>
          </div>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <p :class="['product-price', themeClass]">${{ product.price }}</p>
        <div class="button-group">
          <button class="btn-buy" :class="themeClass">Buy Now</button>
          <button
            :disabled="loading"
            @click="nextProduct"
            class="btn-next"
            :class="themeClass">
            Next Product
          </button>
        </div>
      </div>
    </div>

    <div v-else class="unavailable">
      <img src="../assets/sad-face.png" alt="sad face" class="sad-face" />
      <div class="unavailable-content">
        <h1 class="unavailable-text">This product is unavailable to show</h1>
        <button :disabled="loading" @click="nextProduct" class="btn-next">
          Next Product
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 1,
      product: null,
      loading: false,
    };
  },
  computed: {
    pageClass() {
      if (this.loading) return "";
      if (!this.product) return "unavailable-section";
      if (this.product.category === "men's clothing") return "men-section";
      if (this.product.category === "women's clothing") return "women-section";
      return "unavailable-section";
    },
    themeClass() {
      if (!this.product) return "";
      if (this.product.category === "men's clothing") return "men-theme";
      if (this.product.category === "women's clothing") return "women-theme";
      return "";
    },
    ellipseFilled() {
      if (!this.product) return require("@/assets/ellipse-purple.svg"); // default jika product belum ada
      if (this.product.category === "men's clothing") {
        return require("@/assets/ellipse-blue.svg");
      }
      if (this.product.category === "women's clothing") {
        return require("@/assets/ellipse-purple.svg");
      }
      return require("@/assets/ellipse-purple.svg"); // fallback default
    },
    ellipseEmpty() {
      if (!this.product) return require("@/assets/white-ellipse-purple.svg");
      if (this.product.category === "men's clothing") {
        return require("@/assets/white-ellipse-blue.svg");
      }
      if (this.product.category === "women's clothing") {
        return require("@/assets/white-ellipse-purple.svg");
      }
      return require("@/assets/white-ellipse-purple.svg");
    },
  },
  methods: {
    async nextProduct() {
      this.loading = true;
      const currentIndex = this.index;
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${currentIndex}`
        );
        const data = await response.json();
        if (
          data.category === "men's clothing" ||
          data.category === "women's clothing"
        ) {
          this.product = data;
        } else {
          this.product = null;
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        this.loading = false;
        this.index = this.index >= 20 ? 1 : this.index + 1;
      }
    },
  },
  mounted() {
    this.nextProduct();
  },
};
</script>

<style scoped>
.page-wrapper {
  position: static;
  min-height: 100vh;
  background: #fff;
  overflow: hidden;
}

.page-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  z-index: 0;
  background: transparent;
  pointer-events: none;
}

.men-section::before {
  background: #d6e6ff;
  background-image: url("@/assets/bg-pattern-men.svg");
}

.women-section::before {
  background: #fde2ff;
  background-image: url("@/assets/bg-pattern-woman.svg");
}

.unavailable-section::before {
  background: #d8d7d7;
}

.men-theme {
  --theme-color: var(--men-theme-color);
}

.women-theme {
  --theme-color: var(--women-theme-color);
}

.unavailable-section {
  --theme-color: #000000; /* hitam default */
}

.hero,
.unavailable {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 50px 56px;
  max-width: 1200px;
}

.hero {
  z-index: 1;
  display: flex;
  flex-direction: row;
  gap: 68px;
  margin: 126px 150px;
  padding: 50px 56px;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.unavailable {
  display: flex;
  flex-direction: column;
  margin: 126px 150px;
  padding: 50px 56px;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.sad-face {
  flex-shrink: 0;
}

.product-img {
  width: 300px;
  height: 380px;
}

.rate {
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.product-title {
  font-size: 28px;
  font-weight: 600;
  font-family: Inter;
  color: var(--theme-color);

  margin: 0;
}

.sub-desc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 17px 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

.product-category {
  color: #3f3f3f;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
}

.product-rating {
  color: #3f3f3f;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.product-description {
  margin: 0;
  padding: 1rem 0;
  color: #1e1e1e;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-family: Inter;
}

.product-price {
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  color: var(--theme-color);
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-family: Inter;
  padding: 15px 0;
  margin: 0;
}

.btn-buy,
.btn-next {
  padding: 12px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  width: 100%; /* ini yang bikin tombol full width */
  box-sizing: border-box; /* biar padding tidak melebihi parent */
}

.btn-buy {
  background-color: var(--theme-color);
  color: #fff;
  border: none;
}

.btn-next {
  border: 3px solid var(--theme-color);
  color: var(--theme-color);
  background: transparent;
}

.button-group {
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 19px;
  width: 100%;
}

.unavailable-text {
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.unavailable-content {
  position: absolute;
  z-index: 10;
}
</style>
