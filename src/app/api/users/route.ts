import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { User, USERS_COLLECTION, validateUser } from '@/models/User';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = await db
      .collection(USERS_COLLECTION)
      .find({})
      .project({ password: 0 })
      .toArray();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate user data
    const validationErrors = validateUser(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { errors: validationErrors },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if email already exists
    const existingUser = await db
      .collection(USERS_COLLECTION)
      .findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const newUser: User = {
      ...body,
      createdAt: new Date()
    };

    const result = await db
      .collection(USERS_COLLECTION)
      .insertOne(newUser);

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { ...userWithoutPassword, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 