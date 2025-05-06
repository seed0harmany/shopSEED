import { cart, removeFromCart, saveToStorage, totalCartQuantity, updateCart } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryoption.js";
import { products } from "../data/product.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import  formatCurrency from "../utils/money.js";
import { renderOrderSummary } from "./order-summary.js";


export function renderCartSummary(params) {
  updateCartQuantity();
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const { productId } = cartItem;

    let matchingProduct;
    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });
    
    const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
    const safeDeliveryDate  = deliveryOption || deliveryOptions[0]
    const today = dayjs();
    const deliveryDate = today.add(safeDeliveryDate.deliveryDays, 'days')
    cartSummaryHTML += `
      <div class=" cart-items-details w-100 mb-2">
          <h4 class="text-success">Delivery date: ${deliveryDate.format('dddd, MMMM D')}</h4>
          <div class="cart-details">
            <img src="${matchingProduct.image}" alt="">
            <div class="details me-4">
              <h5 class="fw-semibold">${matchingProduct.name}</h5>
              <h6 class="text-danger-emphasis fw-bold">$${formatCurrency(matchingProduct.priceCents)}</h6>
              <div class="d-flex gap-2 align-items-center flex-wrap">
                <span class="flex-shrink-0">
                  Quantity: <span class="js-cart-quantity">${
                    cartItem.quantity
                  }</span>
                </span>
                <button class="btn text-primary update-btn js-update-btn"
                data-product-id=${matchingProduct.id}>
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn text-danger delete-btn js-delete-btn"
                data-product-id=${matchingProduct.id}>
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
              
            </div>
            <div class="delivery-details">
              <h3 class="fw-bold">Choose a delivery option:</h3>
              ${deliveryOptionHTML(matchingProduct,cartItem)}
            </div>
          </div>
              
        </div>
 `;
  });
  document.querySelector(".js-cart-summary").innerHTML = cartSummaryHTML;

  function updateCartQuantity() {
    const cartQuantity = totalCartQuantity();
    document.querySelector('.total-cart-quantity').textContent = `${cartQuantity} Items`
  }

 document.querySelectorAll('.js-delete-btn').forEach((button)=>{
   button.addEventListener('click', ()=>{
     const {productId} = button.dataset;
     removeFromCart(productId);
     renderOrderSummary();
     renderCartSummary();
   })
 })
 
 document.querySelectorAll('.js-update-btn').forEach((button)=>{
   button.addEventListener('click', ()=>{
    const {productId} = button.dataset;
    updateCart(productId);
    renderOrderSummary();
    renderCartSummary();
   })
 });

 function deliveryOptionHTML(matchingProduct,cartItem) {
  let html = '';
  deliveryOptions.forEach((option)=>{
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const priceString = option.deliveryPriceCents === 0 ? 'FREE' : `$${(option.deliveryPriceCents * 0.01).toFixed(2)} - `
    const isChecked = cartItem.deliveryOptionId === option.id;
    html += `
      <div class="d-flex align-items-center delivery-option js-delivery-option"
      data-product-id=${matchingProduct.id}
      data-delivery-id=${option.id}>
        <input type="radio" ${isChecked ? 'checked' : ''} name="deliveryoption-${matchingProduct.id}">
        <div class="d-grid lh-sm ms-1 mt-2">
          <label class="text-success fw-medium" >${deliveryDate.format('dddd, MMMM D')}</label>
          <span>${priceString} Shipping</span>
        </div>
      </div>
    `
  });
  return html;
 }

 document.querySelectorAll('.js-delivery-option').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const {productId, deliveryId} = button.dataset;
    
    const matchingItem = cart.find(item => item.productId === productId)
    matchingItem.deliveryOptionId = deliveryId;
    saveToStorage();
    renderOrderSummary();
    renderCartSummary();
  })
 });

  renderOrderSummary();
}