'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
  { name: 'Products', href: '/vendor/products', icon: Package },
  { name: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
  { name: 'Add Product', href: '/vendor/products/new', icon: PlusCircle },
  { name: 'Earnings', href: '/vendor/earnings', icon: DollarSign },
  { name: 'Reviews', href: '/vendor/reviews', icon: Star },
  { name: 'Messages', href: '/vendor/messages', icon: MessageSquare },
  { name: 'Delivery Status', href: '/vendor/delivery', icon: Truck },
  { name: 'Payouts', href: '/vendor/payouts', icon: Wallet },
  { name: 'Disputes', href: '/vendor/disputes', icon: AlertOctagon },
  { name: 'Settings', href: '/vendor/settings', icon: Settings },
  { name: 'Notifications', href: '/vendor/notifications', icon: Bell },
  { name: 'Help / Support', href: '/vendor/support', icon: HelpCircle },
];

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? 'bg-gray-50 text-primary dark:bg-gray-800'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href
                        ? 'text-primary'
                        : 'text-gray-400 group-hover:text-primary dark:text-gray-500',
                      'h-6 w-6 shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
} 