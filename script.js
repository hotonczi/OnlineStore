let products = document.getElementById("productContainer");
let SortByPrice = document.getElementById("SortByPrice")

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

function showProducts(data){
    products.innerHTML = "";
        data.forEach(product => {
            products.innerHTML += ` 
            <div class="products">
                <img src="${product.image}" alt="${product.title}">
                <div class="content">
                    <h1> ${product.title} </h1>
                    <span class ="category"> ${product.category} </span>
                    <span class="price"> ${product.price} PLN </span>
                    
                    <button id="btnAdd"> Dodaj do koszyka </button>

                </div>
            </div>`;
        });
}

    