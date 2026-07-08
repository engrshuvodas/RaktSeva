import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'admin', 'donor', 'requester'], default: 'donor' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
