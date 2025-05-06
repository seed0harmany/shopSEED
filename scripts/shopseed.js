import { addToCart, cart, saveToStorage, totalCartQuantity } from "./data/cart.js";
import { products } from "./data/product.js";
import  formatCurrency  from "./utils/money.js";

updateCartQuantity();
let productListHTML = '';
products.forEach((product)=>{
  productListHTML += `
    <div class="product">
      <div class="img-container d-flex align-items-center justify-content-center">
       <img class="product-img" src="${product.image}" alt="">
      </div>
      <span class="product-name">${product.name}</span>
      <div class="d-flex gap-2">
      <img class="product-rating" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="">
      <span class="text-primary">${product.rating.count}</span>
      </div>
      <h6>$${formatCurrency(product.priceCents)}</h6>
      <select title="name" id="js-select-quantity-${product.id}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      </select>
      <div class="added-to-cart js-added-to-cart-${product.id} d-flex">
      <img class="me-1" src="images/icons/checkmark.png" alt="">
      Added
      </div>
      <button class="btn btn-success w-100 rounded-5 js-add-to-cart"
      data-product-id=${product.id}>
        Add to cart
      </button>
    </div>
  `
});
document.querySelector('.js-products').innerHTML = productListHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  let addedMessageTimeout;
  button.addEventListener('click', ()=>{
    const {productId} = button.dataset;
    addToCart(productId)
    updateCartQuantity();

    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('opacity1');
    
    const previousTimeoutId = addedMessageTimeout;
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId)
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('opacity1')
    }, 2000);

    addedMessageTimeout = timeoutId;
  });
});

function updateCartQuantity() {
  const cartQuantity = totalCartQuantity()
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}