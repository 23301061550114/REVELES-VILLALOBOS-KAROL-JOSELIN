/* ------------------- PRODUCTOS ------------------- */

const products = [
    { name: "Bolsa Olimba", price: 1500, img: "https://ss511.liverpool.com.mx/sm/1186377482.jpg", cat: "accesorios" },
    { name: "Smartwatch", price: 2550, img: "https://ss632.liverpool.com.mx/xl/1168965890.jpg", cat: "electronica" },
    { name: "Perfume Carolina Herrera", price: 3550, img: "https://ss701.liverpool.com.mx/xl/1180415650_1p.jpg", cat: "belleza" },
    { name: "Tenis Nike", price: 900, img: "https://ss550.liverpool.com.mx/sm/1091098853.jpg", cat: "ropa" },
    { name: "iPhone 14 PRO MAX", price: 123900, img: "https://ss632.liverpool.com.mx/sm/1148580576.jpg", cat: "electronica" },
    { name: "Chamarra", price: 850, img: "https://ss271.liverpool.com.mx/sm/1160633022.jpg", cat: "ropa" },
    { name: "Blush líquido", price: 269, img: "https://ss706.liverpool.com.mx/sm/1154305293.jpg", cat: "belleza" },
    { name: "Bota para mujer", price: 2100, img: "https://ss550.liverpool.com.mx/sm/1186043749.jpg", cat: "ropa" },
    { name: "Sala familiar", price: 13000, img: "https://ss101.liverpool.com.mx/sm/1161678577.jpg", cat: "hogar" },
    { name: "Anillo", price: 2800, img: "https://ss566.liverpool.com.mx/sm/1157705101.jpg", cat: "accesorios" },

    /* ---- NUEVOS PRODUCTOS ---- */

    { name: "Laptop HP 15.6''", price: 12500, img: "https://ss632.liverpool.com.mx/xl/1168949441.jpg", cat: "electronica" },
    { name: "Audífonos Sony WH1000XM4", price: 6800, img: "https://ss632.liverpool.com.mx/xl/1128631049.jpg", cat: "electronica" },
    { name: "Xbox Series S", price: 6999, img: "https://ss632.liverpool.com.mx/xl/1120715612.jpg", cat: "electronica" },
    { name: "Nintendo Switch OLED", price: 8999, img: "https://ss632.liverpool.com.mx/xl/1151005675.jpg", cat: "electronica" },

    { name: "Pants deportivos Adidas", price: 899, img: "https://ss550.liverpool.com.mx/sm/1122276028.jpg", cat: "ropa" },
    { name: "Sudadera Champion", price: 1299, img: "https://ss550.liverpool.com.mx/sm/1156813022.jpg", cat: "ropa" },
    { name: "Vestido Floral Casual", price: 780, img: "https://ss550.liverpool.com.mx/sm/1163618912.jpg", cat: "ropa" },
    { name: "Gorra New Era NY", price: 850, img: "https://ss550.liverpool.com.mx/sm/1096249559.jpg", cat: "ropa" },

    { name: "Set Brochas Maquillaje", price: 520, img: "https://ss706.liverpool.com.mx/sm/1155242561.jpg", cat: "belleza" },
    { name: "Base Fenty Beauty", price: 920, img: "https://ss706.liverpool.com.mx/sm/1162500043.jpg", cat: "belleza" },
    { name: "Crema hidratante Cerave", price: 350, img: "https://ss706.liverpool.com.mx/sm/1135503145.jpg", cat: "belleza" },
    { name: "Shampoo Head & Shoulders", price: 120, img: "https://ss706.liverpool.com.mx/sm/1019092438.jpg", cat: "belleza" },

    { name: "Sofá seccional gris", price: 18999, img: "https://ss101.liverpool.com.mx/sm/1160156846.jpg", cat: "hogar" },
    { name: "Mesa de centro moderna", price: 3200, img: "https://ss101.liverpool.com.mx/sm/1168243495.jpg", cat: "hogar" },
    { name: "Juego de sartenes T-fal", price: 890, img: "https://ss101.liverpool.com.mx/sm/1139450708.jpg", cat: "hogar" },
    { name: "Aspiradora Dyson V15", price: 15999, img: "https://ss101.liverpool.com.mx/sm/1164728856.jpg", cat: "hogar" },

    { name: "Collar Swarovski", price: 4200, img: "https://ss566.liverpool.com.mx/sm/1125874414.jpg", cat: "accesorios" },
    { name: "Mochila Jansport", price: 799, img: "https://ss566.liverpool.com.mx/sm/1155727522.jpg", cat: "accesorios" },
    { name: "Reloj Casio Vintage", price: 599, img: "https://ss566.liverpool.com.mx/sm/1118533244.jpg", cat: "accesorios" },
    { name: "Lentes Ray-Ban Aviador", price: 2899, img: "https://ss566.liverpool.com.mx/sm/1134863381.jpg", cat: "accesorios" }
];

