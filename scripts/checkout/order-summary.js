import { cart, totalCartQuantity } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryoption.js";
import { products } from "../data/product.js";
import formatCurrency from "../utils/money.js";

export function renderOrderSummary() {
  let productPriceCents = 0
  let shippingPriceCents = 0;
   cart.forEach((cartItem)=>{
    const matchingProduct = products.find(product => product.id === cartItem.productId);
    const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId)
    productPriceCents += matchingProduct.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.deliveryPriceCents;
    
   });

   const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + taxCents;
    const cartQuantity = totalCartQuantity();
    const html = `
        <h4 class="fw-bold">Order Summary</h4>
            <div class="div">
              <span>Items(${cartQuantity}):</span>
              <span>$${formatCurrency(productPriceCents)}</span>
            </div>
            <div class="div">
              <span>Shipping & handling</span>
              <span>$${formatCurrency(shippingPriceCents)}</span>
            </div>
            <div class="tbt div">
              <span>Total before tax</span>
              <span class="total-b4-tax">$${(totalBeforeTax)}</span>
            </div>
            <div class="div">
              <span>Estimated tax (10%):</span>
              <span>$${formatCurrency(taxCents)}</span>
            </div>
            <div class="order-total mt-2 py-1 mb-2 div">
              <span class="text-danger-emphasis">Order total:</span>
              <span class="text-danger-emphasis">$${formatCurrency(orderTotal)}</span>
            </div>
            <button class="btn btn-warning w-100 js-place-order">Place your order</button>
    `
    document.querySelector('.js-order-summary').innerHTML = html;
    console.log(orderTotal);
    
   document.querySelector('.js-place-order').addEventListener('click', ()=>{
    window.location.href = 'order.html'
   })
   
  }