import mongoose from 'mongoose';

const BloodStockSchema = new mongoose.Schema({
  blood_group: { type: String, required: true, unique: true },
  units_available: { type: Number, default: 0 },
  last_updated: { type: Date, default: Date.now }
});

const BloodStock = mongoose.models.BloodStock || mongoose.model('BloodStock', BloodStockSchema);
export default BloodStock;
