import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HeaderControls } from './HeaderControls';

interface BaseHeaderProps {
  variant: 'general' | 'dashboard';
  sidebarComponent?: React.ReactNode;
  searchPlaceholder?: string;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  showSearch?: boolean;
  showUserMenu?: boolean;
  userRole?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export function BaseHeader({
  variant = 'general',
  sidebarComponent,
  searchPlaceholder = 'Search...',
  showNotifications = true,
  showThemeToggle = true,
  showSearch = true,
  showUserMenu = true,
  userRole = 'User',
  onSearch,
  className,
}: BaseHeaderProps) {
  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container flex h-14 items-center">
        {variant === 'dashboard' && sidebarComponent && (
          <div className="mr-4 flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                {sidebarComponent}
              </SheetContent>
            </Sheet>
          </div>
        )}

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {showSearch && (
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-8"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
            </div>
          )}

          <HeaderControls
            variant={variant}
            showNotifications={showNotifications}
            showThemeToggle={showThemeToggle}
            showUserMenu={showUserMenu}
            userRole={userRole}
          />
        </div>
      </div>
    </header>
  );
} 