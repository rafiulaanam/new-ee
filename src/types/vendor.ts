import { User } from '@/models/User';

export interface VendorStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalEarnings: number;
  pendingOrders: number;
  lowStockProducts: number;
  averageRating: number;
  totalDisputes: number;
}

export interface VendorProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  images: string[];
  category: string;
  status: 'active' | 'draft' | 'out_of_stock';
  createdAt: Date;
  updatedAt: Date;
  ratings: number;
  reviews: number;
  sku: string;
  vendorId: string;
}

export interface VendorOrder {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  total: number;
  commission: number;
  netEarnings: number;
  createdAt: Date;
  updatedAt: Date;
  deliveryInfo?: {
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: Date;
  };
}

export interface VendorEarning {
  id: string;
  orderId: string;
  amount: number;
  commission: number;
  netAmount: number;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  paidAt?: Date;
  createdAt: Date;
}

export interface VendorReview {
  id: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  reply?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'admin' | 'vendor';
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface VendorDispute {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  reason: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  type: 'refund' | 'replacement' | 'other';
  amount?: number;
  description: string;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorProfile {
  id: string;
  userId: string;
  shopName: string;
  description: string;
  logo?: string;
  banner?: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  businessHours?: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  status: 'active' | 'inactive' | 'suspended';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  commissionRate: number;
  paymentDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    swiftCode?: string;
  };
  createdAt: Date;
  updatedAt: Date;
} 