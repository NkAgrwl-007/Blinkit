import express from 'express';
import multer from 'multer';
import SubCategory from '../models/SubCategory.js';
import Category from '../models/Category.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const convertBufferToBase64 = (buffer) => {
  return buffer.toString('base64');
};

// Add a new subcategory
router.post('/', upload.single('image'), async (req, res) => {
  const { name, categoryId } = req.body;
  const image = req.file;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const imageBase64 = convertBufferToBase64(image.buffer);

    const newSubCategory = new SubCategory({
      name,
      categoryId,
      image: {
        data: imageBase64,
        contentType: image.mimetype,
      },
    });

    await newSubCategory.save();

    res.status(201).json({ message: 'Sub-category added successfully!', subCategory: newSubCategory });
  } catch (error) {
    console.error('Error adding sub-category:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get all subcategories
router.get('/', async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate('categoryId', 'name');

    const subCategoriesWithBase64Images = subCategories.map((subCategory) => ({
      ...subCategory.toObject(),
      image: subCategory.image ? `data:${subCategory.image.contentType};base64,${subCategory.image.data}` : null,
    }));

    res.status(200).json(subCategoriesWithBase64Images);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete a subcategory
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.status(200).json({ message: 'Sub-category deleted successfully!' });
  } catch (error) {
    console.error('Error deleting sub-category:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

export default router;
