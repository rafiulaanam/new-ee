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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="/logo.svg"
            alt="Your Company"
          />
        </div>
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
      </div>
    </div>
  );
} 