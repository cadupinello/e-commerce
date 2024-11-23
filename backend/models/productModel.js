import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "O nome do produto é obrigatório"],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "O preço é obrigatório"],
    min: [0, "O preço não pode ser negativo"],
  },
  description: {
    type: String,
    required: [true, "A descrição é obrigatória"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "A categoria é obrigatória"],
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  quantity: {
    type: Number,
    required: [true, "A quantidade é obrigatória"],
    min: [0, "A quantidade não pode ser negativa"],
  },
  shipping: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);