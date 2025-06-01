import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Your App Name',
    default: 'Authentication | Your App Name',
  },
  description: 'Secure authentication for your application',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 