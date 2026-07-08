import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  requester_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patient_name: { type: String, required: true },
  blood_group: { type: String, required: true },
  quantity: { type: Number, required: true },
  urgency_level: { type: String, enum: ['normal', 'urgent', 'critical'], default: 'normal' },
  district: { type: String, required: true },
  area: { type: String, required: true },
  hospital_name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'matched', 'fulfilled', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.models.Request || mongoose.model('Request', RequestSchema);
export default Request;
