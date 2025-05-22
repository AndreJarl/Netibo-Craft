const products = [
  { id: 1, name: "Rattan Cocktail Roundtable", price: 1499, image: "product-imgs/RattanCocktailRoundtable.JPG"},
  { id: 2, name: "Rattan Chair", price: 1289, image: "prodcut-imgs/RattanCurvedSofa.JPG" },
  { id: 3, name: "Rattan High Chair", price: 979, image: "img3.jpg" },
  { id: 4, name: "Rattan Center Table", price: 599, image: "img4.jpg" }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>P ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

function increaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
    updateCartUI();
  }
}

function decreaseQuantity(id) {
  const itemIndex = cart.findIndex(p => p.id === id);
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
    } else {
      // Remove the item if quantity reaches zero
      cart.splice(itemIndex, 1);
    }
    updateCartUI();
  }
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} 
      <button onclick="decreaseQuantity(${item.id})" style="margin-left:10px; padding: 2px 6px;">-</button>
      <span style="margin: 0 5px;">${item.quantity}</span>
      <button onclick="increaseQuantity(${item.id})" style="padding: 2px 6px;">+</button>
      - P${(item.price * item.quantity).toFixed(2)}
    `;
    cartItems.appendChild(li);
  });

  const totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: P${total.toFixed(2)}`;
  cartItems.appendChild(totalLi);

  // Add checkout button if there are items
  if (cart.length > 0) {
    const checkoutBtn = document.createElement("button");
    checkoutBtn.textContent = "Checkout";
    checkoutBtn.style.marginTop = "10px";
    checkoutBtn.style.padding = "8px 12px";
    checkoutBtn.style.background = "#a67c52";
    checkoutBtn.style.color = "white";
    checkoutBtn.style.border = "none";
    checkoutBtn.style.borderRadius = "6px";
    checkoutBtn.style.cursor = "pointer";
    checkoutBtn.onclick = checkout;
    cartItems.appendChild(checkoutBtn);
  }
}

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  updateCartUI();
  // Optionally hide the cart after checkout:
  document.getElementById("cart").classList.add("hidden");
}

document.querySelector(".cart-icon").addEventListener("click", () => {
  document.getElementById("cart").classList.toggle("hidden");
});

function searchProducts() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>P ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

renderProducts();
