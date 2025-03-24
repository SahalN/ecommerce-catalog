<!-- @format -->

<template>
  <div :class="['page-wrapper', pageClass]">
    <!-- Skeleton Loader -->
    <div v-if="loading" class="skeleton">
      <div class="skeleton-image shimmer"></div>
      <div class="skeleton-details">
        <div class="skeleton-title shimmer"></div>
        <div class="skeleton-sub shimmer"></div>
        <div class="skeleton-rating shimmer"></div>
        <div class="skeleton-description shimmer"></div>
        <div class="skeleton-price shimmer"></div>
        <div class="skeleton-buttons">
          <div class="skeleton-btn shimmer"></div>
          <div class="skeleton-btn shimmer"></div>
        </div>
      </div>
    </div>

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
import axios from "axios";
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
      if (!this.product) return require("@/assets/ellipse-purple.svg");
      if (this.product.category === "men's clothing") {
        return require("@/assets/ellipse-blue.svg");
      }
      if (this.product.category === "women's clothing") {
        return require("@/assets/ellipse-purple.svg");
      }
      return require("@/assets/ellipse-purple.svg");
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
        const response = await axios.get(
          `https://fakestoreapi.com/products/${currentIndex}`
        );
        const data = response.data;
        if (
          data.category === "men's clothing" ||
          data.category === "women's clothing"
        ) {
          this.product = data;
        } else {
          this.product = null;
        }
      } catch (error) {
        console.error("Axios error:", error);
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
  --theme-color: #000000;
}

.hero,
.unavailable {
  position: relative;
  z-index: 1;
  margin: 126px auto;
  padding: 50px 56px;
  max-width: 1200px;
  display: flex;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.hero {
  flex-direction: row;
  gap: 68px;
  justify-content: center;
  align-items: center;
}

.unavailable {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.unavailable img {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
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
  width: 100%;
  box-sizing: border-box;
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
  gap: 16px;
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
  text-align: center;
  position: absolute;
  z-index: 10;
}

.unavailable .btn-next {
  min-width: 420px;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader::after {
  content: "";
  width: 50px;
  height: 50px;
  border: 6px solid #ccc;
  border-top-color: var(--theme-color, #333);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .hero,
  .unavailable {
    flex-direction: column;
    padding: 30px 24px;
    margin: 60px 20px;
    gap: 24px;
  }

  .unavailable .btn-next {
    min-width: 200px;
  }

  .unavailable {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .unavailable-content {
    padding: 20px;
  }

  .product-title {
    font-size: 24px;
  }

  .rate {
    font-size: small;
  }

  .rate > img {
    width: 10px;
  }

  .sub-desc {
    padding: 4px;
  }

  .product-category {
    font-size: 12px;
  }

  .btn-buy,
  .btn-next {
    font-size: 12px;
  }

  .product-description {
    font-size: 1rem;
  }

  .product-price {
    font-size: 1rem;
  }

  .product-img {
    width: 180px;
    height: auto;
  }

  .button-group {
    flex-direction: column;
    gap: 10px;
    font-size: 10px;
  }

  .unavailable img {
    width: 100%;
    max-width: 250px;
    height: auto;
    object-fit: contain;
  }
}

@media (max-width: 480px) {
  .unavailable {
    padding: 30px 24px;
    margin: 60px 20px;
    gap: 24px;
  }

  .unavailable img {
    width: 100%;
    max-width: 180px;
    height: auto;
    object-fit: contain;
  }
}

@media (max-width: 1024px) {
  .hero,
  .unavailable {
    flex-direction: column;
  }
}

/* Skeleton Loader */
.skeleton {
  display: flex;
  gap: 2rem;
  padding: 50px 56px;
  max-width: 1200px;
  margin: 126px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.skeleton-image {
  width: 300px;
  height: 380px;
  background: #e0e0e0;
  border-radius: 10px;
}

.skeleton-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-title,
.skeleton-sub,
.skeleton-rating,
.skeleton-description,
.skeleton-price,
.skeleton-btn {
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
}

.skeleton-title {
  width: 70%;
  height: 28px;
}

.skeleton-sub,
.skeleton-rating {
  width: 50%;
}

.skeleton-description {
  width: 100%;
  height: 60px;
}

.skeleton-price {
  width: 30%;
  height: 24px;
}

.skeleton-buttons {
  display: flex;
  gap: 1rem;
}

.skeleton-btn {
  width: 100px;
  height: 40px;
}

/* shimmer effect */
.shimmer {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Mobile Version */
@media (max-width: 768px) {
  .skeleton {
    flex-direction: column;
    padding: 20px;
    margin: 80px 20px;
  }

  .skeleton-image {
    width: 100%;
    height: 250px;
  }

  .skeleton-details {
    gap: 0.75rem;
  }

  .skeleton-title {
    width: 80%;
    height: 24px;
  }

  .skeleton-sub,
  .skeleton-rating {
    width: 60%;
  }

  .skeleton-description {
    height: 40px;
  }

  .skeleton-price {
    width: 40%;
    height: 20px;
  }

  .skeleton-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .skeleton-btn {
    width: 100%;
    height: 40px;
  }
}
</style>
