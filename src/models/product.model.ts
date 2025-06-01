import { Schema, model, models } from 'mongoose';

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: {
    url: string;
    key: string;
  }[];
  category: string;
  subcategory?: string;
  brand?: string;
  inStock: boolean;
  quantity: number;
  sku: string;
  attributes: {
    name: string;
    value: string;
  }[];
  variants?: {
    name: string;
    values: string[];
  }[];
  tags?: string[];
  rating?: number;
  reviews?: number;
  vendor: Schema.Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters long'],
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    comparePrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative'],
    },
    images: [{
      url: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    }],
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    subcategory: String,
    brand: String,
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, 'Product SKU is required'],
      unique: true,
    },
    attributes: [{
      name: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    }],
    variants: [{
      name: {
        type: String,
        required: true,
      },
      values: [{
        type: String,
        required: true,
      }],
    }],
    tags: [String],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Product vendor is required'],
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create indexes
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });

// Auto-generate slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export const Product = models.Product || model<IProduct>('Product', productSchema); 