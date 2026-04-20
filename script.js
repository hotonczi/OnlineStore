let products = document.getElementById("productContainer");

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        products.innerHTML = "";
        data.forEach(product => {
            products.innerHTML += ` 
            <div class="products">
                <img src="${product.image}" alt="">
                <div class="content">
                    <h1> ${product.title} </h1>
                    <span class="price"> ${product.price} PLN </span>

                </div>
            </div>`;
        });
    });
    