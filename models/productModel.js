const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add a quantity'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    _createdBy: {
      type: String, //mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Products', productSchema);
