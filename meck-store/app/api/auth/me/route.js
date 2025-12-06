import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const cookieStore = request.cookies;
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated.' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid token.' },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