/* ------------------- DOM ------------------- */

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

const cartBtn = document.getElementById("cartBtn");
const favBtn = document.getElementById("favBtn");

const cartPanel = document.getElementById("cartPanel");
const favPanel = document.getElementById("favPanel");

const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const favItems = document.getElementById("favItems");

const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const favCount = document.getElementById("favCount");

let cart = [];
let fav = JSON.parse(localStorage.getItem("favoritos")) || [];

/* ------------------- MOSTRAR PRODUCTOS ------------------- */

function displayProducts(list) {
    productContainer.innerHTML = "";

    list.forEach(product => {
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toLocaleString("es-MX")}</p>

                <button class="add-btn" onclick="addToCart('${product.name}')">🛒 Agregar</button>
                <button class="fav-add-btn" onclick="toggleFavorite('${product.name}')">⭐ Favorito</button>
            </div>
        `;
    });
}

displayProducts(products);

/* ------------------- BUSCADOR ------------------- */

searchInput.addEventListener("input", e => {
    const text = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(text)
    );
    displayProducts(filtered);
});

/* ------------------- FILTROS ------------------- */

document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".cat-btn.active").classList.remove("active");
        btn.classList.add("active");

        const cat = btn.dataset.cat;

        displayProducts(
            cat === "todo" ? products : products.filter(p => p.cat === cat)
        );
    });
});

/* ------------------- PANELS ------------------- */

cartBtn.onclick = () => openPanel(cartPanel);
favBtn.onclick = () => openPanel(favPanel);

overlay.onclick = closePanels;

function openPanel(panel) {
    cartPanel.classList.remove("open");
    favPanel.classList.remove("open");

    panel.classList.add("open");
    overlay.classList.add("show");
}

function closePanels() {
    cartPanel.classList.remove("open");
    favPanel.classList.remove("open");
    overlay.classList.remove("show");
}

/* ------------------- CARRITO ------------------- */

function addToCart(name) {
    const product = products.find(p => p.name === name);
    const exists = cart.find(item => item.name === name);

    if (exists) exists.qty++;
    else cart.push({ ...product, qty: 1 });

    updateCart();
}

function changeQty(name, amount) {
    const item = cart.find(p => p.name === name);
    if (!item) return;

    item.qty += amount;
    if (item.qty <= 0) {
        cart = cart.filter(p => p.name !== name);
    }

    updateCart();
}

function removeFromCart(name) {
    cart = cart.filter(p => p.name !== name);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        cartItems.innerHTML += `
            <div class="panel-item">
                <img src="${item.img}">
                <div style="flex-grow:1;">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString("es-MX")} c/u</p>

                    <div class="qty-controls">
                        <button onclick="changeQty('${item.name}', -1)">–</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty('${item.name}', 1)">+</button>
                    </div>

                    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Quitar</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total.toLocaleString("es-MX");
    cartCount.textContent = count;
}

/* ------------------- FAVORITOS ⭐ ------------------- */

function toggleFavorite(name) {
    const product = products.find(p => p.name === name);
    const exists = fav.find(f => f.name === name);

    if (exists) {
        fav = fav.filter(f => f.name !== name);
    } else {
        fav.push(product);
    }

    saveFav();
    updateFav();
}

function saveFav() {
    localStorage.setItem("favoritos", JSON.stringify(fav));
}

function updateFav() {
    favItems.innerHTML = "";
    favCount.textContent = fav.length;

    fav.forEach(item => {
        favItems.innerHTML += `
            <div class="panel-item">
                <img src="${item.img}">
                <div style="flex-grow:1;">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString("es-MX")}</p>

                    <button class="remove-btn" onclick="toggleFavorite('${item.name}')">Quitar</button>
                </div>
            </div>
        `;
    });
}

updateFav();
