import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Request from '@/models/Request';
import Donor from '@/models/Donor';
import { verifyToken } from '@/lib/auth';
import { BLOOD_COMPATIBILITY } from '@/lib/matching';

async function getAuthUser(request) {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) return null;

  return verifyToken(token);
}

export async function GET(request, context) {
  try {
    await dbConnect();
    const decoded = await getAuthUser(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { requestId } = await context.params;

    const bloodRequest = await Request.findById(requestId);
    if (!bloodRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Only the creator of the request or admins/super_admins can view the matched donors
    if (decoded.role === 'requester' && bloodRequest.requester_id.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (decoded.role === 'donor') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const compatibleGroups = BLOOD_COMPATIBILITY[bloodRequest.blood_group] || [];
    
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const matchedDonors = await Donor.find({
      blood_group: { $in: compatibleGroups },
      district: bloodRequest.district,
      availability_status: true,
      isApproved: true,
      $or: [
        { last_donation_date: null },
        { last_donation_date: { $exists: false } },
        { last_donation_date: { $lte: threeMonthsAgo } }
      ]
    }).populate('user_id', 'name email phone');

    return NextResponse.json({ success: true, matches: matchedDonors });
  } catch (error) {
    console.error('Fetch matched donors error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
