'use client';

import { User, UserRole } from '@/models/User';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User as UserIcon,
  Settings,
  LogOut,
  ShoppingBag,
  Package,
  Store,
  Truck,
  ClipboardList,
  Users,
  BarChart,
  Heart,
  Star,
  Bell,
  CreditCard,
  MapPin,
  ShieldCheck,
  Building2,
  Boxes,
} from 'lucide-react';

interface ProfileMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    avatar?: string | null;
    role?: UserRole;
  };
}

export function ProfileMenu({ user }: ProfileMenuProps) {
  const [mounted, setMounted] = useState(false);

  // Only render the menu after component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Role-based menu items with improved organization and more options
  const menuItems = {
    USER: [
      { label: 'My Orders', href: '/dashboard/orders', icon: Package },
      { label: 'My Wishlist', href: '/dashboard/wishlist', icon: Heart },
      { label: 'My Reviews', href: '/dashboard/reviews', icon: Star },
      { label: 'Payment Methods', href: '/dashboard/payments', icon: CreditCard },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
      { label: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
    ],
    ADMIN: [
      { label: 'Dashboard', href: '/admin', icon: BarChart },
      { label: 'Users Management', href: '/admin/users', icon: Users },
      { label: 'Orders Management', href: '/admin/orders', icon: Package },
      { label: 'Products Management', href: '/admin/products', icon: ShoppingBag },
      { label: 'Vendors Management', href: '/admin/vendors', icon: Store },
      { label: 'Delivery Management', href: '/admin/delivery', icon: Truck },
      { label: 'Security Settings', href: '/admin/security', icon: ShieldCheck },
    ],
    VENDOR: [
      { label: 'Vendor Dashboard', href: '/vendor', icon: Store },
      { label: 'My Products', href: '/vendor/products', icon: Boxes },
      { label: 'Orders', href: '/vendor/orders', icon: ClipboardList },
      { label: 'Store Analytics', href: '/vendor/analytics', icon: BarChart },
      { label: 'Store Settings', href: '/vendor/settings', icon: Settings },
      { label: 'Business Profile', href: '/vendor/profile', icon: Building2 },
    ],
    DELIVERY_MAN: [
      { label: 'Delivery Dashboard', href: '/delivery', icon: Truck },
      { label: 'Active Deliveries', href: '/delivery/active', icon: Package },
      { label: 'Delivery History', href: '/delivery/history', icon: ClipboardList },
      { label: 'My Earnings', href: '/delivery/earnings', icon: CreditCard },
      { label: 'My Schedule', href: '/delivery/schedule', icon: BarChart },
      { label: 'Zone Settings', href: '/delivery/zones', icon: MapPin },
    ],
  };

  const roleItems = menuItems[user.role as keyof typeof menuItems] || menuItems.USER;

  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase() || '?';
  };

  const getRoleLabel = (role?: UserRole) => {
    if (!role) return 'User';
    return role.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || undefined} alt={user.name || 'User'} />
            <AvatarFallback>{getInitials(user.name || '')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || 'No email provided'}
            </p>
            <p className="text-xs font-medium text-primary">
              {getRoleLabel(user.role)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {roleItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onSelect={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 