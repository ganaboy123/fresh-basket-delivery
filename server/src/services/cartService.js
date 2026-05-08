const getSizePrice = (product, sizeLabel) => {
  const selectedSize = product.sizes.find((size) => size.label === sizeLabel);
  if (!selectedSize) {
    return null;
  }
  return product.price + selectedSize.priceModifier;
};

const calculateCartTotals = (items) => {
  const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);
  return { totalPrice: Number(totalPrice.toFixed(2)) };
};

module.exports = { getSizePrice, calculateCartTotals };
