'use client';

import { BaseHeader } from './BaseHeader';

export function Header() {
  return (
    <BaseHeader
      variant="general"
      searchPlaceholder="Search products..."
      showNotifications={false}
      showThemeToggle={true}
      showSearch={true}
      showUserMenu={true}
      userRole="Customer"
    />
  );
} 