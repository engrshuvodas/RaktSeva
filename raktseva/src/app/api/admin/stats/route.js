import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Donor from '@/models/Donor';
import Request from '@/models/Request';
import BloodStock from '@/models/BloodStock';
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

    const totalDonors = await Donor.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: 'pending' });
    const matchedRequests = await Request.countDocuments({ status: 'matched' });
    const fulfilledRequests = await Request.countDocuments({ status: 'fulfilled' });

    const stockList = await BloodStock.find();
    let totalStockUnits = 0;
    const stockMap = {};
    
    // Set standard groups to 0 first
    const bloodGroups = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
    bloodGroups.forEach(bg => {
      stockMap[bg] = 0;
    });

    stockList.forEach(s => {
      totalStockUnits += s.units_available;
      stockMap[s.blood_group] = s.units_available;
    });

    // Donors grouped by blood group
    const donorGroupList = await Donor.aggregate([
      { $group: { _id: '$blood_group', count: { $sum: 1 } } }
    ]);
    const donorGroupMap = {};
    bloodGroups.forEach(bg => {
      donorGroupMap[bg] = 0;
    });
    donorGroupList.forEach(item => {
      donorGroupMap[item._id] = item.count;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalDonors,
        pendingRequests,
        matchedRequests,
        fulfilledRequests,
        totalStockUnits,
        stockMap,
        donorGroupMap
      }
    });
  } catch (error) {
    console.error('Admin stats GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
