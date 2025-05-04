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