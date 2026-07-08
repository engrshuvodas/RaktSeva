import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Donor from '@/models/Donor';
import User from '@/models/User';
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

    const donor = await Donor.findOne({ user_id: userId }).populate('user_id', 'name email phone');
    if (!donor) {
      return NextResponse.json({ error: 'Donor profile not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, donor });
  } catch (error) {
    console.error('Get donor profile error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const userId = await getAuthDonor(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, phone, blood_group, district, area, last_donation_date, availability_status } = await request.json();

    const donor = await Donor.findOne({ user_id: userId });
    if (!donor) {
      return NextResponse.json({ error: 'Donor profile not found' }, { status: 404 });
    }

    if (blood_group) donor.blood_group = blood_group;
    if (district) donor.district = district;
    if (area) donor.area = area;
    if (last_donation_date !== undefined) {
      donor.last_donation_date = last_donation_date ? new Date(last_donation_date) : null;
    }
    if (availability_status !== undefined) donor.availability_status = availability_status;

    await donor.save();

    const user = await User.findById(userId);
    if (user) {
      if (name) user.name = name;
      if (phone) user.phone = phone;
      await user.save();
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully', donor });
  } catch (error) {
    console.error('Update donor profile error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
