const best_selling_products_container = document.querySelector('.best-selling-products .products-container');


fetch('/best-selling/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(data => {
        data.data.forEach(product => {
            best_selling_products_container.innerHTML += `
          <div  class='single-product d-flex'>
          <div style="width:22%" class='img-container'>
             <img class='product-image' src=${product.image} alt= ${product.name}>
          </div>
          <div style="width:78%; margin-top:10px;" class='detail-container justify-content-between d-flex'>
          <div class='name-container'>
          <h2 class='product-name'>${product.name}</h2>
          <h2 class='product-category'>${product.category}</h2>
          </div>
          <div class='price-container align-items-center d-flex'>
            <h4 class='product-price'>$${product.price}</h4>
          </div>
          </div>
          </div>
          `
        });


    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
