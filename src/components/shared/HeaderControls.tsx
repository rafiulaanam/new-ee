'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
  Bell,
  Sun,
  Moon,
  Store,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface HeaderControlsProps {
  variant: 'general' | 'dashboard';
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  showUserMenu?: boolean;
  userRole?: string;
}

export function HeaderControls({
  variant,
  showNotifications = true,
  showThemeToggle = true,
  showUserMenu = true,
  userRole = 'User',
}: HeaderControlsProps) {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Order #1234',
      message: 'You have received a new order for $156.00',
      time: '2 minutes ago',
      type: 'order',
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      message: 'Product "Wireless Earbuds" is running low on stock (5 remaining)',
      time: '15 minutes ago',
      type: 'stock',
    },
    {
      id: 3,
      title: 'New Review',
      message: 'A customer left a 5-star review on "Gaming Mouse"',
      time: '1 hour ago',
      type: 'review',
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        {showNotifications && (
          <Button variant="ghost" size="icon" className="relative">
            <Skeleton className="h-5 w-5" />
          </Button>
        )}
        {showThemeToggle && (
          <Button variant="ghost" size="icon">
            <Skeleton className="h-5 w-5" />
          </Button>
        )}
        {showUserMenu && (
          <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="hidden md:flex flex-col items-start gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </Button>
        )}
      </div>
    );
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Store className="h-4 w-4 text-blue-500" />;
      case 'stock':
        return <Store className="h-4 w-4 text-yellow-500" />;
      case 'review':
        return <Store className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {showNotifications && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {notifications.length}
                </Badge>
              )}
              <span className="sr-only">View notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex items-start gap-2 p-3">
                {getNotificationIcon(notification.type)}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {showThemeToggle && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {showUserMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.image || undefined}
                  alt={session?.user?.name || 'User'}
                />
                <AvatarFallback>
                  {session?.user?.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">
                  {session?.user?.name || 'User'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {userRole}
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            {variant === 'dashboard' && (
              <DropdownMenuItem>Store Settings</DropdownMenuItem>
            )}
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
} 