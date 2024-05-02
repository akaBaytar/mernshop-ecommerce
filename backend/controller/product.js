import Product from '../models/Product.js';

// @desc      fetch all products
// @route     GET /api/v1/products
// @access    public
const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.json(products);
};

// @desc      fetch a product
// @route     GET /api/v1/products/:id
// @access    public
const getProduct = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .json({ message: `Product not found with id:${id}.` });
  }

  res.json(product);
};

export { getAllProducts, getProduct };
