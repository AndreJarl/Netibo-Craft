const products = [
  {
    id: 1,
    name: "Rattan Cocktail Round Table",
    price: 1499,
    image: "product-imgs/RattanCocktailRoundtable.JPG",
    description: "Rattan table with round top and a flared base. Height: 70-80 cm (28-31 inches), Diameter: 60-70 cm (24-28 inches)."
  },
  {
    id: 2,
    name: "Rattan Flower Chair",
    price: 1289,
    image: "product-imgs/RattanFlowerChair.JPG",
    description: "Uniquely designed rattan loveseat with a distinctive, flower-like back. Width: 120-150 cm, Depth: 60-70 cm, Height: 90-100 cm."
  },
  {
    id: 3,
    name: "Rattan Curved Sofa",
    price: 979,
    image: "product-imgs/RattanCurvedSofa.JPG",
    description: "Uniquely shaped, woven rattan sofa. Length: 180-200 cm, Width: 80-100 cm, Height: 70-80 cm."
  },
  {
    id: 4,
    name: "Rattan Flower Set",
    price: 599,
    image: "product-imgs/RattanFlowerSet.JPG",
    description: "Patio set with two flower-shaped rattan chairs and a small square rattan table, all with black metal legs."
  },
  {
    id: 5,
    name: "Rattan Hammock",
    price: 679,
    image: "product-imgs/RattanHammock.JPG",
    description: "Hanging rattan hammock with a teardrop shape and a black metal stand. Height: 100-120 cm, Width: 80-100 cm, Stand Diameter: 70-80 cm."
  },
  {
    id: 6,
    name: "Rattan Hanging Lamp",
    price: 500,
    image: "product-imgs/RattanHangingLamp.JPG",
    description: "Hanging rattan lampshade. Diameter: 25-30 cm, Height: 20-25 cm."
  },
  {
    id: 7,
    name: "Rattan Hanging Round Lamp Shade",
    price: 500,
    image: "product-imgs/RattanHangingRoundLampShade.JPG",
    description: "Hanging lampshade made of woven rattan, with a slightly bell-shaped design. Height: 25-30 cm, Diameter: 20-25 cm."
  },
  {
    id: 8,
    name: "Rattan Long Chair",
    price: 1200,
    image: "product-imgs/RattanLongChair.JPG",
    description: "Modern-style bench made of woven rattan. Length: 120-150 cm, Depth: 60-70 cm, Height: 80-90 cm."
  },
  {
    id: 9,
    name: "Rattan Long Sofa",
    price: 1400,
    image: "product-imgs/RattanLongSofa.JPG",
    description: "Rattan sofa. Length: 180-200 cm, Depth: 80-90 cm, Height: 80-90 cm."
  },
  {
    id: 10,
    name: "Woven Sphere Sofa",
    price: 1200,
    image: "product-imgs/WovenSphereSofa.JPG",
    description: "Large, uniquely shaped woven rattan chair. Diameter: 100-120 cm, Height: 80-90 cm."
  }
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
      <p class="product-price">₱  ${product.price.toFixed(2)}</p>
     
 
      <div class="card-button">
       <button onclick="addToCart(${product.id})">Add to Cart</button>
          <button onclick="productInfo(${product.id})">View more</button>
      </div>
     
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
      <img src="${item.image}"/>

      ${item.name} 
      <button onclick="decreaseQuantity(${item.id})" style="margin-left:10px; padding: 2px 6px;">-</button>
      <span style="margin: 0 5px;">${item.quantity}</span>
      <button onclick="increaseQuantity(${item.id})" style="padding: 2px 6px;">+</button>
      ₱${(item.price * item.quantity).toFixed(2)}
    `;
    cartItems.appendChild(li);
  });

  const totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: ₱${total.toFixed(2)}`;
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

function productInfo(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    document.getElementById("modalProductName").textContent = product.name;
    document.getElementById("modalProductImage").src = product.image;
    document.getElementById("modalProductImage").alt = product.name;
    document.getElementById("modalProductDescription").textContent = product.description;

    document.getElementById("productModal").classList.remove("hidden");
  }
}

function closeModal() {
  document.getElementById("productModal").classList.add("hidden");
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
        <p class="product-price">₱  ${product.price.toFixed(2)}</p>
     
       <div class="card-button">
       <button onclick="addToCart(${product.id})">Add to Cart</button>
          <button onclick="productInfo(${product.id})">View more</button>
      </div>
    `;
    container.appendChild(div);
  });
}

renderProducts();
