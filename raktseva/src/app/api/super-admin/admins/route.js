import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

async function verifySuperAdmin(request) {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) return false;

  const decoded = verifyToken(token);
  return decoded && decoded.role === 'super_admin';
}

export async function GET(request) {
  try {
    await dbConnect();
    if (!(await verifySuperAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all users except super admins
    const users = await User.find({ role: { $ne: 'super_admin' } }).select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Super admin GET users error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    if (!(await verifySuperAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, role } = await request.json();

    if (!userId || !role) {
      return NextResponse.json({ error: 'User ID and role are required' }, { status: 400 });
    }

    if (!['admin', 'donor', 'requester'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role assignment' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.role === 'super_admin') {
      return NextResponse.json({ error: 'Cannot modify a super admin' }, { status: 403 });
    }

    user.role = role;
    await user.save();

    return NextResponse.json({ success: true, message: `User role updated to ${role} successfully`, user });
  } catch (error) {
    console.error('Super admin PUT user role error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
