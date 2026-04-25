let products = document.getElementById("productContainer");
let SortByPrice = document.getElementById("SortByPrice")

if(products) {
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        showProducts(data);

        SortByPrice.addEventListener("change", () => {
            let sortedProducts = [...data];

            if (SortByPrice.value == "desc"){
                sortedProducts.sort((a ,b) => b.price - a.price);

            }
            if (SortByPrice.value == "asc"){
                sortedProducts.sort((a,b) => a.price - b.price);
            }
            showProducts(sortedProducts);
        })
    });
};

function showProducts(data){
    products.innerHTML = "";
        data.forEach(product => {
            const pr = ` 
            <div class="products">
                <img src="${product.image}" alt="${product.title}">
                <div class="content">
                    <h1> ${product.title} </h1>
                    <span class ="category"> ${product.category} </span>
                    <span class="price"> ${product.price} PLN </span>
                    
                    <button class="btnAdd" data-id="${product.id}"> Dodaj do koszyka </button>

                </div>
            </div>`;
            products.innerHTML += pr;

            });
            document.querySelectorAll(".btnAdd").forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = btn.dataset.id;

                    const product = data.find(p => p.id == id);

                    addToCart(product);

                })
            })
}

function addToCart(product){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(p => p.id === product.id);

    if(existing){
        existing.quantity += 1;
    } else{
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }
    localStorage.setItem("cart", JSON.stringify(cart));
};

function loadCart(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const container = document.getElementById("cartContainer");
    const totalEl = document.getElementById("total");

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" width="80">
            <div>
                <h3>${item.title}</h3>
                <p>${item.price} PLN x ${item.quantity}</p>
                <button onclick="removeItem(${index})">Usuń</button>
            </div>
        `;

        container.appendChild(div);

        total += item.price * item.quantity;
    });

    totalEl.textContent = total.toFixed(2);
}

function removeItem(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function clearCart(){
    localStorage.removeItem("cart");
    loadCart();
}

