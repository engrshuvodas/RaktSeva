import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Donor from '@/models/Donor';
import DonationHistory from '@/models/DonationHistory';
import { verifyToken } from '@/lib/auth';

async function getAuthDonor(request) {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'donor') return null;

  return decoded.userId;
}

export async function GET(request) {
  try {
    await dbConnect();
    const userId = await getAuthDonor(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const donor = await Donor.findOne({ user_id: userId });
    if (!donor) {
      return NextResponse.json({ error: 'Donor profile not found' }, { status: 404 });
    }

    const history = await DonationHistory.find({ donor_id: donor._id })
      .populate('request_id', 'patient_name hospital_name')
      .sort({ donation_date: -1 });

    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error('Get donor history error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
