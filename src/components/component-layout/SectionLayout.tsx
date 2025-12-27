import { cn } from "@/lib/utils";
import { Card } from "antd";
import React from "react";
// nice ot meet you
function SectionLayout({
  children,
  className,
  loading,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}>) {
  if (loading) {
    return <Card loading={loading} />;
  }
  return (
    <div className={cn("container mx-auto mb-28", className)}>{children}</div>
  );
}

export default SectionLayout;
