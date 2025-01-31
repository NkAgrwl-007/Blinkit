import express from 'express';
import multer from 'multer';
import Category from '../models/Category.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const convertBufferToBase64 = (buffer) => {
  return buffer.toString('base64');
};

// Add a new category
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description } = req.body;
  const image = req.file;

  try {
    const imageBase64 = convertBufferToBase64(image.buffer);

    const newCategory = new Category({
      name,
      description,
      image: {
        data: imageBase64,
        contentType: image.mimetype,
      },
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully!', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();

    const categoriesWithBase64Images = categories.map((category) => ({
      ...category.toObject(),
      image: category.image ? `data:${category.image.contentType};base64,${category.image.data}` : null,
    }));

    res.status(200).json(categoriesWithBase64Images);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get category image by ID
router.get('/category-image/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category || !category.image || !category.image.data) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const base64Image = `data:${category.image.contentType};base64,${category.image.data}`;
    res.status(200).json({ base64Image });
  } catch (error) {
    console.error('Error fetching category image:', error);
    res.status(500).json({ message: 'Error fetching category image' });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

export default router;
