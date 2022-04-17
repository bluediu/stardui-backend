const { Schema, model } = require('mongoose');

const OrderSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    creditCartNumber: {
      type: String,
      required: true,
    },
    creditCartOwnerName: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    cvc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Order', OrderSchema);
