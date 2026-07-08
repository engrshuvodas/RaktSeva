import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Donor from '@/models/Donor';
import { verifyToken } from '@/lib/auth';

async function verifyAdmin(request) {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) return false;

  const decoded = verifyToken(token);
  return decoded && (decoded.role === 'admin' || decoded.role === 'super_admin');
}

export async function GET(request) {
  try {
    await dbConnect();
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const donors = await Donor.find().populate('user_id', 'name email phone role');
    return NextResponse.json({ success: true, donors });
  } catch (error) {
    console.error('Admin donors GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { donorId, isApproved, availability_status, blood_group, district, area, last_donation_date } = await request.json();

    if (!donorId) {
      return NextResponse.json({ error: 'Donor ID is required' }, { status: 400 });
    }

    const donor = await Donor.findById(donorId);
    if (!donor) {
      return NextResponse.json({ error: 'Donor profile not found' }, { status: 404 });
    }

    if (isApproved !== undefined) donor.isApproved = isApproved;
    if (availability_status !== undefined) donor.availability_status = availability_status;
    if (blood_group) donor.blood_group = blood_group;
    if (district) donor.district = district;
    if (area) donor.area = area;
    if (last_donation_date !== undefined) {
      donor.last_donation_date = last_donation_date ? new Date(last_donation_date) : null;
    }

    await donor.save();

    return NextResponse.json({ success: true, message: 'Donor updated successfully', donor });
  } catch (error) {
    console.error('Admin donors PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
