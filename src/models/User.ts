import { ObjectId } from 'mongodb';

export type UserRole = 'USER' | 'ADMIN' | 'VENDOR' | 'DELIVERY_MAN';

export interface BaseUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface CustomerUser extends BaseUser {
  role: 'USER';
  orders?: ObjectId[];
  wishlist?: ObjectId[];
}

export interface AdminUser extends BaseUser {
  role: 'ADMIN';
  permissions?: string[];
}

export interface VendorUser extends BaseUser {
  role: 'VENDOR';
  shopName: string;
  shopAddress: string;
  businessType: string;
  products?: ObjectId[];
  orders?: ObjectId[];
  rating?: number;
  isVerified: boolean;
}

export interface DeliveryManUser extends BaseUser {
  role: 'DELIVERY_MAN';
  currentLocation?: {
    lat: number;
    lng: number;
  };
  isAvailable: boolean;
  deliveryZone?: string[];
  vehicleType?: string;
  deliveries?: ObjectId[];
  rating?: number;
  isVerified: boolean;
}

export type User = CustomerUser | AdminUser | VendorUser | DeliveryManUser;

// Collection name constant
export const USERS_COLLECTION = 'users';

// Validation functions
export const validateUser = (user: Partial<User>): string[] => {
  const errors: string[] = [];

  // Base validation
  if (!user.name) {
    errors.push('Name is required');
  } else if (user.name.length > 60) {
    errors.push('Name cannot be more than 60 characters');
  }

  if (!user.email) {
    errors.push('Email is required');
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
    errors.push('Please provide a valid email');
  }

  if (!user.password) {
    errors.push('Password is required');
  } else if (user.password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (!user.role) {
    errors.push('Role is required');
  } else if (!['USER', 'ADMIN', 'VENDOR', 'DELIVERY_MAN'].includes(user.role)) {
    errors.push('Invalid role specified');
  }

  // Role-specific validation
  if (user.role === 'VENDOR') {
    const vendorUser = user as Partial<VendorUser>;
    if (!vendorUser.shopName) {
      errors.push('Shop name is required for vendors');
    }
    if (!vendorUser.shopAddress) {
      errors.push('Shop address is required for vendors');
    }
    if (!vendorUser.businessType) {
      errors.push('Business type is required for vendors');
    }
  }

  if (user.role === 'DELIVERY_MAN') {
    const deliveryUser = user as Partial<DeliveryManUser>;
    if (!deliveryUser.vehicleType) {
      errors.push('Vehicle type is required for delivery personnel');
    }
    if (!deliveryUser.phone) {
      errors.push('Phone number is required for delivery personnel');
    }
  }

  return errors;
}; 