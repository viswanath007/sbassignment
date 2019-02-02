import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: 'String', required: true },
  password: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('User', userSchema);
