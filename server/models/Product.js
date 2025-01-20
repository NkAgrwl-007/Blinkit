import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: {
      data: { type: String, required: true }, // Store Base64 data
      contentType: { type: String, required: true }, // Store MIME type
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
