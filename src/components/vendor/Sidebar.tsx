'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  PlusCircle,
  DollarSign,
  Star,
  MessageSquare,
  Truck,
  Wallet,
  AlertOctagon,
  Settings,
  Bell,
  HelpCircle,
  Store,
  Users,
  BarChart3,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/vendor',
        icon: LayoutDashboard,
        description: 'Overview of your store performance',
      },
      {
        title: 'Analytics',
        href: '/vendor/analytics',
        icon: BarChart3,
        description: 'Detailed analytics and reports',
      },
      {
        title: 'Store Profile',
        href: '/vendor/store',
        icon: Store,
        description: 'Manage your store information',
      },
    ],
  },
  {
    title: 'Products',
    items: [
      {
        title: 'All Products',
        href: '/vendor/products',
        icon: Package,
        description: 'Manage your product catalog',
      },
      {
        title: 'Add Product',
        href: '/vendor/products/new',
        icon: PlusCircle,
        description: 'Add a new product',
      },
      {
        title: 'Categories',
        href: '/vendor/categories',
        icon: Package,
        description: 'Manage product categories',
      },
    ],
  },
  {
    title: 'Orders & Shipping',
    items: [
      {
        title: 'Orders',
        href: '/vendor/orders',
        icon: ShoppingBag,
        description: 'View and manage orders',
        badge: '5',
      },
      {
        title: 'Delivery',
        href: '/vendor/delivery',
        icon: Truck,
        description: 'Track deliveries and shipments',
      },
    ],
  },
  {
    title: 'Customers',
    items: [
      {
        title: 'Reviews',
        href: '/vendor/reviews',
        icon: Star,
        description: 'Customer reviews and ratings',
        badge: '2',
      },
      {
        title: 'Messages',
        href: '/vendor/messages',
        icon: MessageSquare,
        description: 'Customer messages',
        badge: '3',
      },
      {
        title: 'Customers',
        href: '/vendor/customers',
        icon: Users,
        description: 'View customer list',
      },
    ],
  },
  {
    title: 'Finances',
    items: [
      {
        title: 'Earnings',
        href: '/vendor/earnings',
        icon: DollarSign,
        description: 'Track your earnings',
      },
      {
        title: 'Payouts',
        href: '/vendor/payouts',
        icon: Wallet,
        description: 'View payout history',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        title: 'Disputes',
        href: '/vendor/disputes',
        icon: AlertOctagon,
        description: 'Handle customer disputes',
        badge: '1',
      },
      {
        title: 'Help Center',
        href: '/vendor/help',
        icon: HelpCircle,
        description: 'Get help and support',
      },
      {
        title: 'Settings',
        href: '/vendor/settings',
        icon: Settings,
        description: 'Manage account settings',
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background lg:block lg:w-72">
      <div className="flex h-16 items-center px-6">
        <Link href="/vendor" className="flex items-center gap-2 font-semibold">
          <Store className="h-6 w-6" />
          <span>Vendor Portal</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] px-3">
        <div className="space-y-4 py-4">
          {menuItems.map((section) => (
            <div key={section.title} className="px-3 py-2">
              <h2 className="mb-2 text-xs font-semibold tracking-tight text-muted-foreground">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <Link href={item.href} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </Button>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 