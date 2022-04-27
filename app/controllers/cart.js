const { response, request } = require('express');
const { Cart } = require('../models');

/* GET CART BY USERID */
const getCartOfSpecificUser = async (
  req = request,
  res = response
) => {
  try {
    const ParamUserId = req.params.userid;
    let thereAreProducts = null;

    // Get all record given a userId and count documents
    const userCart = await Cart.find({
      userId: ParamUserId,
    }).populate('productId', 'name price img _id');

    const userCartArr = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const data of userCart) {
      userCartArr.push(data);
    }

    // eslint-disable-next-line no-unused-expressions
    userCart.length >= 1
      ? (thereAreProducts = true)
      : (thereAreProducts = false);

    return res.json({ thereAreProducts, products: userCartArr });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'It Could not get this cart, check if the userId is valid',
    });
  }
};

const countProductsOfSpecificUser = async (req, res) => {
  const ParamUserId = req.params.userid;

  const total = await Cart.countDocuments({
    userId: ParamUserId,
  });

  res.json({ total });
};

const isProductAddedToCart = async (req, res) => {
  const { productId, userId } = req.params;

  const result = await Cart.findOne({
    productId,
  }).where({
    userId,
  });

  if (result) {
    return res.json({ exist: true });
  }

  return res.json({ exist: false });
};

/* DELETE FROM CART */
const deleteOneFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.params;

    await Cart.findOneAndDelete({
      productId,
    }).where({
      userId,
    });

    return res.json({ deleted: true });
  } catch (error) {
    return res.json({ deleted: false });
  }
};

/* ADD NEW USER AND PRODUCT */
const addProductToCart = async (
  req = request,
  res = response
) => {
  try {
    const cartData = req.body;

    const cart = await new Cart(cartData);

    const cartSaved = await cart.save();

    return res.status(201).json({ ok: true, cart: cartSaved });
  } catch (error) {
    return res.json({
      ok: false,
      msg: 'Failed to create new cart!',
    });
  }
};

const updateQuantityByProduct = async (req, res) => {
  const { id } = req.params;
  const newQt = req.body;

  try {
    await Cart.findByIdAndUpdate(id, newQt);

    return res.json({
      updated: true,
    });
  } catch (error) {
    return res.json({
      updated: false,
    });
  }
};

module.exports = {
  addProductToCart,
  getCartOfSpecificUser,
  countProductsOfSpecificUser,
  isProductAddedToCart,
  deleteOneFromCart,
  updateQuantityByProduct,
};
