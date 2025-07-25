import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  res.json(cart || { userId, items: [] });
};

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  const existingItem = cart.items.find(
    (i) => i.productId.toString() === productId
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
  await cart.save();
  res.status(200).json(cart);
};
