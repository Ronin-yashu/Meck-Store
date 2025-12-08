import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/mysql';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email is already registered.' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Split name into first_name and last_name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Insert new user
    const [result] = await pool.execute(
      `INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, 'customer')`,
      [firstName, lastName, email, passwordHash]
    );

    // Get the created user
    const [newUser] = await pool.execute(
      'SELECT id, first_name, last_name, email, role FROM users WHERE id = ?',
      [result.insertId]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully.',
        user: {
          id: newUser[0].id,
          name: `${newUser[0].first_name} ${newUser[0].last_name}`.trim(),
          email: newUser[0].email,
          role: newUser[0].role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in register API:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}