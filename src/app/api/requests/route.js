import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Request from '@/models/Request';
import Donor from '@/models/Donor';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { BLOOD_COMPATIBILITY, sendMatchEmail } from '@/lib/matching';

async function getAuthUser(request) {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) return null;

  const decoded = verifyToken(token);
  return decoded;
}

export async function POST(request) {
  try {
    await dbConnect();
    const decoded = await getAuthUser(request);
    if (!decoded || decoded.role !== 'requester') {
      return NextResponse.json({ error: 'Unauthorized. Requester login required.' }, { status: 401 });
    }

    const { patient_name, blood_group, quantity, urgency_level, district, area, hospital_name } = await request.json();

    if (!patient_name || !blood_group || !quantity || !district || !area || !hospital_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the Request
    const bloodRequest = await Request.create({
      requester_id: decoded.userId,
      patient_name,
      blood_group,
      quantity,
      urgency_level: urgency_level || 'normal',
      district,
      area,
      hospital_name,
      status: 'pending'
    });

    // Run matching logic
    // 1. Get compatible blood groups
    const compatibleGroups = BLOOD_COMPATIBILITY[blood_group] || [];
    
    // 2. Define eligibility date threshold (3 months ago)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // 3. Find eligible donors
    // Condition: availability_status = true, isApproved = true, blood_group is compatible, 
    // last_donation_date is null OR <= 3 months ago, and district matches.
    const matchingDonors = await Donor.find({
      blood_group: { $in: compatibleGroups },
      district: district,
      availability_status: true,
      isApproved: true,
      $or: [
        { last_donation_date: null },
        { last_donation_date: { $exists: false } },
        { last_donation_date: { $lte: threeMonthsAgo } }
      ]
    }).populate('user_id', 'name email phone');

    // Send notifications to matched donors asynchronously
    let successfullyNotified = 0;
    const requesterUser = await User.findById(decoded.userId);
    const contactPhone = requesterUser ? requesterUser.phone : '0000000000';

    for (const donor of matchingDonors) {
      if (donor.user_id && donor.user_id.email) {
        const emailSent = await sendMatchEmail({
          donorEmail: donor.user_id.email,
          donorName: donor.user_id.name,
          patientName: patient_name,
          bloodGroup: blood_group,
          quantity: quantity,
          hospitalName: hospital_name,
          urgencyLevel: urgency_level || 'normal',
          contactPhone: contactPhone
        });
        if (emailSent) successfullyNotified++;
      }
    }

    if (matchingDonors.length > 0) {
      bloodRequest.status = 'matched';
      await bloodRequest.save();
    }

    return NextResponse.json({
      success: true,
      request: bloodRequest,
      matchedCount: matchingDonors.length,
      notifiedCount: successfullyNotified
    }, { status: 201 });
  } catch (error) {
    console.error('Create request matching error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const decoded = await getAuthUser(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Requesters can see their own requests. Admins can see all. Donors are not allowed here.
    if (decoded.role === 'requester') {
      const requests = await Request.find({ requester_id: decoded.userId }).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, requests });
    } else if (decoded.role === 'admin' || decoded.role === 'super_admin') {
      const requests = await Request.find().populate('requester_id', 'name email phone').sort({ createdAt: -1 });
      return NextResponse.json({ success: true, requests });
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  } catch (error) {
    console.error('Fetch requests error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
