const { response, request } = require('express');
const { Order } = require('../models');

/* CREATE AN ORDER */
const createOrder = async (req = request, res = response) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER ORDERS
/* an user can has multiples orders */
const getOrdersByUser = async (req, res) => {
  try {
    // get all orders associate a user
    const orders = await Order.find({
      userId: req.params.userId,
    })
      .populate('userId', 'name')
      .populate({
        path: 'products.productId',
        select: 'name price img',
      });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};
