/* libs */
const { response, request } = require('express');

/* Models */
const { Order } = require('../models');

/* == GET == */

/* Get orders by user id, Note: an user can has multiples orders */
const getOrdersByUser = async (req, res) => {
  try {
    let thereAreOrdersDone = null;
    // get all orders associate a user
    const orders = await Order.find({
      userId: req.params.userId,
    })
      .populate('userId', 'name img')
      .populate({
        path: 'products.productId',
        select: 'name price img category',
        populate: {
          path: 'category',
          select: 'name',
        },
      });

    // eslint-disable-next-line no-unused-expressions
    orders.length >= 1
      ? (thereAreOrdersDone = true)
      : (thereAreOrdersDone = false);

    res.status(200).json({ thereAreOrdersDone, orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* == CREATE == */

/* Create an orden */
const createOrder = async (req = request, res = response) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};
