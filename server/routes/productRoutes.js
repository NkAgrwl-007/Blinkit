import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js'; // Your Product model

const router = express.Router();

// Set up multer storage for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Helper function to convert a file buffer to Base64 format
 * @param {Buffer} buffer - The buffer of the file
 * @returns {string} - The Base64 encoded string
 */
const convertBufferToBase64 = (buffer) => {
  return buffer.toString('base64');
};

// API route for adding a product
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, description, category, subCategory } = req.body;
  const image = req.file; // Get the uploaded image file

  try {
    // Convert image buffer to Base64
    const imageBase64 = convertBufferToBase64(image.buffer);

    // Save the product to MongoDB
    const newProduct = new Product({
      name,
      description,
      category,
      subCategory,
      image: {
        data: imageBase64, // Store image in Base64 format
        contentType: image.mimetype, // Store the MIME type of the image
      },
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// API route for fetching all products (including Base64 images)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products

    // Map through products and include Base64 image in the response
    const productsWithBase64Images = products.map((product) => ({
      ...product.toObject(),
      image: product.image ? `data:${product.image.contentType};base64,${product.image.data}` : null, // Include Base64 image
    }));

    res.status(200).json(productsWithBase64Images);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// API route for fetching a single product image by product ID (Base64)
router.get('/product-image/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id); // Fetch product by ID
    if (!product || !product.image || !product.image.data) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Send the Base64 image string as the response
    const base64Image = `data:${product.image.contentType};base64,${product.image.data}`;
    res.status(200).json({ base64Image });
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({ message: 'Error fetching product image' });
  }
});

export default router;
