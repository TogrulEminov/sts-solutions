"use client";
interface LocalLayoutProps {
  children: React.ReactNode;
}
export default function ProviderComponent({ children }: LocalLayoutProps) {
  return <main>{children}</main>;
}
