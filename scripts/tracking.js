import { totalCartQuantity } from "./data/cart.js";
import { orders } from "./data/order.js";
import { products } from "./data/product.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


updateCartQuantity();
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const matchingOrder = orders.find(order => order.id === orderId);
const matchingProduct = products.find(product => product.id === productId);

const matchingDetails = matchingOrder.products.find(product => product.productId === productId);

const today = dayjs();
const orderTime = dayjs(matchingOrder.orderTime);
const deliveryDate = dayjs(matchingDetails.estimatedDeliveryTime);
const percentProgress = ((today - orderTime) / (deliveryDate - orderTime) * 100);

const arriveDeliver = today < deliveryDate ? 'Arriving' : 'Delivered';

const html = `
          <a href="order.html" class="text-info text-decoration-underline mt-4">View all orders</a>
        <h4 class="fw-bold mt-4 mb-3">${arriveDeliver} on ${dayjs(matchingDetails.estimatedDeliveryTime).format('dddd, MMMM D')}</h4>
        <div>
          ${matchingProduct.name}
        </div>
        <span>
          Quantity: ${matchingDetails.quantity}
        </span>
        <div class="my-4">
          <img height="120px" src="${matchingProduct.image}" alt="">
        </div>
        <div class="mt-3">
          <div class="d-flex align-items-center justify-content-between">
            <span class="${percentProgress < 50 ? 'text-success' : ''} fw-semibold">Preparing</span>
            <span class="${percentProgress >= 50 && percentProgress < 100 ? 'text-success' : ''} fw-semibold">Shipped</span>
            <span class="${percentProgress >= 100 ? 'text-success' : ''} fw-semibold">Delivered</span>
          </div>
          <div class="progress-bar-container">
             <div class="progress-bar" style="width:${percentProgress}%">
                
             </div>
          </div>
        </div>
`
document.querySelector('.js-tracking').innerHTML = html;

function updateCartQuantity() {
  const cartQuantity = totalCartQuantity()
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
