export let cart = JSON.parse(localStorage.getItem('cart')) || [];


export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
  const selectQuantity = document.getElementById(`js-select-quantity-${productId}`);
  const quantity = Number(selectQuantity.value)

  const matchingItem = cart.find(item => item.productId === productId)

  if (matchingItem) {
    matchingItem.quantity += quantity
  } else{
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  };
  saveToStorage();
}

export function updateCart(productId) {
  const matchingProduct = cart.find(item => item.productId === productId);
      if (!matchingProduct) return;
  
      const updateQuantity = prompt('Update Quantity', matchingProduct.quantity);
      const newQuantity = Number(updateQuantity);
      const isValid = updateQuantity !== null && updateQuantity.trim() !== '' && Number.isInteger(newQuantity) && newQuantity > 0 &&  newQuantity <= 1000;
  
      if (isValid) {
        matchingProduct.quantity = newQuantity;
        document.querySelector('.js-cart-quantity').textContent = newQuantity;
        saveToStorage();
      } else{
        alert('Invalid Quantity')
      }
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveToStorage();
}

export function totalCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item)=>{
     cartQuantity += item.quantity
  });
  return cartQuantity;
}

export function clearCartAfterOrder() {
  cart = [];
  saveToStorage();
}