
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); 

    
    fetch(`/api/product/${productId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('product-image').src = data.image_url;
            document.getElementById('product-description').textContent = data.description;
            document.getElementById('product-price').textContent = `${data.price} TL`;
            document.getElementById('product-color').textContent = data.color;
            document.getElementById('product-color').style.backgroundColor = data.color;
        });
});