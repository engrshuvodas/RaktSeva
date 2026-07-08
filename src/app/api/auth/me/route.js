import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Donor from '@/models/Donor';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    
    const tokenCookie = request.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : null;

    if (!token) {
      return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ authenticated: false, error: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json({ authenticated: false, error: 'User not found' }, { status: 401 });
    }

    let donorProfile = null;
    if (user.role === 'donor') {
      donorProfile = await Donor.findOne({ user_id: user._id });
    }

    return NextResponse.json({
      authenticated: true,
      user,
      donorProfile
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
