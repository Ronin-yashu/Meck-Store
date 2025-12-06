import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email and password are required.' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Email is already registered.' },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
    });

    const res = NextResponse.json(
      {
        success: true,
        message: 'User registered successfully.',
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    // HTTP-only cookie for auth
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  } catch (error) {
    console.error('Error in register API:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
