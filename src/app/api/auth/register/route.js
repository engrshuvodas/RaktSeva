import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Donor from '@/models/Donor';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password, phone, role, blood_group, district, area } = await request.json();

    if (!name || !email || !password || !phone || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (role !== 'donor' && role !== 'requester') {
      return NextResponse.json({ error: 'Invalid role for registration' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role
    });

    if (role === 'donor') {
      if (!blood_group || !district || !area) {
        // Rollback user creation
        await User.findByIdAndDelete(newUser._id);
        return NextResponse.json({ error: 'Donor profile requires blood group, district, and area' }, { status: 400 });
      }

      await Donor.create({
        user_id: newUser._id,
        blood_group,
        district,
        area,
        availability_status: true,
        isApproved: false // Requires admin approval
      });
    }

    return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
