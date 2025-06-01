import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/db";
import { validateUser, UserRole } from "@/models/User";
import { z } from "zod";
import { MongoClient, MongoError } from "mongodb";

// Base schema for all users
const baseUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN", "VENDOR", "DELIVERY_MAN"] as const),
  phone: z.string().optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
});

// Role-specific schemas
const vendorSchema = baseUserSchema.extend({
  role: z.literal("VENDOR"),
  shopName: z.string().min(1, "Shop name is required"),
  shopAddress: z.string().min(1, "Shop address is required"),
  businessType: z.string().min(1, "Business type is required"),
});

const deliveryManSchema = baseUserSchema.extend({
  role: z.literal("DELIVERY_MAN"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  phone: z.string().min(1, "Phone number is required"),
  deliveryZone: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  let client: MongoClient | null = null;

  try {
    const body = await request.json();

    // First validate the base schema
    const baseValidation = baseUserSchema.safeParse(body);
    if (!baseValidation.success) {
      const errors = baseValidation.error.errors.map(error => error.message);
      return NextResponse.json(
        { error: errors.join(", ") },
        { status: 400 }
      );
    }

    // Role-specific validation
    if (body.role === "VENDOR") {
      const vendorValidation = vendorSchema.safeParse(body);
      if (!vendorValidation.success) {
        const errors = vendorValidation.error.errors.map(error => error.message);
        return NextResponse.json(
          { error: errors.join(", ") },
          { status: 400 }
        );
      }
    }

    if (body.role === "DELIVERY_MAN") {
      const deliveryManValidation = deliveryManSchema.safeParse(body);
      if (!deliveryManValidation.success) {
        const errors = deliveryManValidation.error.errors.map(error => error.message);
        return NextResponse.json(
          { error: errors.join(", ") },
          { status: 400 }
        );
      }
    }

    // Additional custom validation
    const validationErrors = validateUser(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors.join(", ") },
        { status: 400 }
      );
    }

    // Get database connection
    client = await clientPromise;
    const db = client.db();

    // Check if user already exists using the unique index
    const existingUser = await db
      .collection("users")
      .findOne({ 
        email: body.email.toLowerCase() // Case-insensitive email check
      });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password with strong salt
    const hashedPassword = await hash(body.password, 12);

    // Prepare base user data
    const userData = {
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      password: hashedPassword,
      role: body.role as UserRole,
      phone: body.phone?.trim(),
      address: body.address?.trim(),
      avatar: body.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: false,
    };

    // Add role-specific data
    if (body.role === "VENDOR") {
      Object.assign(userData, {
        shopName: body.shopName.trim(),
        shopAddress: body.shopAddress.trim(),
        businessType: body.businessType.trim(),
        products: [],
        orders: [],
        rating: 0,
        isVerified: false,
      });
    } else if (body.role === "DELIVERY_MAN") {
      Object.assign(userData, {
        vehicleType: body.vehicleType.trim(),
        deliveryZone: body.deliveryZone || [],
        currentLocation: null,
        isAvailable: true,
        deliveries: [],
        rating: 0,
        isVerified: false,
      });
    } else if (body.role === "USER") {
      Object.assign(userData, {
        orders: [],
        wishlist: [],
      });
    }

    // Create user with sanitized data
    const insertResult = await db.collection("users").insertOne(userData);

    if (!insertResult.acknowledged) {
      throw new Error("Failed to insert user into database");
    }

    // Return success without exposing sensitive data
    const { password, ...userWithoutPassword } = userData;
    return NextResponse.json(
      { 
        message: "User created successfully",
        userId: insertResult.insertedId,
        role: body.role
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific MongoDB errors
    if (error instanceof MongoError) {
      if (error.code === 11000) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
} 