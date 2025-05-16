import {orders} from './data/order.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import { products } from './data/product.js';
import { cart, saveToStorage, totalCartQuantity } from './data/cart.js';


updateCartQuantity();

let orderListHTML = '';
orders.forEach((order)=>{
  orderListHTML += `
        <div class="order-heading">
          <div>
            <strong>Order Placed:</strong>
            <span>${dayjs(order.orderTime).format('MMMM, D')}</span>
          </div>
          <div class="me-5">
            <strong>Total:</strong>
            <span>$${formatCurrency(order.totalCostCents)}</span>
          </div>
          <div>
              <strong>Order ID:</strong>
              <span>${order.id}</span>
          </div>
        </div>
         
        ${displayOrderProduct(order)}
          `
});
document.querySelector('.js-order').innerHTML = orderListHTML;

function displayOrderProduct(order) {
  let html = '';
  order.products.forEach((orderproduct)=>{
    const matchingProduct = products.find(product => product.id === orderproduct.productId)
   html += `
       <div class="order-body">
     <div class="img-container">
        <img src="${matchingProduct.image}" alt="">
     </div>
    
   <div class="div">
    <div class="d-flex flex-column lh-base">
      <h5>${matchingProduct.name}</h5>
      <span>Arriving on: ${dayjs(orderproduct.estimatedDeliveryTime).format('MMMM, D')}</span>
      <span>Quantity: ${orderproduct.quantity}</span>
      <button class="btn btn-success mt-2 js-buy-again"
      data-product-id = ${matchingProduct.id}>
        <i class="fa-solid fa-rotate me-2"></i>
        Buy it again
      </button>
    </div>
    <div>
      <button class="btn btn-light shadow-sm border border-secondary-subtle">Track Package</button>
    </div>
   </div>
    
  </div>
    `
  })
  return html;
}

document.querySelectorAll('.js-buy-again').forEach((button)=>{
 button.addEventListener('click', ()=>{
  const {productId} = button.dataset;
  
  const matchingItem = cart.find(item => item.productId === productId)

  if (matchingItem) {
    matchingItem.quantity += 1
  } else{
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  
  updateCartQuantity();
  saveToStorage();
 })
})

function updateCartQuantity() {
  const cartQuantity = totalCartQuantity()
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

