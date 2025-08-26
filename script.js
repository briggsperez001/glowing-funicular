const products = [
    { id: 1, name: "Apple", category: "fruits", price: 1.2 },
    { id: 2, name: "Banana", category: "fruits", price: 0.8 },
    { id: 3, name: "Carrot", category: "vegetables", price: 0.6 },
    { id: 4, name: "Milk", category: "dairy", price: 1.5 },
    { id: 5, name: "Whole Wheat Bread", category: "bakery", price: 2.0 },
    { id: 6, name: "Spinach", category: "vegetables", price: 1.1 },
    { id: 7, name: "Cheese", category: "dairy", price: 2.8 },
    { id: 8, name: "Orange", category: "fruits", price: 1.3 },
    { id: 9, name: "Croissant", category: "bakery", price: 1.7 }
];

let cart = [];

function renderProducts() {
    const list = document.getElementById('productList');
    const search = document.getElementById('searchBar').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    list.innerHTML = '';
    const filtered = products.filter(p => 
        (category === 'all' || p.category === category) &&
        p.name.toLowerCase().includes(search)
    );
    if (filtered.length === 0) {
        list.innerHTML = "<p>No products found.</p>";
        return;
    }
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${capitalize(product.category)}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        list.appendChild(card);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function addToCart(productId) {
    const prod = products.find(p => p.id === productId);
    const found = cart.find(i => i.id === prod.id);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ ...prod, qty: 1 });
    }
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cartItems');
    list.innerHTML = '';
    if (cart.length === 0) {
        list.innerHTML = '<li>Your cart is empty.</li>';
        return;
    }
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.qty}`;
        list.appendChild(li);
    });
}

document.getElementById('searchBar').addEventListener('input', renderProducts);
document.getElementById('categoryFilter').addEventListener('change', renderProducts);

renderProducts();
renderCart();

// For debugging outside strict mode:
window.addToCart = addToCart;
