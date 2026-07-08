import mongoose from 'mongoose';

const DonorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  blood_group: { type: String, required: true },
  district: { type: String, required: true },
  area: { type: String, required: true },
  last_donation_date: { type: Date },
  availability_status: { type: Boolean, default: true },
  total_donations: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false }
});

const Donor = mongoose.models.Donor || mongoose.model('Donor', DonorSchema);
export default Donor;
