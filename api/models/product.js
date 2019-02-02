import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const nestedSchema = new Schema({
  productName: { type: 'String', required: true },
  quantity: { type: 'Number', required: true },
});

const productSchema = new Schema({
  userName: { type: 'String', required: true },
  products: [nestedSchema]
});

export default mongoose.model('Product', productSchema);
