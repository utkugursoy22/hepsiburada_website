document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const category = urlParams.get('category');
    const sidebar = document.querySelector('.sidebar');
    const resultsContainer = document.getElementById('search-results');
    const tomorrowDeliveryCheckbox = document.getElementById('tomorrow-delivery-checkbox');
    const citySelect = document.getElementById('city-select');

    
    const allCategoryElement = document.createElement('div');
    allCategoryElement.textContent = 'Tüm Kategoriler';
    allCategoryElement.classList.add('category-item');
    allCategoryElement.onclick = () => fetchAllProducts();
    sidebar.appendChild(allCategoryElement);

    
    fetch('/api/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.textContent = category.category; // Kategori ismini göster
                categoryElement.classList.add('category-item');
                categoryElement.onclick = () => filterByCategory(category.category);
                sidebar.appendChild(categoryElement);
            });
        });

        fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });  
    
    if (query) {
        fetch('/api/search-products?query=' + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            });
    } else if (category) {
        filterByCategory(category);
    }

    
    tomorrowDeliveryCheckbox.addEventListener('change', function() {
        filterProductsByDelivery(this.checked, citySelect.value);
    });

    
    citySelect.addEventListener('change', function() {
        filterProductsByDelivery(tomorrowDeliveryCheckbox.checked, this.value);
    });
});

function displayProducts(products) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; 
    products.forEach(product => {
        const productElement = document.createElement('a');
        productElement.className = 'product-card';
        productElement.href = `product-detail.html?id=${product.product_no}`;
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.description}" class="product-image">
            <div class="product-details">
                <h3>${product.description}</h3>
                <p>${product.price} TL</p>
            </div>
        `;
        resultsContainer.appendChild(productElement);
    });
}

function fetchAllProducts() {
    fetch('/api/search-products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });
}

function filterByCategory(category) {
    fetch('/api/search-products?category=' + encodeURIComponent(category))
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });
}

function filterProductsByDelivery(isTomorrow) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    let url = '/api/search-products';

    if (category) {
        url += '?category=' + encodeURIComponent(category);
        if (isTomorrow) {
            url += '&tomorrow_delivery=1';
        }
    } else if (isTomorrow) {
        url += '?tomorrow_delivery=1';
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });
}

function filterProductsByCity(city) {
    let url = '/api/search-products?';
    const tomorrowDeliveryCheckbox = document.getElementById('tomorrow-delivery-checkbox');
    if (tomorrowDeliveryCheckbox.checked) {
        url += 'tomorrow_delivery=1';
        if (city) {
            url += '&ship_cities=' + encodeURIComponent(city);
        }
    } else {
        if (city) {
            url += 'ship_cities=' + encodeURIComponent(city);
        }
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });
}