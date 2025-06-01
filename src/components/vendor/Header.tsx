'use client';

import { BaseHeader } from '@/components/shared/BaseHeader';
import { Sidebar } from './Sidebar';

export function VendorHeader() {
  return (
    <BaseHeader
      variant="dashboard"
      sidebarComponent={<Sidebar />}
      searchPlaceholder="Search in dashboard..."
      showNotifications={true}
      showThemeToggle={true}
      showSearch={true}
      showUserMenu={true}
      userRole="Vendor Account"
    />
  );
}

// Add default export and named export alias
export { VendorHeader as Header };
export default VendorHeader; 