"use client";
import React, { Suspense } from "react";
import { Pagination } from "antd";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import { useSearchParams } from "next/navigation";

interface GlobalPaginationProps {
  total: number;
}

const GlobalPagination: React.FC<GlobalPaginationProps> = ({ total }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const onChange = (page: number, newPageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("pageSize", newPageSize.toString());

    router.push(`${pathname}?${params.toString()}` as any);
  };

  return (
    <Suspense>
      <div className="w-full flex items-center justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          showSizeChanger={false}
          total={total}
          onChange={onChange}
        />
      </div>
    </Suspense>
  );
};

export default GlobalPagination;
