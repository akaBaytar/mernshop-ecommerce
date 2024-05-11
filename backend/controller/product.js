import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc      fetch all products
// @route     GET /api/v1/products
// @access    public
const getAllProducts = asyncHandler(async (_, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc      fetch a product
// @route     GET /api/v1/products/:id
// @access    public
const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .json({ message: `Product not found with id:${id}.` });
  }

  res.json(product);
});

// @desc      create product
// @route     POST /api/v1/products
// @access    private | admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user._id,
    image: '../src/assets/placeholder.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description.',
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc      update product
// @route     PUT /api/v1/products/:id
// @access    private | admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error(`There is no product with id: ${id}.`);
  }
});

// @desc      delete product
// @route     DELETE /api/v1/products/:id
// @access    private | admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: 'Product deleted successfully.' });
  } else {
    res.status(404);
    throw new Error(`There is no product with id: ${id}.`);
  }
});

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
