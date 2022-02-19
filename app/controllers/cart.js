const { response, request } = require('express');
const { Cart } = require('../models');

/* GET CART BY USERID */
const getCartOfSpecificUser = async (
  req = request,
  res = response
) => {
  try {
    const ParamUserId = req.params.userid;

    // Get all record given a userId and count documents
    const userCart = await Cart.find({
      userId: ParamUserId,
    }).populate('productId');

    const userCartArr = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const data of userCart) {
      userCartArr.push(data);
    }

    return res.json({ products: userCartArr });
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
  const { userId } = req.query;
  const { productId } = req.params;

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

module.exports = {
  addProductToCart,
  getCartOfSpecificUser,
  countProductsOfSpecificUser,
  isProductAddedToCart,
};
