import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: {
      data: { type: String, required: true },
      contentType: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model('SubCategory', SubCategorySchema);
