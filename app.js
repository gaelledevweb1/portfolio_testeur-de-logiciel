 // ═══════════════════════════════════
    //  DONNÉES PRODUITS
    // ═══════════════════════════════════
    const PRODUCTS = [
      { id: 1, name: "Pommes Gala",     emoji: "🍎", category: "fruits",   price: 2.49, promo: false, stock: true  },
      { id: 2, name: "Bananes bio",     emoji: "🍌", category: "fruits",   price: 1.89, promo: true,  originalPrice: 2.29, stock: true  },
      { id: 3, name: "Fraises 500g",    emoji: "🍓", category: "fruits",   price: 3.99, promo: false, stock: true  },
      { id: 4, name: "Oranges filet",   emoji: "🍊", category: "fruits",   price: 2.79, promo: false, stock: false },
      { id: 5, name: "Courgettes",      emoji: "🥒", category: "légumes",  price: 1.49, promo: false, stock: true  },
      { id: 6, name: "Tomates cerises", emoji: "🍅", category: "légumes",  price: 2.99, promo: true,  originalPrice: 3.49, stock: true  },
      { id: 7, name: "Brocoli",         emoji: "🥦", category: "légumes",  price: 1.99, promo: false, stock: true  },
      { id: 8, name: "Carottes 1kg",    emoji: "🥕", category: "légumes",  price: 1.29, promo: false, stock: false },
      { id: 9, name: "Pâtes rigatoni",  emoji: "🍝", category: "épicerie", price: 1.59, promo: false, stock: true  },
      { id: 10, name: "Huile d'olive",  emoji: "🫙", category: "épicerie", price: 6.49, promo: true,  originalPrice: 7.99, stock: true  },
      { id: 11, name: "Riz basmati",    emoji: "🍚", category: "épicerie", price: 2.19, promo: false, stock: true  },
      { id: 12, name: "Miel artisanal", emoji: "🍯", category: "épicerie", price: 7.90, promo: false, stock: true  },
    ];

    const PROMO_CODES = {
      "FRESH10": 10,  // 10% de remise
      "SAVE20":  20,  // 20% de remise
      "BIENVENUE": 15 // 15% de remise
    };

    // ═══════════════════════════════════
    //  ÉTAT
    // ═══════════════════════════════════
    let cart = [];        // [{ id, name, emoji, price, qty }]
    let appliedPromo = null; // { code, percent }
    let currentFilter = "all";
    let currentSearch = "";

    // ═══════════════════════════════════
    //  RENDU PRODUITS
    // ═══════════════════════════════════
    function renderProducts() {
      const grid = document.getElementById("products-grid");
      const filtered = PRODUCTS.filter(p => {
        const matchCat = currentFilter === "all" || p.category === currentFilter;
        const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCat && matchSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state-products" data-testid="products-empty">Aucun produit trouvé 😕</div>`;
        return;
      }

      grid.innerHTML = filtered.map(p => {
        const cartItem = cart.find(c => c.id === p.id);
        const qty = cartItem ? cartItem.qty : 0;
        return `
          <article class="product-card"
            data-testid="product-card"
            data-product-id="${p.id}"
            data-category="${p.category}"
            data-out-of-stock="${!p.stock}"
            role="listitem"
            aria-label="${p.name}">
            <div class="product-img">
              <span role="img" aria-label="${p.name}">${p.emoji}</span>
              ${!p.stock ? `<span class="out-of-stock-badge" data-testid="out-of-stock-badge">Rupture</span>` : ""}
              ${p.promo ? `<span class="promo-badge" data-testid="promo-badge">Promo</span>` : ""}
            </div>
            <div class="product-info">
              <div class="product-name" data-testid="product-name">${p.name}</div>
              <div class="product-category" data-testid="product-category">${p.category}</div>
              <div class="product-price-row">
                <span class="product-price" data-testid="product-price">${p.price.toFixed(2).replace(".", ",")} €</span>
                ${p.promo ? `<span class="product-price-original" data-testid="product-price-original">${p.originalPrice.toFixed(2).replace(".", ",")} €</span>` : ""}
              </div>
            </div>
            <div class="qty-control">
              <button class="qty-btn" type="button"
                data-testid="qty-decrease"
                data-id="${p.id}"
                aria-label="Diminuer la quantité de ${p.name}"
                ${!p.stock ? "disabled" : ""}>−</button>
              <span class="qty-display" data-testid="qty-display" data-id="${p.id}">${qty}</span>
              <button class="qty-btn" type="button"
                data-testid="qty-increase"
                data-id="${p.id}"
                aria-label="Augmenter la quantité de ${p.name}"
                ${!p.stock ? "disabled" : ""}>+</button>
              <button class="add-btn ${qty > 0 ? "added" : ""}" type="button"
                data-testid="add-to-cart-btn"
                data-id="${p.id}"
                aria-label="Ajouter ${p.name} au panier"
                ${!p.stock ? "disabled" : ""}>
                ${qty > 0 ? "✓ Ajouté" : "Ajouter"}
              </button>
            </div>
          </article>`;
      }).join("");
    }

    // ═══════════════════════════════════
    //  RENDU PANIER
    // ═══════════════════════════════════
    function renderCart() {
      const list = document.getElementById("cart-items-list");
      const empty = document.getElementById("cart-empty");
      const summary = document.getElementById("cart-summary");
      const badge = document.getElementById("cart-badge");
      const countEl = document.getElementById("cart-item-count");

      const totalQty = cart.reduce((s, i) => s + i.qty, 0);
      badge.textContent = totalQty;
      countEl.textContent = `${cart.length} article(s)`;

      if (cart.length === 0) {
        empty.style.display = "block";
        list.innerHTML = "";
        summary.style.display = "none";
        document.getElementById("checkout-btn").disabled = true;
        document.getElementById("clear-cart-btn").disabled = true;
        return;
      }

      empty.style.display = "none";
      summary.style.display = "block";
      document.getElementById("checkout-btn").disabled = false;
      document.getElementById("clear-cart-btn").disabled = false;

      list.innerHTML = cart.map(item => `
        <li class="cart-item" data-testid="cart-item" data-id="${item.id}" aria-label="${item.name} dans le panier">
          <span class="cart-item-emoji" aria-hidden="true">${item.emoji}</span>
          <div class="cart-item-details">
            <div class="cart-item-name" data-testid="cart-item-name">${item.name}</div>
            <div class="cart-item-price" data-testid="cart-item-price">${(item.price * item.qty).toFixed(2).replace(".", ",")} €</div>
          </div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn" type="button" data-testid="cart-qty-decrease" data-id="${item.id}" aria-label="Diminuer ${item.name}">−</button>
            <span class="cart-item-qty" data-testid="cart-item-qty" data-id="${item.id}">${item.qty}</span>
            <button class="cart-qty-btn" type="button" data-testid="cart-qty-increase" data-id="${item.id}" aria-label="Augmenter ${item.name}">+</button>
          </div>
          <button class="remove-btn" type="button" data-testid="remove-item-btn" data-id="${item.id}" aria-label="Retirer ${item.name} du panier">✕</button>
        </li>`).join("");

      updateTotals();
    }

    function updateTotals() {
      const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const shipping = subtotal >= 30 ? 0 : 2.99;
      let discount = 0;

      if (appliedPromo) {
        discount = subtotal * (appliedPromo.percent / 100);
      }

      const total = subtotal - discount + shipping;

      document.getElementById("subtotal").textContent = `${subtotal.toFixed(2).replace(".", ",")} €`;
      document.getElementById("shipping-cost").textContent = shipping === 0 ? "Gratuit 🎉" : `${shipping.toFixed(2).replace(".", ",")} €`;
      document.getElementById("cart-total").textContent = `${total.toFixed(2).replace(".", ",")} €`;

      const discountRow = document.getElementById("discount-row");
      if (discount > 0) {
        discountRow.style.display = "flex";
        document.getElementById("discount-amount").textContent = `-${discount.toFixed(2).replace(".", ",")} €`;
      } else {
        discountRow.style.display = "none";
      }
    }

    // ═══════════════════════════════════
    //  ACTIONS PANIER
    // ═══════════════════════════════════
    function addToCart(productId) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product || !product.stock) return;
      const existing = cart.find(c => c.id === productId);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ id: product.id, name: product.name, emoji: product.emoji, price: product.price, qty: 1 });
      }
      bumpBadge();
      showToast(`${product.emoji} ${product.name} ajouté au panier !`);
      renderCart();
      renderProducts();
    }

    function changeQtyProduct(productId, delta) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product || !product.stock) return;
      const existing = cart.find(c => c.id === productId);
      if (!existing && delta > 0) {
        cart.push({ id: product.id, name: product.name, emoji: product.emoji, price: product.price, qty: 1 });
      } else if (existing) {
        existing.qty = Math.max(0, existing.qty + delta);
        if (existing.qty === 0) cart = cart.filter(c => c.id !== productId);
      }
      renderCart();
      renderProducts();
    }

    function changeQtyCart(productId, delta) {
      const item = cart.find(c => c.id === productId);
      if (!item) return;
      item.qty = Math.max(1, item.qty + delta);
      renderCart();
      renderProducts();
    }

    function removeFromCart(productId) {
      const item = cart.find(c => c.id === productId);
      if (item) showToast(`${item.emoji} ${item.name} retiré du panier.`);
      cart = cart.filter(c => c.id !== productId);
      renderCart();
      renderProducts();
    }

    function clearCart() {
      if (cart.length === 0) return;
      cart = [];
      appliedPromo = null;
      document.getElementById("promo-input").value = "";
      document.getElementById("promo-message").textContent = "";
      document.getElementById("promo-message").className = "";
      renderCart();
      renderProducts();
      showToast("🗑️ Panier vidé.");
    }

    // ═══════════════════════════════════
    //  CODE PROMO
    // ═══════════════════════════════════
    function applyPromo() {
      const code = document.getElementById("promo-input").value.trim().toUpperCase();
      const msg = document.getElementById("promo-message");

      if (!code) {
        msg.textContent = "Veuillez entrer un code promo.";
        msg.className = "error";
        return;
      }

      if (PROMO_CODES[code]) {
        appliedPromo = { code, percent: PROMO_CODES[code] };
        msg.textContent = `✅ Code "${code}" appliqué ! −${PROMO_CODES[code]}% de réduction.`;
        msg.className = "success";
        updateTotals();
      } else {
        appliedPromo = null;
        msg.textContent = `❌ Code "${code}" invalide.`;
        msg.className = "error";
        updateTotals();
      }
    }

    // ═══════════════════════════════════
    //  COMMANDE
    // ═══════════════════════════════════
    function checkout() {
      if (cart.length === 0) return;
      const orderNum = "FM-" + Date.now().toString().slice(-6);
      document.getElementById("order-number").textContent = `Commande n° ${orderNum}`;
      document.getElementById("order-modal").classList.add("open");
    }

    function closeModal() {
      document.getElementById("order-modal").classList.remove("open");
      clearCart();
    }

    // ═══════════════════════════════════
    //  TOAST
    // ═══════════════════════════════════
    let toastTimer;
    function showToast(msg) {
      const toast = document.getElementById("toast");
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
    }

    function bumpBadge() {
      const badge = document.getElementById("cart-badge");
      badge.classList.remove("bump");
      void badge.offsetWidth;
      badge.classList.add("bump");
    }

    // ═══════════════════════════════════
    //  FILTRES & RECHERCHE
    // ═══════════════════════════════════
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.category;
        renderProducts();
      });
    });

    document.getElementById("search-input").addEventListener("input", e => {
      currentSearch = e.target.value;
      renderProducts();
    });

    // ═══════════════════════════════════
    //  DÉLÉGATION ÉVÉNEMENTS
    // ═══════════════════════════════════
    document.getElementById("products-grid").addEventListener("click", e => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = parseInt(btn.dataset.id);
      if (btn.dataset.testid === "add-to-cart-btn") addToCart(id);
      if (btn.dataset.testid === "qty-increase") changeQtyProduct(id, 1);
      if (btn.dataset.testid === "qty-decrease") changeQtyProduct(id, -1);
    });

    document.getElementById("cart-items-list").addEventListener("click", e => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = parseInt(btn.dataset.id);
      if (btn.dataset.testid === "cart-qty-increase") changeQtyCart(id, 1);
      if (btn.dataset.testid === "cart-qty-decrease") changeQtyCart(id, -1);
      if (btn.dataset.testid === "remove-item-btn") removeFromCart(id);
    });

    document.getElementById("apply-promo-btn").addEventListener("click", applyPromo);
    document.getElementById("promo-input").addEventListener("keydown", e => {
      if (e.key === "Enter") applyPromo();
    });
    document.getElementById("checkout-btn").addEventListener("click", checkout);
    document.getElementById("clear-cart-btn").addEventListener("click", clearCart);
    document.getElementById("close-modal-btn").addEventListener("click", closeModal);

    // Fermer modal en cliquant dehors
    document.getElementById("order-modal").addEventListener("click", e => {
      if (e.target === document.getElementById("order-modal")) closeModal();
    });

    // ═══════════════════════════════════
    //  INIT
    // ═══════════════════════════════════
    renderProducts();
    renderCart();
  