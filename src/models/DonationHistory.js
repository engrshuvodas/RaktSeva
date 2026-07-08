import mongoose from 'mongoose';

const DonationHistorySchema = new mongoose.Schema({
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  donation_date: { type: Date, default: Date.now },
  units_donated: { type: Number, default: 1 }
});

const DonationHistory = mongoose.models.DonationHistory || mongoose.model('DonationHistory', DonationHistorySchema);
export default DonationHistory;
