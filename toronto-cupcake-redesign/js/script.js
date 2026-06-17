// Shared JavaScript for the static HCI prototype.
// It simulates cart updates and the checkout completion flow.

const CART_KEY = "torontoCupcakeCartCount";

function getCartCount() {
  return Number(localStorage.getItem(CART_KEY)) || 2;
}

function setCartCount(count) {
  localStorage.setItem(CART_KEY, String(Math.max(0, count)));
  updateCartBadges();
}

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll(".cart-count").forEach((badge) => {
    badge.textContent = count;
  });
}

function setupCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      setCartCount(getCartCount() + 1);
      button.classList.add("is-added");
      window.setTimeout(() => button.classList.remove("is-added"), 600);
    });
  });
}

function setupQuantityButtons() {
  document.querySelectorAll(".quantity-controls").forEach((group) => {
    const value = group.querySelector(".qty-value");
    const minus = group.querySelector(".qty-minus");
    const plus = group.querySelector(".qty-plus");
    const remove = group.querySelector(".remove-item");

    if (minus && value) {
      minus.addEventListener("click", () => {
        value.textContent = Math.max(1, Number(value.textContent) - 1);
      });
    }

    if (plus && value) {
      plus.addEventListener("click", () => {
        value.textContent = Number(value.textContent) + 1;
      });
    }

    if (remove) {
      remove.addEventListener("click", () => {
        const cartItem = group.closest(".cart-item");
        if (cartItem) {
          cartItem.remove();
          setCartCount(getCartCount() - 1);
        }
      });
    }
  });
}

function setupCheckoutRedirect() {
  const checkoutForm = document.querySelector(".checkout-form");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      window.location.href = "confirmation.html";
    });
  }
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const header = document.querySelector(".site-header");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("nav-open");
    });
  }
}

function setupPrototypeSearch() {
  document.querySelectorAll('form[role="search"]').forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      if (input) {
        input.blur();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  setupCartButtons();
  setupQuantityButtons();
  setupCheckoutRedirect();
  setupMobileMenu();
  setupPrototypeSearch();
});
